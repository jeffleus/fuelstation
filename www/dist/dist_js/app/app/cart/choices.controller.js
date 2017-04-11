(function () {
    'use strict';

    angular.module('app.studentChoices', [])

    .controller('StudentChoicesCtrl', ['ChoiceSvc', 'AccountSvc', 'OrderSvc', '$state', 'CheckoutSvc', '$ionicSideMenuDelegate', '$ionicPopup', 'IonicAlertSvc', '$interval', '$scope', function (ChoiceSvc, AccountSvc, OrderSvc, $state, CheckoutSvc, $ionicSideMenuDelegate, $ionicPopup, IonicAlertSvc, $interval, $scope) {
        var vm = this;

        var timer;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderItems = OrderSvc.orderItems;
        vm.timeRemaining = 120;

        vm.cancel = _cancel;
        vm.onOrderClick = _onOrderClick;
        vm.orderItem = _orderItem;
        vm.removeItem = _removeItem;
        vm.toggleLeft = _toggleLeft;

        init();

        function init() {
            // Start counting down timer, which was initialized to 120 above
            timer = $interval(function () {
                vm.timeRemaining--;
                vm.seconds = vm.timeRemaining < 10 ? "0" + vm.timeRemaining : vm.timeRemaining;

                if (vm.timeRemaining === 0) {
                    $interval.cancel(timer);

                    var opts = {};
                    opts.title = "You have been logged out due to inactivity.";
                    opts.shouldClearID = true;
                    opts.redirect = 'tab.studentID';

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
                $state.go('tab.studentID', null, {
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

        function _orderItem(item, isSnack) {
            resetTimer();

            // Clone the item that was added to cart to keep track of whether it is a snack or not. If choice is not cloned first, the snack attribute will remain even if the athlete selects it as pre/post
            var itemClone = _.clone(item);

            if (isSnack) {
                AccountSvc.monthSnacksRemaining--;
                AccountSvc.daySnacksRemaining--;
                itemClone.isSnack = true;
            }

            OrderSvc.addItem(itemClone);
            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function _removeItem(index) {
            resetTimer();

            if (OrderSvc.orderItems[index].isSnack) {
                if (AccountSvc.monthSnacksRemaining < AccountSvc.monthSnacksLimit) {
                    AccountSvc.monthSnacksRemaining++;
                }
                if (AccountSvc.daySnacksRemaining < AccountSvc.daySnacksLimit) {
                    AccountSvc.daySnacksRemaining++;
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
    }]);
})();
