(function () {
    'use strict';

    angular.module('app.core')

    .service('ChoiceSvc', function ($rootScope, $http, $resource, ApiEndpoint) {
        var self = this;
        var apiUrl = 'https://wxje26sx3l.execute-api.us-west-2.amazonaws.com/dev/choices';

        self.alphabetize = _alphabetize;
        self.choice = _choice;
        self.getAllChoices = _getAllChoices;
        self.getType = _getType;
        self.hydrationFilter = _hydrationFilter;
        self.staffFilter = _staffFilter;
        self.initializeChoiceCategories = _initializeChoiceCategories;
        self.postWorkout = _postWorkout;
        self.preWorkout = _preWorkout;
        self.saveChoice = _saveChoice;
        self.snackOnly = _snackOnly;
        self.typeOptions = _typeOptions;
		self.categories = _categories;
        self.updateChoice = _updateChoice;

        function _alphabetize(a, b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        }

         function _choice() {
            return {
                get: function(args) {
                    return $http.get(apiUrl + '/' + args.id)
                    .then(function(result){
                        return result.data.choices;
                    });
                },
                delete: function(args) {
                    return $http.delete(apiUrl + '/' + args.id);
                }
            };
         }

        function _getAllChoices() {
            //return $resource(ApiEndpoint.url + 'Choices', {});
            return $http.get(apiUrl)
                .then(function(result){
                    return result.data.choices;
                });
        }

        function _getType(type) {
            if (type === 0) {
                return "Snack only";
            } else if (type === 1) {
                return "Pre";
            } else if (type === 2) {
                return "Post";
            } else if (type === 3) {
                return "Hydration";
            }
        }

        function _hydrationFilter(data) {
            var hydrations = _.where(data, {
                type: 3
            });
            return hydrations;
        }

        function _staffFilter(data) {
            var staffItems = _.where(data, {
                isStaff: true
            });
            return staffItems;
        }

        function _initializeChoiceCategories(choices) {
            var allChoices = choices.sort(self.alphabetize);
		//use groupBy to build a grouped list of menu choices
			var categoricalChoices = _.groupBy(choices, 'CategoryID');
			self.categoricalChoices = categoricalChoices;
			$rootScope.$broadcast('ChoiceSvc.Categorized', {});
			
            self.snacks = self.snackOnly(allChoices);
            self.pre = self.preWorkout(allChoices);
            self.post = self.postWorkout(allChoices);
            self.hydration = self.hydrationFilter(allChoices);
			self.staff = self.staffFilter(allChoices);
        }

        function _postWorkout(data) {
            return _.where(data, {
                type: 2
            });
        }

        function _preWorkout(data) {
            return _.where(data, {
                type: 1
            });
        }

        function _saveChoice(choice){
            return $http.post(apiUrl, choice);
        }

        function _updateChoice(choice){
            return $http.put(apiUrl, choice)
        }

        function _snackOnly(data) {
            return _.where(data, {
                type: 0
            });
        }

        function _typeOptions() {
            var opts = [
                {
                    label: "Snack only",
                    value: 0
            }, {
                    label: "Pre",
                    value: 1
            }, {
                    label: "Post",
                    value: 2
            }, {
                    label: "Hydration",
                    value: 3
            }
            ];
            return opts;
        }
		
        function _categories() {
			var catUrl = 'https://bomgmgqdc7.execute-api.us-west-2.amazonaws.com/dev/categories';
			return $http.get(catUrl).then(function(result) {
				return result.data.categories;
			});
//            var cats = [
//                {
//                    label: "Quick Carb",
//                    value: 9
//            }, {
//                    label: "Bars",
//                    value: 10
//            }, {
//                    label: "Protein",
//                    value: 11
//            }, {
//                    label: "Nuts",
//                    value: 12
//            }, {
//                    label: "Fruit",
//                    value: 13
//            }, {
//                    label: "Breads",
//                    value: 14
//            }, {
//                    label: "Drinks",
//                    value: 15
//            }, {
//                    label: "Salty Snacks",
//                    value: 16
//            }, {
//                    label: "Yogurt",
//                    value: 17
//            }, {
//                    label: "Cereal",
//                    value: 18
//            }, {
//                    label: "TT",
//                    value: 19
//            }, {
//                    label: "Smoothie",
//                    value: 20
//            }, {
//                    label: "Special",
//                    value: 21
//            }, {
//                    label: "Bread",
//                    value: 22
//            }, {
//                    label: "Bar",
//                    value: 23
//            }
//            ];
//            return cats;
        }
    });
})();
