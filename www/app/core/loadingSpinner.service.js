(function () {
    'use strict';

    angular.module('app.core')

    .factory('LoadingSpinner', function ($ionicLoading) {
        
        var service = {
            show: _show,
            hide: _hide
        }

        return service;
        
        function _show() {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner>',
                delay: 400,
                duration: 20000
            });
        }
        
        function _hide() {
            $ionicLoading.hide();
        }
    });
})();
