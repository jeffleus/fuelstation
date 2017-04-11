(function () {
    'use strict';

    angular.module('blocks.errorlog', [])

    .service('ErrorLogSvc', ['$localstorage', function ($localstorage) {
        var service = {
            clear: _clear,
            log: _log
        };

        return service;

        function _clear(){
            var errorWrapper = {
                data: []
            };
            
            $localstorage.setObject('fsErrors', errorWrapper);
        }
        
        function _log(errorData) {
            var errorWrapper = {
                data: []
            };

            var errorLog = {
                date: Date(),
                cause: errorData.cause || errorData.exception.cause,
                stack: errorData.exception.stack || new Error(),
                other: errorData.exception
            };

            var fsErrors = $localstorage.getObject('fsErrors') || {
                data: []
            };
            if (fsErrors.data && fsErrors.data.length > 0) {
                fsErrors.data.unshift(errorLog);
                 errorWrapper.data = fsErrors.data;
            }
            else {
                errorWrapper.data = [errorLog];
            }
            
            $localstorage.setObject('fsErrors', errorWrapper);
        }
    }]);
})();
