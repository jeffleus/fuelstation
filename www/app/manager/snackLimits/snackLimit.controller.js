(function () {
    'use strict';

    angular.module('app.snackLimitCtrl', [])

    .controller('SnackLimitCtrl', function (SnackLimits, $ionicPopup, IonicAlertSvc, LoadingSpinner) {
        var vm = this;
        var sport;

        vm.onSubmitSnackLimits = _onSubmitSnackLimits;
        vm.sportsLimits;

        init();

        function init() {
            SnackLimits.snackLimits().query().$promise
                .then(onGetSnackLimitsSuccess, IonicAlertSvc.error);
        }

        function onGetSnackLimitsSuccess(data) {
            vm.sportsLimits = data;
        }

        function _onSubmitSnackLimits(sportLimit) {
            LoadingSpinner.show();

            sport = sportLimit.sport.sportDescription;

            SnackLimits.snackLimits().update(sportLimit).$promise
                        .then(onUpdateSnackLimitSuccess, IonicAlertSvc.error);
        }

        function onUpdateSnackLimitSuccess() {
            LoadingSpinner.hide();

            var msg = {
                title: "Snack limits for " + sport + " have been saved."
            };
            IonicAlertSvc.alert(msg);
        }
    });
})();
