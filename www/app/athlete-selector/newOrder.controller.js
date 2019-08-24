(function () {
    'use strict';

    angular.module('app.new-order')

    .controller('NewOrderCtrl', function ($scope, $rootScope, $state, $timeout, $q, $interval, $ionicPopup, 
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

		function _isAthleteEnabled(athlete) {
			//check the athlete isEnabled property to see if toggled off
			if (!athlete.isEnabled) {
				var opts = {
					title: 'Account Disabled',
					template: 'The athlete selected has been disabled by the Nurtition Staff.  They are not currently eligible for service.  Please contact Alexandra Bechard for more details.'
				};
				var athleteDisabledAlert = $ionicPopup.alert(opts)
				athleteDisabledAlert.then( function() {
					_cancel();
				});
				$timeout(function() {
					athleteDisabledAlert.close();
				}, 3000);
				return false;
			} else { return true; }
		}

		function _reviewAllergies(athlete) {
			if (athlete.hasAllergy) {
				var msg = {
					title: 'Athlete Allergies',
					template: 'The athlete is marked as having allergies, but no notes recorded.'
				};
				if (athlete.allergyNotes) {
					msg.template = athlete.allergyNotes;
				}
				var allergyAlert = $ionicPopup.alert(msg)
				$timeout(function() {
					allergyAlert.close();
				}, 4000);
				return allergyAlert;
			} else return $q.when( true );
		}
		
		function _startOrder(athlete) {
			//check the athlete to see if account is enabled
			if ( _isAthleteEnabled(athlete) ) {
				
				//check to see if the athlete has allergies
				_reviewAllergies(athlete).then( function() {
					//begin the order process
					LoadingSpinner.show();
					AccountSvc.studentId = athlete.schoolid;	

					//run through the series of steps to process the cart
					AthleteSvc.getAthlete(AccountSvc.studentId)
						.then(AccountSvc.saveAthleteData)
						.then(AccountSvc.getSnackLimits)
						.then(getCheckoutHistory)
						.then(AccountSvc.initializeHiddenCategories)
						.then(getAllChoices)
						.then(redirectToCart)
						.catch(IonicAlertSvc.error)
						.finally(LoadingSpinner.hide);
				});
			} 
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
