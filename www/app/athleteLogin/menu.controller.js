(function () {
    'use strict';

    angular
        .module('app.loginMenuCtrl', [])

    .controller('LoginMenuCtrl', function (IonicAlertSvc, $state, LoadingSpinner, $scope, $timeout, $ionicModal, AuthSvc) {
        var vm = this;

        vm.password = {};
  		vm.loginData = { username:"jeffleus-cs1", password:"GoBruins2017" };

        vm.closeModal = _closeModal;
        vm.closeFSModal = _closeFSModal;
        vm.onSubmitPassword = _onSubmitPassword;
        vm.onSubmitFS = _onSubmitFS;
        vm.openModal = _openModal;
		vm.openFSLogin = _openFSLogin;


        loadModal();
		loadFSModal();

        function _closeModal() {
            $scope.modal.hide();
        }

        function _closeFSModal() {
            $scope.fsModal.hide();
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
        // FS login
        function _onSubmitFS() {
            var err = {
                title: "The password you entered was not correct. Please try again.",
                stack: (new Error()).stack,
                cause: "Wrong manager login password"
            };

			AuthSvc.login(vm.loginData).then(function(token) {
				console.info("idToken", token);
                $state.go('tab.orderList', null, {
                    reload: true
                });
			}).catch(function(err) {
				IonicAlertSvc.error(err);
			});
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
		
		function _openFSLogin() {
            $scope.fsModal.show();
		};

        function loadFSModal() {
            $ionicModal.fromTemplateUrl('app/fsLogin/fs-login.modal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                $scope.fsModal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.fsModal.remove();
            });
        }
    });
})();
