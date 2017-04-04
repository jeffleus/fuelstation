(function () {
    'use strict';

    angular
        .module('app.editOrderCtrl', [])

    .controller('EditOrderCtrl', function (AccountSvc, OrderSvc, AthleteSvc, IonicAlertSvc, CheckoutSvc, ChoiceSvc, LoadingSpinner, $scope) {
        var vm = this;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderSvc = OrderSvc;
        vm.orderItems = OrderSvc.orderItems;

        vm.closeModal = _closeModal;
        vm.onOrderClick = _onOrderClick;
        vm.orderItem = _orderItem;
        vm.removeItem = _removeItem;

        init();

        $scope.$on("openModal", init);
        function init() {
            if (AccountSvc.studentId) {
                AthleteSvc.getAthlete(AccountSvc.studentId).$promise
                    .then(AccountSvc.saveAthleteData)
                    .then(AccountSvc.getSnackLimits)
                    .then(getCheckoutHistory)
                    .then(initializeHiddenCategories)
                    .then(getAllChoices)
                    .catch(alertAndCloseModal);
            }
        }

        // If there is an error getting the order information, close the modal and alert the error
        function alertAndCloseModal(msg) {
            IonicAlertSvc.error(msg);
            vm.closeModal();
        }

        function _closeModal() {
            //OrderSvc.clear();
            $scope.modal.hide();
        }

        function getAllChoices() {
            ChoiceSvc.getAllChoices().query(ChoiceSvc.initializeChoiceCategories, IonicAlertSvc.error);
        }

        function getCheckoutHistory(id) {
            return CheckoutSvc.getCheckoutHistory().get(id)
                .$promise.then(function (response) {
                    return response;
                }, IonicAlertSvc.error);
        }

        function initializeHiddenCategories(result) {
            // Pass true as second parameter so function knows that this is an update of an order, not a new order
            AccountSvc.initializeHiddenCategories(result, true);
        }

        // Deletes the checkout then posts a new one
        function _onOrderClick() {
            if (OrderSvc.orderItems.length >= 1) {
                LoadingSpinner.show();

                CheckoutSvc.checkout().delete({
                        checkoutID: CheckoutSvc.currentCheckout.checkoutID
                    }).$promise
                    .then(processCheckout)
                    .catch(IonicAlertSvc.error);
            }


            function processCheckout() {
                var checkout = CheckoutSvc.fillCheckoutObject(OrderSvc.orderItems, AccountSvc.athleteData[0].studentSportID);

                CheckoutSvc.checkout().save(checkout).$promise
                    .then(onOrderSuccess)
                    .then(vm.closeModal)
                    .catch(IonicAlertSvc.error);
            }

            function onOrderSuccess() {
                LoadingSpinner.hide();
                var msg = {
                    title: "This order has been updated."
                };
                IonicAlertSvc.alert(msg);
            }

        }

        function _orderItem(item, isSnack) {
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
            if (OrderSvc.orderItems[index].isSnack) {
                if (AccountSvc.monthSnacksRemaining < AccountSvc.monthSnacksLimit) {
                    AccountSvc.monthSnacksRemaining++;
                }
                if (AccountSvc.daySnacksRemaining < AccountSvc.daySnacksLimit) {
                    AccountSvc.daySnacksRemaining++;
                }
            }

            AccountSvc.updateHiddenCategories(OrderSvc.orderItems, OrderSvc.orderItems[index]);
            OrderSvc.removeItem(index);
        }

    });
})();
