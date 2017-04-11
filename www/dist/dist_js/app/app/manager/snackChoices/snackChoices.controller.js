(function () {
    'use strict';

    angular.module('app.snackChoicesCtrl', [])

    .controller('SnackChoicesCtrl', ['$ionicSideMenuDelegate', '$ionicPopup', '$ionicModal', '$scope', 'ChoiceSvc', 'IonicAlertSvc', 'LoadingSpinner', function ($ionicSideMenuDelegate, $ionicPopup, $ionicModal, $scope, ChoiceSvc, IonicAlertSvc, LoadingSpinner) {
        var vm = this;

        vm.getType = ChoiceSvc.getType;
        vm.predicate = 'name';
        vm.selectedSnack = {};
        vm.typeOptions = ChoiceSvc.typeOptions();
        vm.activeOptions = [
            { label: "Yes", value: true },
            { label: "No", value: false }
        ];

        vm.closeModal = _closeModal;
        vm.deleteChoice = _deleteChoice;
        vm.editChoice = _editChoice;
        vm.openModal = _openModal;
        vm.saveChoice = _saveChoice;

        init();

        function init() {
            ChoiceSvc.getAllChoices().then(onGetAllChoicesSuccess, IonicAlertSvc.error);

            function onGetAllChoicesSuccess(data) {
                vm.allChoices = data;
            }

            loadModal();
        }

        function _closeModal() {
            vm.modal.hide();
        }

        function _deleteChoice(choice) {
            var msg = {
                template: "Are you sure you want to delete " + choice.name + " from the list of choices?"
            };

            var currentChoiceIndex = vm.allChoices.indexOf(choice);

            IonicAlertSvc.confirm(msg, onConfirmDelete);

            function onConfirmDelete() {
                LoadingSpinner.show();

                ChoiceSvc.choice().delete({
                    id: choice.choiceID
                }, onDeleteSuccess, IonicAlertSvc.error);

                function onDeleteSuccess() {
                    LoadingSpinner.hide();
                    vm.allChoices.splice(currentChoiceIndex, 1);
                }
            }
        }

        function _editChoice(choice) {
            vm.selectedSnack = _.clone(choice);
            vm.openModal();
        }

        function _openModal() {
            vm.modal.show();
            vm.formInvalid = false;
        }

        function _saveChoice() {
            if (!vm.newChoiceForm.$valid) {
                // Display error message if form fields not completed
                vm.formInvalid = true;
            } else {
                LoadingSpinner.show();

                // If there is a choiceID, it is an update. Otherwise, save a new choice.
                if (vm.selectedSnack.ChoiceID) {
                    ChoiceSvc.updateChoice(vm.selectedSnack)
                        .then(onSuccess, IonicAlertSvc.error);
                } else {
                    vm.selectedSnack.categoryID = 6; // Set to 'Misc' category. Api currently requires a category
                    ChoiceSvc.saveChoice(vm.selectedSnack)
                        .then(onSuccess, IonicAlertSvc.error);
                }
            }

            function onSuccess() {
                LoadingSpinner.hide();
                init();
                vm.closeModal();
                vm.selectedSnack = {};
                vm.formInvalid = false;
            }
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('app/manager/snackChoices/choiceModal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                vm.modal = modal;
            });

            $scope.$on('$destroy', function () {
                vm.modal.remove();
            });
            $scope.$on('modal.hidden', function () {
                vm.selectedSnack = {};
            });
            $scope.$on('modal.removed', function () {
                console.log("modal removed");
            });
        }
    }]);
})();
