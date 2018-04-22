(function () {
    'use strict';

    angular.module('app.core')

        .service('AccountSvc', function ($q, SnackLimits) {
            var self = this;
            self.daySnacksLimit = 0;
            self.monthSnacksLimit = 0;
        
            self.preCount = 0;
            self.postCount = 0;
            self.snackCount = 0;
            self.staffCount = 0;

            self.studentId = '';

            self.gotPreToday = false;
            self.gotPostToday = false;
            self.gotHydrationToday = false;

            self.shouldHidePre = false;
            self.shouldHidePost = false;
            self.shouldHideHydration = false;
            self.shouldHideSnacks = false;
            // Note: Need both 'gotPreToday' and 'shouldHidePre' variables so that if athlete already checked out a Pre workout item, and they order it again as a snack then remove it from their cart, it won't become available again as a Pre workout item - it should remain a snack-only option

            self.daySnacksRemaining = '';
            self.monthSnacksRemaining = '';

            self.clear = _clear;
            self.clearStudentId = _clearStudentId;
            self.getSnackLimits = _getSnackLimits;
            self.initializeHiddenCategories = _initializeHiddenCategories;
            self.saveAthleteData = _saveAthleteData;
            self.updateHiddenCategories = _updateHiddenCategories;

            /**
            * Clears saved athlete data and visisbility logic for choices and gets updated snack limits
            */
            function _clear() {
                self.shouldHidePre = false;
                self.shouldHidePost = false;
                self.shouldHideHydration = false;
                self.shouldHideSnacks = false;
                self.athleteData = null;
                self.gotPreToday = false;
                self.gotPostToday = false;
                self.gotHydrationToday = false;
                self.clearStudentId();
                self.daySnacksRemaining = '';
                self.monthSnacksRemaining = '';
                //self.getSnackLimits();
            }

            function _clearStudentId() {
                self.studentId = '';
            }

            function _getSnackLimits(athlete) {
                // TEMP:    return $q.when(athlete[0].AthleteID);

                return SnackLimits.athleteSnackLimits().get(athlete[0].schoolid)
                    .then(function (data) {
                        self.daySnacksLimit = data.daySnackLimit;
                        self.monthSnacksLimit = data.monthSnackLimit;
                        self.dayPreLimit = data.dayPreLimit;
                        self.dayPostLimit = data.dayPostLimit;
						self.dayStaffLimit = data.dayStaffLimit;

                        return $q.when(athlete[0].AthleteID);
                    });

                // return SnackLimits.athleteSnackLimits().get(athlete[0]).$promise.then(function (data) {
                //     self.daySnacksLimit = data.daySnackLimit;
                //     self.monthSnacksLimit = data.monthSnackLimit;

                //     return $q.when({
                //         studentSportID: athlete[0].studentSportID
                //     });
                // });

            }

            function _initializeHiddenCategories(history, isUpdate) {
                if (history) {
					self.preCount = history.dayPreCount;
					self.postCount = history.dayPostCount;
					self.snackCount = history.daySnacksCount;
					self.staffCount = history.dayStaffCount;
					
                    if (history.dayPreCount > 0) {
                        self.shouldHidePre = true;
                        self.gotPreToday = true;
                    }
                    if (history.dayPostCount > 0) {
                        self.shouldHidePost = true;
                        self.gotPostToday = true;
                    }
                    if (history.dayHydrationCount > 0) {
                        self.shouldHideHydration = true;
                        self.gotHydrationToday = true;
                    }
                    if (history.dayStaffCount > 0) {
                        self.shouldHideStaff = true;
                        self.gotStaffToday = true;
                    }
                    if (history.daySnacksCount >= self.daySnacksLimit || history.monthSnacksCount >= self.monthSnacksLimit) {
                        self.shouldHideSnacks = true;

                        if (self.gotPreToday == true &&
                            self.gotPostToday == true &&
                            self.gotHydrationToday == true) {
                            var err = {
                                title: "Limit Reached",
                                template: "You have already reached your limit.",
                                shouldClearID: true
                            }

                            // If manager is updating the order, it should not reject
                            if (!isUpdate) {
                                self.clear();
                                return $q.reject(err);
                            }
                        }
                    }
                self.shouldHidePre = (self.preCount >= self.dayPreLimit);
                self.shouldHidePost = (self.postCount >= self.dayPostLimit);
                self.shouldHideSnack = (self.snackCount >= self.snackCount);
                self.shouldHideStaff = (self.staffCount >= self.dayStaffLimit);

                    // Manually setting defaults (|| self...) because history currently not implemented
                    self.monthSnacksRemaining = Math.max(self.monthSnacksLimit - history.monthSnacksCount, 0) || self.monthSnacksLimit;
                    self.daySnacksRemaining = Math.max(self.daySnacksLimit - history.daySnacksCount, 0) || self.daySnacksLimit;

                    if (self.monthSnacksRemaining < self.daySnacksLimit) {
                        self.daySnacksRemaining = Math.min(self.monthSnacksRemaining, self.daySnacksRemaining);
                    }
                    return $q.when(true);
                }
            }

            /**
            * Hold athlete information in variable so that it can be accessed, e.g. posting checkout with student's ID.
            * If not athlete data is passed in, then reject the request - the student ID does not exist.
            */
            function _saveAthleteData(result) {
                if (result.length > 0) {
                    self.athleteData = result;

//                    // Check if sport is eligible to receive snacks (ie in season)
//                    if (result[0].sportCode.toUpperCase() === 'MFB') {
//                        var err = {
//                            title: "Sorry, you are currently not eligible to check out items.",
//                            shouldClearID: true,
//                            stack: new Error().stack,
//                            cause: "Sport not eligible to receive snacks"
//                        }
//                        return $q.reject(err);
//                    }
//                    else {
                        return $q.when(result);
//                    }
                } else if (result.length === 0) {
                    var err = {
                        title: "The student ID you entered was not found. Please try again.",
                        shouldClearID: true,
                        stack: new Error().stack,
                        cause: "Student ID not found"
                    }
                    return $q.reject(err);
                }
            }

            /**
            * This function is called whenever an item is added to or removed from the cart.
            */
            function _updateHiddenCategories(orders, cancelledItem) {
                var preCounter = 0;
                var postCounter = 0;
                var hydrationCounter = 0;
                var snackCounter = 0;

//                for (var i = 0; i < orders.length; i++) {
//                    if (orders[i].type === 1) {
//                        preCounter++;
//                        self.shouldHidePre = true;
//                    } else if (orders[i].type === 2) {
//                        postCounter++;
//                        self.shouldHidePost = true;
//                    } else if (orders[i].type === 3) {
//                        hydrationCounter++;
//                        self.shouldHideHydration = true;
//                    } else if (orders[i].isSnack == true) {
//                        snackCounter++;
//                    }
//                }
                self.shouldHidePre = (self.preCount >= self.dayPreLimit);
                self.shouldHidePost = (self.postCount >= self.dayPostLimit);
                self.shouldHideStaff = (self.staffCount >= self.dayStaffLimit);


                if (self.monthSnacksRemaining <= 0 || self.snackCount >= self.daySnacksLimit) {
                    self.shouldHideSnacks = true;
                } else {
                    self.shouldHideSnacks = false;
                }

                // The second condition in the following if statements ensures that Pre, Post, and Hyd options display if a manager removes these choices from an already-placed order
//                if ((preCounter === 0 && !self.gotPreToday) || (cancelledItem && cancelledItem.type === 1 && !cancelledItem.isSnack)) {
//                    self.shouldHidePre = false;
//                }
//                if ((postCounter === 0 && !self.gotPostToday) || (cancelledItem && cancelledItem.type === 2 && !cancelledItem.isSnack)) {
//                    self.shouldHidePost = false;
//                }
                if ((hydrationCounter === 0 && !self.gotHydrationToday) || (cancelledItem && cancelledItem.type === 3 && !cancelledItem.isSnack)) {
                    self.shouldHideHydration = false;
                }
            }

        });
})();
