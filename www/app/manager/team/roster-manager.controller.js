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
      vm.nextAthleteID = "";

      init();

      function init() {
        getSports();
        loadModal();
      }

      function getAthletes(sport) {
        return AthleteSvc.getAthletesBySport(sport)
          .then(onGetAthletesSuccess, IonicAlertSvc.error);
      }

      function getSports() {
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

      function onAddAthlete() {
        vm.isUpdate = false;

        AthleteSvc.getAllAthlete()
          .then(findNextAthleteID)
          .then(function (newid) {
            vm.selectedAthlete = { schoolid: newid };
            openModal();
          });
      }

      function findNextAthleteID(athletes) {
        var lastAthlete = _.chain(athletes)
          .filter(function (ath) { return ath.schoolid.substring(0, 4) == "1718"; })
          .max(function (ath) { return ath.schoolid; })
          .value();
        vm.nextAthleteID = (parseInt(lastAthlete.schoolid) + 1).toString();
        return vm.nextAthleteID;
      }

      function onCloseModal() {
        vm.modal.hide();
        vm.selectedAthlete = {};
        vm.athleteForm.$setPristine();
      }

      function onDeleteAthlete(athlete) {
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

      function onSaveAthlete() {
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
        vm.selectedAthlete.isEnabled = vm.selectedAthlete.isEnabled ? 1 : 0;
        vm.selectedAthlete.hasAllergy = vm.selectedAthlete.hasAllergy ? 1 : 0;
        if (vm.selectedAthlete.createdAt) {
          AthleteSvc.updateAthlete(vm.selectedAthlete)
            .then(onSuccess, IonicAlertSvc.error);
        } else {
          vm.selectedAthlete.sportCode = vm.selectedSport;
          AthleteSvc.saveAthlete(vm.selectedAthlete)
            .then(onSuccess, IonicAlertSvc.error);
        }


        function onSuccess() {
          LoadingSpinner.hide();
          getAthletes(vm.selectedSport);
          onCloseModal();
          vm.selectedAthlete = {};
          vm.athleteForm.$setPristine();
        }
      }

      function onSelectSport() {
        getAthletes(vm.selectedSport);
      }

      function onUpdateAthlete(athlete) {
        vm.selectedAthlete = _.clone(athlete);
        vm.selectedAthlete.isEnabled = vm.selectedAthlete.isEnabled ? true : false;
        vm.selectedAthlete.hasAllergy = vm.selectedAthlete.hasAllergy ? true : false;
        vm.isUpdate = true;
        openModal();
      }

      function openModal() {
        console.log('openModal was clicked...');
        console.info(vm.modal);
        vm.modal.show();
      }


    });
})();
