(function () {
    'use strict';

    angular.module('app.core')

	.service('AuthSvc', function($q) {
		var self = this;
		self.isAuthenticated = _isAuthenticated;
		self.login = _login;
		self.logout = _logout;
		self.getUser = _getUser;
		self.getToken = _getToken;
		self.token = null;

		self.poolData = { 
			UserPoolId : "us-west-2_HqCU8elu4",
			ClientId : "bq4vqit9hrh97vrkurd2ns45p"
		};
		AWSCognito.config.update({region:'us-west-2'});

		function _login(loginData) {
			var authenticationData = {
				Username : loginData.username,
				Password : loginData.password
			};
			var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var userData = {
				Username : loginData.username,
				Pool : userPool
			};
			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
			return $q(function(resolve, reject){
				cognitoUser.authenticateUser(authenticationDetails, {                
					onSuccess: function (result) {
						//console.log('access token + ' + result.getAccessToken().getJwtToken());
						/*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
						console.log('refreshToken + ' + result.getRefreshToken().token);
						console.log('accessToken + ' + new Date(result.getAccessToken().getExpiration() * 1000));
						console.log('idToken + ' + new Date(result.getIdToken().getExpiration() * 1000));
						self.token = result.idToken.jwtToken;
						resolve(result.idToken.jwtToken);
					},

					onFailure: function(err) {
						console.error(err);
						reject(err);
					}
				});            
			});
		}

		function _isAuthenticated() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return (cognitoUser != null);
		}

		function _logout() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return cognitoUser.signOut();
		}

		function _getToken() {
			return $q(function(resolve, reject) {
				if (self.token) resolve(self.token);
				else {
					return _getUser().then(function(token) {
						self.token = token;
						resolve(token)
					}).catch(function(err) {
						reject(err);
					});
				}
			});
		}

		function _getUser() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return $q(function(resolve, reject) {
				if (cognitoUser != null) {
					cognitoUser.getSession(function(err, session) {
						if (err) {
							console.error('Error encountered during getSession.', err);
							reject(err);
						}
						console.log('session validity: ' + session.isValid());
						var remainSec = Math.abs(new Date() - new Date(session.getIdToken().getExpiration()*1000));
						console.log('session expiration: ' + (remainSec / 1000 / 60));
						resolve(session.getIdToken().jwtToken);
	//                    // NOTE: getSession must be called to authenticate user before calling getUserAttributes
	//                    cognitoUser.getUserAttributes(function(err, attributes) {
	//                        if (err) {
	//                            // Handle error
	//                            console.error('Error encountered during getUserAttributes', err);
	//                            reject(err);
	//                        } else {
	//                            // Do something with attributes
	//                            resolve(session.getIdToken().getJwtToken());
	//                        }
	//                    });

		//                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		//                    IdentityPoolId : '...', // your identity pool id here
		//                    Logins : {
		//                        // Change the key below according to the specific region your user pool is in.
		//                        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
		//                    }
		//                });

						// Instantiate aws sdk service objects now that the credentials have been updated.
						// example: var s3 = new AWS.S3();

					});
				} else { return resolve(null); }
			});
		}
	});
})();
