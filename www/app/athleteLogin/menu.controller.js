(function () {
    'use strict';

    angular
        .module('app.loginMenuCtrl', [])

    .controller('LoginMenuCtrl', function (IonicAlertSvc, $state, LoadingSpinner, $scope, $timeout, $ionicModal) {
        var vm = this;

        vm.password = {};

        vm.closeModal = _closeModal;
        vm.onSubmitPassword = _onSubmitPassword;
        vm.openModal = _openModal;


        loadModal();

        function _closeModal() {
            $scope.modal.hide();
        }

        // Manager login
        function _onSubmitPassword() {
            var err = {
                title: "The password you entered was not correct. Please try again.",
                stack: (new Error()).stack,
                cause: "Wrong manager login password"
            };

            if (vm.password.value === "gobruins42!") {
                $state.go('tab.orderList', null, {
                    reload: true
                });
            } else {
                IonicAlertSvc.error(err);
            }
        }

        function _openModal() {
            $scope.modal.show();
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('app/manager/manager-login.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
        }
    });
})();
