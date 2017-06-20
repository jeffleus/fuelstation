(function () {
    'use strict';

    angular.module('app.todaysCheckouts', [])

    .controller('TodaysCheckoutsCtrl', function (CheckoutSvc, IonicAlertSvc, CsvSvc, LoadingSpinner) {
        var vm = this;

        vm.checkouts = [];
        
        vm.download = _download;
        vm.refresh = init;

        init();

        function init() {
            LoadingSpinner.show();
            CheckoutSvc.getDailyCheckouts().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);
        }

        function onGetTodaysCheckouts(response) {
            vm.checkouts = response.data;
            LoadingSpinner.hide();
        }

        function _download() {
            CsvSvc.download(vm.checkouts, "daily_report_");
        }

    });
})();
