(function () {
   'use strict';

   angular.module('app.teamManagerCtrl', [])

   .controller('TeamManagerCtrl', function (IonicAlertSvc, $ionicModal, LoadingSpinner, $scope, SportSvc) {
      var vm = this;

      vm.isUpdate;
      vm.onAddSport = onAddSport;
      vm.onCloseModal = onCloseModal;
      vm.onDeleteSport = onDeleteSport;
      vm.onSaveSport = onSaveSport;
      vm.onUpdateSport = onUpdateSport;
      vm.sports;

      init();

      function init() {
         getSports();
         loadModal();
      }

      function getSports(){
         return SportSvc.getSports()
            .then(onGetSportsSuccess, IonicAlertSvc.error);

         function onGetSportsSuccess(data) {
            vm.sports = data;
         }
      }

      function loadModal() {
         $ionicModal.fromTemplateUrl('app/manager/team/team.modal.html', {
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
      }

      function onAddSport(){
         vm.isUpdate = false;
         openModal();
      }

      function onCloseModal(){
         vm.modal.hide();
         vm.selectedSport = {};
         vm.sportForm.$setPristine();
      }

      function onDeleteSport(sport){
         var msg = {
            template: "Are you sure you want to delete " + sport.description + "?"
         };

         var currentChoiceIndex = vm.sports.indexOf(sport);

         IonicAlertSvc.confirm(msg, onConfirmDelete);

         function onConfirmDelete() {
            LoadingSpinner.show();

            // TODO: Delete sport
			 SportSvc.deleteSport(sport.SportCodeID)
				 .then(onDeleteSuccess, IonicAlertSvc.error);

            function onDeleteSuccess() {
               LoadingSpinner.hide();
               vm.sports.splice(currentChoiceIndex, 1);
            }
         }
      }

      function onSaveSport(){
         //TODO
         LoadingSpinner.show();
		  
		if (vm.selectedSport.createdAt) {
			SportSvc.updateSport(vm.selectedSport)
				.then(onSuccess, IonicAlertSvc.error);
		} else {
			SportSvc.saveSport(vm.selectedSport)
				.then(onSuccess, IonicAlertSvc.error);
		}
		  
         // If there is a choiceID, it is an update. Otherwise, save a new choice.
         // if (vm.isUpdate) {
         //     ChoiceSvc.updateChoice(vm.selectedSnack)
         //         .then(onSuccess, IonicAlertSvc.error);
         // } else {
         //     ChoiceSvc.saveChoice(vm.selectedSnack)
         //         .then(onSuccess, IonicAlertSvc.error);
         // }
		  
		if (vm.selectedSport.createdAt) {
			SportSvc.updateSport(vm.selectedSport)
				.then(onSuccess, IonicAlertSvc.error);
		} else {
			SportSvc.saveSport(vm.selectedSport)
				.then(onSuccess, IonicAlertSvc.error);
		}

         function onSuccess() {
            LoadingSpinner.hide();
            getSports();
            onCloseModal();
            vm.selectedSport = {};
            vm.sportForm.$setPristine();
         }
      }

      function onUpdateSport(sport){
         vm.selectedSport = _.clone(sport);
         vm.isUpdate = true;
         openModal();
      }

      function openModal(){
         vm.modal.show();
      }


   });
})();
