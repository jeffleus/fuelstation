(function () {
    'use strict';

    angular.module('app.core')

	.service('AuthSvc', function($q) {
		var self = this;
		self.isAuthenticated = _isAuthenticated;
		self.login = _login;
		self.logout = _logout;
		self.getUser = _getUser;
		self.getUserType = _getUserType;
		self.getToken = _getToken;
		self.refreshTokens = _refreshTokens;
		self.changePassword = _changePassword;
        self.authNewUser = _authNewUser;
        self.updateUser = _updateUser;
		self.token = null;

		_init();
		function _init() {
			//FuelStation User Pool
			self.poolData = { 
				UserPoolId : "us-west-2_KMI3gTfQw",
				ClientId : "49f7iepq786236nea8t33m1kje"
			};
			AWSCognito.config.update({region:'us-west-2'});
			
			// Use the poolData to construct a UserPool object for use with Cognito
			self.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);

			// Init the user profile data - (eventually split this to a separate profile service?)
			self.userTeam = 'NONE';
			self.userType = 'NONE';			
		}
		

		function _login(loginData) {
			// Begin w/ a validation of the loginData for existence and user/pwd properties
			if (!loginData || !loginData.username || !loginData.password) {
				throw new Error('Invalid login data object passed to _login() of AuthSvc.');
			}
			// Format the loginData for required properties - (need to just expect proper data as param and remove)
			var authenticationData = {
				Username : loginData.username,
				Password : loginData.password
			};
			var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

			var userData = {
				Username : loginData.username,
				Pool : self.userPool
			};
			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
			return $q(function(resolve, reject){
				cognitoUser.authenticateUser(authenticationDetails, {                
					onSuccess: function (result) { 
                        var base64Url = result.idToken.jwtToken.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        var props = JSON.parse(window.atob(base64));
                        self.userTeam = props['custom:team'];
                        self.userType = props['custom:userType'];
                        console.log(self.userProps);
                        
						resolve(result.idToken.jwtToken);
					},

					onFailure: function(err) {
						console.error(err);
						reject(err);
					}
				});            
			});
		}
        		
		function _changePassword(oldPassword, newPassword) {
			var cognitoUser = self.userPool.getCurrentUser();
			return $q(function(resolve, reject){
				cognitoUser.getSession(function(err, session) {
					if (err) {
						console.error('Error encountered during getSession.', err);
						reject(err);
					}
					cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
						if (err) {
							reject(err);
							return;
						}
						console.log('call result: ' + result);
						resolve(result);
					});
				});
			});
		}

		function _isAuthenticated() {
			var cognitoUser = self.userPool.getCurrentUser();

			return (cognitoUser != null);
		}

		function _logout() {
			var cognitoUser = self.userPool.getCurrentUser();

			return cognitoUser.signOut();
		}

		function _getToken() {
			// Grab the current user to allow getting the current session
			var cognitoUser = self.userPool.getCurrentUser();
			// Promise wrap the call 
			return $q(function(resolve, reject) {
				//test for user, and throw error if none found
				if (cognitoUser != null) {
					// Get the session object that will have the id, access, and refresh tokens
					cognitoUser.getSession(function(err, session) {
						if (err) {
							console.error('Error encountered during getSession.', err);
							reject(err);
						}
						console.info('EXPIRES: ' + new Date(session.getIdToken().getExpiration() * 1000 ))
						// Resolve the promise with the idToken
						resolve(session.getIdToken().jwtToken);
					});
				} else {
					console.warn('AuthSvc', 'There is no currentUser on the userPool...');
					return resolve(null);
					//return reject(new Error( 'There is not current user to get a session.  Please Authenticate.' )); 
				}
			});
// LEGACY CODE - original setup for getToken replaced after falling back to SDK refresh token features...
//			return $q(function(resolve, reject) {
//				if (self.token) {
//                    if (self.tokenExpiration > new Date()) {
//						//console.log(self.token);
//                        resolve(self.token);
//                    } else {
//                        console.info('EXPIRED - refresh tokens w/ AWS and the refreshToken...');
//						_refreshTokens();
//                        resolve(null);
//                    }
//                }
//				else {
//					return _getUser().then(function(token) {
//						self.token = token;
//						resolve(token);
//					}).catch(function(err) {
//						reject(err);
//					});
//				}
//			});
		}
		
		function _refreshTokens() {
			//call refresh method in order to authenticate user and get new temp credentials
			AWSCognito.config.credentials.refresh((error) => {
				if (error) {
					console.error(error);
				} else {
					console.log('Successfully refreshed!');
					_getUser();
				}
			});
		}

		function _getUser() {
			var cognitoUser = self.userPool.getCurrentUser();

			return $q(function(resolve, reject) {
				if (cognitoUser != null) {
					cognitoUser.getSession(function(err, session) {
						if (err) {
							console.error('Error encountered during getSession.', err);
							reject(err);
						}
						self.token = session.getIdToken().jwtToken;
                        self.tokenExpiration = new Date(session.getIdToken().getExpiration() * 1000);
						console.info("Token Remain (min): ", (self.tokenExpiration - new Date())/60000);

				// Add the User's Id Token to the Cognito credentials login map.
                AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:28695927-b308-4073-acd6-fedc4e1cd40b',
                    Logins: {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_KMI3gTfQw': session.getIdToken().getJwtToken()
                    }
                });
						
						resolve(session.getIdToken().jwtToken);
					});
				} else { return resolve(null); }
			});
		}
        
        function _getUserType() {
            return _getToken().then(function(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                var props = JSON.parse(window.atob(base64));
                self.userTeam = props['custom:team'];
                self.userType = props['custom:userType'];
                console.log(self.userProps);
                return self.userType;
            });
        }
        
        function _updateUser(newUserType, newUserTeam) {
			var cognitoUser = self.userPool.getCurrentUser();
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    console.error('Error encountered during getSession.', err);
                    reject(err);
                } else {
                    var attributeList = [];
                    var attributeTeam = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
                        Name : 'custom:team',
                        Value : newUserTeam
                    });
                    attributeList.push(attributeTeam);
                    var attributeType = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
                        Name : 'custom:userType',
                        Value : newUserType
                    });
                    attributeList.push(attributeType);
                    cognitoUser.updateAttributes(attributeList, function(err, result) {
                        if (err) {
                            alert(err);
                            return;
                        }
                        console.log('call result: ' + result);
                    });            
