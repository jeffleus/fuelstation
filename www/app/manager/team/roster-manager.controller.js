(function () {
   'use strict';

   angular.module('app.rosterManagerCtrl', [])

   .controller('RosterManagerCtrl', function (AthleteSvc, IonicAlertSvc, $ionicModal, LoadingSpinner, $scope, SportSvc) {
      var vm = this;

      vm.athletes;
      vm.isUpdate;
      vm.onAddAthlete = onAddAthlete;
      vm.onCloseModal = onCloseModal;
      vm.onDeleteAthlete = onDeleteAthlete;
      vm.onSaveAthlete = onSaveAthlete;
      vm.onSelectSport = onSelectSport;
      vm.onUpdateAthlete = onUpdateAthlete;
      vm.sports;

      init();

      function init() {
         getSports();
         loadModal();
      }

      function getAthletes(sport){
         return AthleteSvc.getAthletesBySport(sport)
            .then(onGetAthletesSuccess, IonicAlertSvc.error);
      }

      function getSports(){
         return SportSvc.getSports()
            .then(onGetSportsSuccess, IonicAlertSvc.error);

         function onGetSportsSuccess(data) {
            vm.sports = data;
         }
      }

      function loadModal() {
         $ionicModal.fromTemplateUrl('app/manager/team/roster.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
         }).then(function (modal) {
            vm.modal = modal;
             console.log('modal was loaded...');
         });

         $scope.$on('$destroy', function () {
            vm.modal.remove();
         });
         $scope.$on('modal.hidden', function () {
            vm.selectedSnack = {};
         });
      }

      function onAddAthlete(){
         vm.isUpdate = false;
         openModal();
      }

      function onCloseModal(){
         vm.modal.hide();
         vm.selectedAthlete = {};
         vm.athleteForm.$setPristine();
      }

      function onDeleteAthlete(athlete){
         var msg = {
            template: "Are you sure you want to delete " + athlete.firstName + " " + athlete.lastName + "?"
         };

         var currentChoiceIndex = vm.athletes.indexOf(athlete);

         IonicAlertSvc.confirm(msg, onConfirmDelete);

         function onConfirmDelete() {
            LoadingSpinner.show();

            // TODO: Delete ath
			AthleteSvc.deleteAthlete(athlete.schoolid)
			 	.then(onDeleteSuccess, IonicAlertSvc);

            function onDeleteSuccess() {
               LoadingSpinner.hide();
               vm.athletes.splice(currentChoiceIndex, 1);
            }
         }
      }

      function onGetAthletesSuccess(data) {
         vm.athletes = data;
      }

      function onSaveAthlete(){
         // TODO
         LoadingSpinner.show();

         // If there is a choiceID, it is an update. Otherwise, save a new choice.
         // if (vm.isUpdate) {
         //     ChoiceSvc.updateChoice(vm.selectedSnack)
         //         .then(onSuccess, IonicAlertSvc.error);
         // } else {
         //     ChoiceSvc.saveChoice(vm.selectedSnack)
         //         .then(onSuccess, IonicAlertSvc.error);
         // }
		  
		  vm.selectedAthlete.sportCode = vm.selectedSport;
		  AthleteSvc.saveAthlete(vm.selectedAthlete)
		  	.then(onSuccess)
		  	.catch(IonicAlertSvc.error);


         function onSuccess(result) {
            LoadingSpinner.hide();
            getAthletes(vm.selectedSport);
            onCloseModal();
            vm.selectedAthlete = {};
            vm.athleteForm.$setPristine();
         }
      }

      function onSelectSport(){
         getAthletes(vm.selectedSport);
      }

      function onUpdateAthlete(athlete){
         vm.selectedAthlete = _.clone(athlete);
         vm.isUpdate = true;
         openModal();
      }

      function openModal(){
          console.log('openModal was clicked...');
          console.info(vm.modal);
         vm.modal.show();
      }


   });
})();
