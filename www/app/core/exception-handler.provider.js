(function () {
    'use strict';

    angular
        .module('blocks.exception', [])
        .config(exceptionConfig);

    exceptionConfig.$inject = ['$provide'];

    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', '$localstorage', 'ErrorLogSvc'];

    // Borrowed from John Papa. This code adds to Angular's exception handler
    function extendExceptionHandler($delegate, $localstorage, ErrorLogSvc) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            
            ErrorLogSvc.log(errorData);
            
            console.error(exception.msg || exception.message, errorData);   
        };
    }
})();
