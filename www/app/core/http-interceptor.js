(function(){
    'use strict';

    var app = angular.module('app');
	var apiUrlFragment = 'us-west-2.amazonaws.com';

    app.factory('authInterceptor', function (AuthSvc) {
		self.authSvc = AuthSvc;
		
        return {
            request: _attachTokenToAPICalls
        }
    });

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);
	
	function _attachTokenToAPICalls(config) {
		//check to see if the url contains the api URL fragment
		if (config.url.includes(apiUrlFragment)) {
			//grab the current token from the AuthSvc
			return self.authSvc.getToken()
			.then(function(token) {
				//log a console warning if the toke was null, but continue to send along
				if (!token) {
					console.warn('The token was returned null to the http service');
					console.info(config.url);
				}
				config.headers['Authorization'] = token;
				return config;                    
			});
		} else { return config; }
	}

})();