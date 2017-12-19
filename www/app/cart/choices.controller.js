(function () {
    'use strict';

    angular.module('app.studentChoices', [])

    .controller('StudentChoicesCtrl', function ($scope, $state, $interval, $q, 
												 $ionicModal, $ionicPopup, $ionicSideMenuDelegate, 
												 ChoiceSvc, AccountSvc, OrderSvc, CheckoutSvc, IonicAlertSvc) {
        var vm = this;

        var timer;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderItems = OrderSvc.orderItems;
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
			//start a promise chain with default continue = TRUE
			var chain = $q.when( true );
			//test to see if item exceeds daily account limit
			if (item.choiceValue + AccountSvc.totalCount > 5) {
				//if exceeds, confirm user wants to override the limit and add to promise chain
				chain = chain.then(_confirmOverride);
			}
			//add a final step to promise chain for processing if override = TRUE
			chain.then(function(res) {
				//will be true if default or user chooses override option
				if (res) {
					_addItemToOrder(item, isSnack, debit);
				}
			});
        }
		
		function _confirmOverride() {
			return $ionicPopup.confirm({
				template: 'Selected item would exceed daily max of 5 credits.  Would you like override the limit for this order?',
				title: 'Max 5 Credits',
				scope: $scope,
				okText: 'Override',
				cancelText: 'Cancel'
			}).then(function(res) {
				console.log('Tapped!', res);
				return res;
			});
		};
					
		function _addItemToOrder(item, isSnack, debit) {
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
			//AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
		}

        function _removeItem(index) {
			
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
            //AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
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
