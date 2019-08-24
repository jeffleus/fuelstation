(function () {
    'use strict';

    angular.module('app.new-order')

    .controller('NewOrderCtrl', function ($scope, $rootScope, $state, $timeout, $interval, $ionicModal, 
											LoadingSpinner, IonicAlertSvc, 
											AccountSvc, AthleteSvc, ChoiceSvc, CheckoutSvc, OrderSvc) {
        var vm = this;

		vm.athletes = [];
		vm.sports = {};
		vm.search = "";

        vm.init = init;
        vm.clearFilter = _clearFilter;
		vm.athleteFilter = _athleteFilter;
//        vm.newOrder = _newOrder;
		vm.startOrder = _startOrder;		
		vm.cancel = _cancel;

        init();
		$scope.toggleSport = function(sport) {
			if ($scope.isSportShown(sport)) {
			  $scope.shownSport = null;
			} else {
			  $scope.shownSport = sport;
			}
		  };
		$scope.isSportShown = function(sport) {
			return $scope.shownSport === sport;
		  };
		
        function init() {
            LoadingSpinner.show();
			console.log(vm.id);
			
			return AthleteSvc.getAllAthlete()
			.then(function(result) {
				console.log('NewOrderCtrl::init', 'athletes found: ' + result.length);
				//alpha-sort lastname/firstname
				vm.athletes = _.sortBy(_.sortBy(result, 'firstName'), 'lastName');
				//group athletes by sportCode for nest arrays by sport
				vm.sports = _.groupBy(_.sortBy(vm.athletes, 'sportCode'), 'sportCode');
				return
			}).then(function() {
				LoadingSpinner.hide();
				return;
			}).catch(IonicAlertSvc.error);
        }

        function _clearFilter() {
            vm.search = "";
        }
		
		function _athleteFilter(ath) {
			if (vm.search && vm.search.length > 0) {
				var fullName = (ath.lastName + ', ' + ath.firstName).toLowerCase();
				var search = vm.search.toLowerCase();
				return ( fullName.indexOf(search) > -1 );
			} else { return false; }
		}
		
//		function _newOrder() {
//            // On page load, remove all previous athlete and order data
//            AccountSvc.clear();
//            OrderSvc.clear();
//			$scope.newModal.show();
//		}
		
		function _startOrder(athlete) {
			LoadingSpinner.show();
			AccountSvc.studentId = athlete.schoolid;

			if (!athlete.isEnabled) {
				var msg = {
					title: 'The athlete selected has been disabled by the Nurtition staff.  They are not currently eligible for service.  Please contact Alexandra Bechard for more details.'
				};
				IonicAlertSvc.alert(msg).then( _cancel );
			}

			if (athlete.hasAllergy) {
				var msg = {
					title: 'The athlete is marked as having allergies, but no notes recorded.'
				};
				if (athlete.allergyNotes) {
					msg.title = athlete.allergyNotes;
				}
				IonicAlertSvc.alert(msg);
			}
			//
			AthleteSvc.getAthlete(AccountSvc.studentId)
				.then(AccountSvc.saveAthleteData)
				.then(AccountSvc.getSnackLimits)
				.then(getCheckoutHistory)
				.then(AccountSvc.initializeHiddenCategories)
				.then(getAllChoices)
				.then(redirectToCart)
				.catch(IonicAlertSvc.error)
				.finally(LoadingSpinner.hide);
		}
		
		function _cancel() {
			$rootScope.$broadcast('close.newOrder', null);
		};
		
//
// Cart Utility Functions: getHistory, getChoices, redirectToCart
//
        /** 
         * Gets athlete checkout history
         * @returns {object} Counts of: Today's snack checkouts, current month snack checkouts, and whether athlete has checked out pre, post, or hydration today
         */
        function getCheckoutHistory(id) {
            AccountSvc.preCount = 0;AccountSvc.postCount = 0;AccountSvc.snackCount = 0;
            return CheckoutSvc.getCheckoutHistory(id)
                .then(function (response) {
                    return response;
                }, IonicAlertSvc.error);
        }

        /**
         * Get all snack choices, then initialize hidden categories
         */
        function getAllChoices(success) {
            if (success) {
                ChoiceSvc.getAllChoices()
                    .then(ChoiceSvc.initializeChoiceCategories)
                    .catch(IonicAlertSvc.error);
            }
        }

        /**
         * Use the stateProvider to route to the cart once set
         */
        function redirectToCart() {
            LoadingSpinner.hide();
			return $scope.newModal.hide().then(function() {
				return $state.go('cart', null, {
					reload: true
				});
			});
        }
    });
})();
