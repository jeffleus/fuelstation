(function(){
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', function (AuthSvc) {
        return {
            request: function(config) {
				if (config.url.includes('us-west-2.amazonaws.com')) {					
					return AuthSvc.getToken().then(function(token) {
						if (!token) {
							console.warn('The token was returned null to the http service');
							console.info(config.url);
						}
						config.headers['Authorization'] = token;
						return config;                    
                	});
				} else { return config; }
			}
        }
    });

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

})();