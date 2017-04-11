(function () {
    'use strict';

    angular.module('app.orderListCtrl', [])

    .controller('OrderListCtrl', ['AccountSvc', 'CheckoutSvc', 'IonicAlertSvc', 'OrderSvc', '$ionicModal', '$scope', 'LoadingSpinner', '$timeout', '$interval', function (AccountSvc, CheckoutSvc, IonicAlertSvc, OrderSvc, $ionicModal, $scope, LoadingSpinner, $timeout, $interval) {
        var vm = this;
        var polling;

        vm.name = {};
        vm.todaysCheckouts = [];

        vm.init = init;
        vm.clearFilter = _clearFilter;
        vm.deleteCheckout = _deleteCheckout;
        vm.nameFilter = _nameFilter;
        vm.openModal = _openModal;
        vm.setArchive = _setArchive;

        init();

        function init() {
            LoadingSpinner.show();

            CheckoutSvc.unarchived().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            // Fix bug where header is hidden on route change, with delay to make sure this function gets called after the view is finished rendering
            $timeout(function () {
                showHeader();
            }, 800);

            polling = $interval(function () {
                CheckoutSvc.unarchived().query().then(onGetTodaysCheckouts);
            }, 20000);

            loadModal();
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
                    return !item.isArchived && (item.studentSport.fullName.toLowerCase().indexOf(vm.name.value.toLowerCase()) > -1);
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
                .then(init)
                .catch(IonicAlertSvc.error);

            function removeCheckoutFromList() {
                vm.todaysCheckouts.splice(index, 1);
            }
        }

        function showHeader() {
            angular.element(document.querySelector("ion-nav-bar")).removeClass("hide");
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('app/manager/orderList/editOrderModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                //$scope.modal.show();
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
    }]);
})();
