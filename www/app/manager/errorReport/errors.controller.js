(function () {
    'use strict';

    angular.module('app.errors', [])

    .controller('ErrorsCtrl', function ($localstorage, ErrorLogSvc) {
        var vm = this;

        vm.errors = {};
        
        vm.deleteLog = _deleteLog;
        vm.parseDate = _parseDate;
        vm.refresh = init;
        
        init();

        function init() {
            var errors = $localstorage.getObject('fsErrors');
            vm.errors = errors.data;
        }
        
        function _deleteLog(){
            ErrorLogSvc.clear();
            init();
        }
        
        function _parseDate(dateStr){
            return moment(dateStr).format('MM-DD-YY, h:mm a');
        }
    });
})();
