(function () {
    'use strict';

    angular.module('app.studentChoices', [])

    .controller('StudentChoicesCtrl', function ($scope, $state, $interval, 
												 $ionicModal, $ionicPopup, $ionicSideMenuDelegate, 
												 ChoiceSvc, AccountSvc, OrderSvc, CheckoutSvc, IonicAlertSvc) {
        var vm = this;

        var timer;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderItems = OrderSvc.orderItems;
        vm.timeRemaining = 120;
		vm.categories = [];

        vm.cancel = _cancel;
        vm.onOrderClick = _onOrderClick;
        vm.orderItem = _orderItem;
        vm.removeItem = _removeItem;
        vm.toggleLeft = _toggleLeft;
		
		vm.changeAthlete = _changeAthlete;

        init();

        function init() {
			vm.choiceSvc.categories().then(function(cats) {
				vm.categories = _.sortBy(_.filter(cats, function(cat) { return cat.CategoryID > 8; }), 'sortOrder');
				console.log('Categorical Choices', vm.categories);
				return;
			});
			loadModal();
            // Start counting down timer, which was initialized to 120 above
            timer = $interval(function () {
                vm.timeRemaining--;
                vm.seconds = vm.timeRemaining < 10 ? "0" + vm.timeRemaining : vm.timeRemaining;

                if (vm.timeRemaining === 0) {
                    $interval.cancel(timer);

                    var opts = {};
                    opts.title = "You have been logged out due to inactivity.";
                    opts.shouldClearID = true;
                    opts.redirect = 'tab.orderList';

                    IonicAlertSvc.alert(opts);
                }
            }, 1000);
        }

        // Cancel timer when controller is destroyed (i.e. when route changes), otherwise timer continues even if user has already been logged out
        $scope.$on('$destroy', function () {
            $interval.cancel(timer);
        });

        function _cancel() {
            var msg = {
                template: "Are you sure you want to cancel this order?"
            };

            var onConfirmFn = function () {
                $state.go('tab.orderList', null, {
                    reload: true
                });
            }

            IonicAlertSvc.confirm(msg, onConfirmFn);
        }

        function _onOrderClick() {
            resetTimer();

            if (!AccountSvc.athleteData || !AccountSvc.athleteData[0]) {
                var opts = {};
                opts.title = "Athlete data error.";
                opts.AcctSvc_athleteData = AccountSvc.athleteData;
                opts.OrderItems = OrderSvc.orderItems;

                IonicAlertSvc.alert(opts);
            }

            if (OrderSvc.orderItems.length >= 1) {
                try {
                    CheckoutSvc.processCheckout(OrderSvc.orderItems, AccountSvc.athleteData[0].AthleteID);
                } catch (err) {
                    IonicAlertSvc.alert(err);
                }
            }
        }

        function _orderItem(item, isSnack, debit) {
            resetTimer();

            // Clone the item that was added to cart to keep track of whether it is a snack or not. If choice is not cloned first, the snack attribute will remain even if the athlete selects it as pre/post
            var itemClone = _.clone(item);
            itemClone.orderType = debit;

            if (isSnack) {
				if(!item.isFree) {
					AccountSvc.monthSnacksRemaining--;
					AccountSvc.daySnacksRemaining--;
					itemClone.isSnack = true;
					AccountSvc.snackCount++;
					AccountSvc.totalCount += item.choiceValue;
				}
            } else {
                itemClone.isSnack = false;
				if (!item.isFree) {
					if (debit === 'pre') AccountSvc.preCount++;
					if (debit === 'post') AccountSvc.postCount++;
					if (debit === 'snack') AccountSvc.snackCount++;
					if (debit === 'staff') AccountSvc.staffCount++;
					AccountSvc.totalCount += item.choiceValue;
				}
            }

            OrderSvc.addItem(itemClone);
            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function _removeItem(index) {
            resetTimer();
			
			if (!OrderSvc.orderItems[index].isFree) {
			
				if (OrderSvc.orderItems[index].isSnack) {
					if (AccountSvc.monthSnacksRemaining < AccountSvc.monthSnacksLimit) {
						AccountSvc.monthSnacksRemaining++;
					}
					if (AccountSvc.daySnacksRemaining < AccountSvc.daySnacksLimit) {
						AccountSvc.daySnacksRemaining++;
					}
				}
				
				AccountSvc.totalCount -= OrderSvc.orderItems[index].choiceValue;

				switch(OrderSvc.orderItems[index].orderType) {
					case 'pre':
						AccountSvc.preCount--;
						break;
					case 'post':
						AccountSvc.postCount--;
						break;
					case 'staff':
						AccountSvc.staffCount--;
						break;
					case 'snack':
						AccountSvc.snackCount--;
						break;
			   }
			}

            OrderSvc.removeItem(index);
            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function resetTimer() {
            vm.timeRemaining = 120;
        }

        function _toggleLeft() {
            $ionicSideMenuDelegate.toggleLeft();
        }
		
		function _changeAthlete() {
			AccountSvc.clear();
			OrderSvc.clear();
			$scope.newModal.show();
		}
		
        function loadModal() {
            $ionicModal.fromTemplateUrl('app/athlete-selector/newOrder.modal.html', {
				id: 'new-order', 
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.newModal = modal;
				$scope.$on('close.newOrder', function() { return closeAndRemove(modal); });
            });

            $scope.$on('$destroy', function (event, modal) {
				console.log('OrderListCtrl::$destroy', modal);
                $scope.newModal.remove();
            });
            $scope.$on('modal.hidden', function (event, modal) {
                //init();
				console.log('OrderListCtrl::modal.hidden', modal);
            });
            $scope.$on('modal.removed', function (event, modal) {
				console.log('OrderListCtrl::modal.removed', modal);
            });
        }
		
		function closeAndRemove(modalInstance) {
            return modalInstance.hide()
                .then(function () {
                    //return modalInstance.remove();
					return;
                });
        }
    });
})();
