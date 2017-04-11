(function(){
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', ['AuthSvc', function (AuthSvc) {
        return {
            request: function(config) {
                return AuthSvc.getToken().then(function(token) {
                    config.headers['Authorization'] = AuthSvc.token;
                    return config;                    
                });
            }
        }
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

})();