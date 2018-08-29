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
            SnackLimits.snackLimits().query()
                .then(onGetSnackLimitsSuccess, IonicAlertSvc.error);
        }

        function onGetSnackLimitsSuccess(data) {
            vm.sportsLimits = data.snacklimit;
        }

        function _onSubmitSnackLimits(sportLimit) {
            LoadingSpinner.show();

            sport = sportLimit.Sport.description;
//            
//            var updateJson = {
//                  "SnackLimitID": sportLimit.SnackLimitID,
//                  "daySnackLimit": sportLimit.daySnackLimit,
//                  "monthSnackLimit": sportLimit.monthSnackLimit
//            };

            SnackLimits.snackLimits().update(sportLimit)
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
