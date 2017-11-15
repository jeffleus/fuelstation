(function () {
    'use strict';

    angular.module('app.orderListCtrl', [])

    .controller('OrderListCtrl', function ($scope, $state, $timeout, $interval, $ionicModal, 
											LoadingSpinner, IonicAlertSvc, 
											AccountSvc, AthleteSvc, ChoiceSvc, CheckoutSvc, OrderSvc) {
        var vm = this;
        var polling;

        vm.name = {};
        vm.todaysCheckouts = [];

        vm.init = init;
        vm.clearFilter = _clearFilter;
        vm.deleteCheckout = _deleteCheckout;
        vm.nameFilter = _nameFilter;
        vm.openModal = _openModal;
        vm.newOrder = _newOrder;
		vm.gotoOrder = _gotoOrder;
        vm.setArchive = _setArchive;
		vm.athletes = [];
		vm.sports = {};

        init();
		$scope.$on('closeOrderModal', function() {
			console.log('closeOrderModal');
			LoadingSpinner.show();
			refresh();
		});
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
			
			AthleteSvc.getAllAthlete().then(function(result) {
				console.log('OrderListCtrl', 'athletes found: ' + result.length);
				vm.athletes = result;
				vm.sports = _.groupBy(_.sortBy(result, 'sportCode'), 'sportCode');
			});

            CheckoutSvc.unarchived().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            // Fix bug where header is hidden on route change, with delay to make sure this function gets called after the view is finished rendering
            $timeout(function () {
                showHeader();
            }, 800);

            polling = $interval(function () {
                refresh();
            }, 20000);

            loadModal();
        }
					   
		function refresh() {
			console.log('refreshing the order list...');
			CheckoutSvc.unarchived().query()
				.then(onGetTodaysCheckouts);
		}

        // Cancel polling when controller is destroyed (i.e. when route changes)
        $scope.$on('$destroy', function () {
            $interval.cancel(polling);
        });

        function _clearFilter() {
            vm.name = {};
        }

        function _deleteCheckout(checkout) {
            var msg = {
                template: "Are you sure you want to cancel and delete this order?"
            };

            var onConfirmFn = function () {
                CheckoutSvc.checkout().delete({ checkoutID: checkout.checkoutID }).$promise
                    .then(init)
                    .catch(IonicAlertSvc.error);
            };

            IonicAlertSvc.confirm(msg, onConfirmFn);
        }

        function _nameFilter(item) {
            if (!item.isArchived) {
                // Return orders that are not archived and that contain name in filter
                if (vm.name.value && vm.name.value.length > 0) {
					var fullName = item.Athlete.lastName + ', ' + item.Athlete.firstName
                    return !item.isArchived && (fullName.toLowerCase().indexOf(vm.name.value.toLowerCase()) > -1);
                }
                // Return all orders that have not been archived
                return !item.isArchived;
            }
        }

        function onGetTodaysCheckouts(response) {
            LoadingSpinner.hide();
            vm.todaysCheckouts = response.data.checkouts;
        }

        function _openModal(checkout) {
            AccountSvc.clear();
            CheckoutSvc.currentCheckout = checkout;
            OrderSvc.orderItems = OrderSvc.parseChoices(checkout.CheckoutChoices);
            AccountSvc.studentId = checkout.Athlete.schoolid;
            //loadModal();
            $scope.$broadcast("openModal");
            $scope.modal.show();
        }

        function _setArchive(checkout, index) {
            var currentCheckout = CheckoutSvc.setArchiveProperties(checkout);

            CheckoutSvc.checkout().update(currentCheckout)
                .then(removeCheckoutFromList)
                //.then(init)
                .catch(IonicAlertSvc.error);

            function removeCheckoutFromList() {
                vm.todaysCheckouts.splice(index, 1);
//				$scope.$apply();
            }
        }

        function showHeader() {
            angular.element(document.querySelector("ion-nav-bar")).removeClass("hide");
        }
		
		function _newOrder() {
            // On page load, remove all previous athlete and order data
            AccountSvc.clear();
            OrderSvc.clear();
			$scope.newModal.show();
		}
		
		function _gotoOrder(athlete) {
			AccountSvc.studentId = athlete.schoolid;
            //
            AthleteSvc.getAthlete(AccountSvc.studentId)
                .then(AccountSvc.saveAthleteData)
                .then(AccountSvc.getSnackLimits)
                .then(getCheckoutHistory)
                .then(AccountSvc.initializeHiddenCategories)
                .then(getAllChoices)
                .then(redirectToCart)
                .catch(IonicAlertSvc.error);			
		}

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
		
        function loadModal() {
            $ionicModal.fromTemplateUrl('app/manager/orderList/editOrderModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                //$scope.modal.show();
            });
            $ionicModal.fromTemplateUrl('app/manager/orderList/newOrderModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.newModal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            $scope.$on('modal.hidden', function () {
                //init();
                CheckoutSvc.checkout().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            });
            $scope.$on('modal.removed', function () {
                console.log("modal removed");
            });
        }
    });
})();