//                    cognitoUser.getUserAttributes(function(err, result) {
//                        if (err) {
//                            alert(err);
//                            return;
//                        }
//                        for (var i = 0; i < result.length; i++) {
//                            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
//                        }
//                    });                    
                }
            });
        }
        
        function _authNewUser(loginData) {
			var authenticationData = {
				Username : loginData.username,
				Password : loginData.password
			};
			var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

			var userData = {
				Username : loginData.username,
				Pool : self.userPool
			};
			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            return $q(function(resolve, reject) {
                if (cognitoUser != null) {
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            // User authentication was successful
                            console.log('User Auth for new user was successful!');
                            resolve(result);
                        },

                        onFailure: function(err) {
                            // User authentication was not successful
                            console.error('User Auth Problem: ', err);
                            reject(err);
                        },

                        mfaRequired: function(codeDeliveryDetails) {
                            // MFA is required to complete user authentication.
                            // Get the code from user and call
                            console.log('User Auth requires an MFA code...');
                            cognitoUser.sendMFACode(mfaCode, this)
                        },

                        newPasswordRequired: function(userAttributes, requiredAttributes) {
                            // User was signed up by an admin and must provide new
                            // password and required attributes, if any, to complete
                            // authentication.

                            // the api doesn't accept this field back
                            delete userAttributes.email_verified;

                            // Get these details and call
                            var newPassword = 'FuelStation17!';
                            userAttributes.family_name = 'Leininger';
                            userAttributes.given_name = 'Jeff';
                            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
                        }
                    });
                } else { reject('no user found for authentication...'); }
			});
	   }
    });
})();