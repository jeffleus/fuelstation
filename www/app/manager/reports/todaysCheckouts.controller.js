(function () {
    'use strict';

    angular.module('app.todaysCheckouts', [])

    .controller('TodaysCheckoutsCtrl', function (CheckoutSvc, IonicAlertSvc, CsvSvc) {
        var vm = this;

        vm.checkouts = [];
        
        vm.download = _download;
        vm.refresh = init;

        init();

        function init() {
            CheckoutSvc.getDailyCheckouts().query().$promise.then(onGetTodaysCheckouts, IonicAlertSvc.error);
        }

        function onGetTodaysCheckouts(response) {
            vm.checkouts = response;
        }

        function _download() {
            CsvSvc.download(vm.checkouts, "daily_report_");
        }

    });
})();
