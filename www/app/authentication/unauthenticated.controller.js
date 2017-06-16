(function () {
    'use strict';

    angular
        .module('app.unauthenticated', [])

        .controller('UnauthenticatedCtrl', function (AuthSvc, $ionicModal, $scope, $state) {
            var vm = this;

            vm.closeFSModal = _closeModal;
            vm.loginData = { username: "fsdemo-manager", password: "FuelStation17!" };
            vm.onLogIn = onLogIn;
            vm.onSubmitFS = _onSubmitFS;

            init();

            function init() {
                console.log("UNAUTHORIZED");
            }

            function _closeModal() {
                $scope.fsModal.hide();
            }

            function loadFSModal() {
                $ionicModal.fromTemplateUrl('app/fsLogin/fs-login.modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    focusFirstInput: true
                }).then(function (modal) {
                    $scope.fsModal = modal;
                    $scope.fsModal.show();
                });

                $scope.$on('$destroy', function () {
                    $scope.fsModal.remove();
                });
            }

            function onLogIn(e){
                e.preventDefault();
                loadFSModal();
            }

            function _onSubmitFS() {
                var err = {
                    title: "The password you entered was not correct. Please try again.",
                    stack: (new Error()).stack,
                    cause: "Wrong manager login password"
                };

                AuthSvc.login(vm.loginData).then(function (token) {
                    console.info("idToken", token);
                    $state.go('tab.studentID', null, {
                        reload: true
                    });
                }).catch(function (err) {
                    IonicAlertSvc.error(err);
                });
            }

        });
})();

