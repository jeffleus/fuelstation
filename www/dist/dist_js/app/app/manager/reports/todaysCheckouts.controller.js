(function () {
    'use strict';

    angular.module('app.todaysCheckouts', [])

    .controller('TodaysCheckoutsCtrl', ['CheckoutSvc', 'IonicAlertSvc', 'CsvSvc', function (CheckoutSvc, IonicAlertSvc, CsvSvc) {
        var vm = this;

        vm.checkouts = [];
        
        vm.download = _download;
        vm.refresh = init;

        init();

        function init() {
            CheckoutSvc.getDailyCheckouts().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);
        }

        function onGetTodaysCheckouts(response) {
            vm.checkouts = response.data;
        }

        function _download() {
            CsvSvc.download(vm.checkouts, "daily_report_");
        }

    }]);
})();
