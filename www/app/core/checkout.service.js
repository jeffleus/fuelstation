(function () {
    'use strict';

    angular.module('app.core')

    .factory('CheckoutSvc', function ($http, $resource, ApiEndpoint, IonicAlertSvc, LoadingSpinner) {
        var service = {
            archived: _archived,
            checkout: _checkout,
            currentCheckout: {},
            getCheckoutHistory: _getCheckoutHistory,
            getDailyCheckouts: _getDailyCheckouts,
            getMonthCounts: _getMonthCounts,
            fillCheckoutObject: _fillCheckoutObject,
            processCheckout: _processCheckout,
            setArchiveProperties: _setArchiveProperties,
            setUnarchiveProperties: _setUnarchiveProperties,
            unarchived: _unarchived
        };

        return service;

        
        function _archived() {
//            return $resource(ApiEndpoint.url + 'Checkouts/Archived');
            return {
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/Archived'); 
                }
            };            
        }
        
        function _checkout() {
            // return $resource(ApiEndpoint.url + 'Checkouts/:checkoutID', {
            //     checkoutID: '@checkoutID'
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
            return {
                save: function(checkout) {
                    return $http.post('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout);
                },
                update: function(checkout) {
                    return $http.put('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout);
                },
                get: function(id) {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/',id);
                },
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts?filter=93262,93263,93265,93266');
                }
            };
            return $http.post('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout)
        }

        // This currently returns a specific checkout by checkout ID, not the checkout history of athlete
        function _getCheckoutHistory(id) {
            // return $resource(ApiEndpoint.url + 'Checkouts/History/:studentSportID', {
            //     studentSportID: '@studentSportID'
            // });
            return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/history/' + id)
                .then(function(result){
                    return result.data;
                });
        }
        
        function _getDailyCheckouts() {
            //return $resource(ApiEndpoint.url + 'Checkouts/GetDailyCheckouts');
			return {
				query: function() {
					return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/daily');
				}
			}
        }
        
        /**
        * Gets total orders for each snack by month
        */
        function _getMonthCounts(timePeriod){
            //return $resource(ApiEndpoint.url + 'Checkouts/GetMonthCounts/Month/' + timePeriod.month + '/Year/' + timePeriod.year);
            return {
                query: function(){
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/monthly')
                        .then(function(result){
                            return result.data;
                        });
                }
            }
        }

        /**
        * Sets required data properties on checkout required for database model
        */
        function _fillCheckoutObject(order, studentSportID) {
            var checkout = {};

            checkout.CreateDate = moment().format();
            checkout.StudentSportID = studentSportID;
            checkout.CheckoutChoices = order;

            return checkout;
        }

        function _processCheckout(orderItems, studentSportID) {
            LoadingSpinner.show();
            
            var checkout = service.fillCheckoutObject(orderItems, studentSportID);

            // var saveCheckout = service.checkout().save(checkout);
            // saveCheckout.$promise.then(onOrderSuccess, IonicAlertSvc.error);
            return service.checkout().save(checkout)
                .then(onOrderSuccess)
                .catch(IonicAlertSvc.error);

            function onOrderSuccess() {
                LoadingSpinner.hide();
                var msg = {
                    title: "Thank you for placing your order",
                    redirect: "tab.studentID"
                };
                IonicAlertSvc.alert(msg);
            }
        }

        function _setArchiveProperties(checkout) {
            var currentCheckout = checkout;

            currentCheckout.isArchived = true;
            currentCheckout.archiveDate = moment().format();
            currentCheckout.studentSport = null;

            return currentCheckout;
        }
        
        /**
        * Remove archive properties if order is unarchived to be edited or deleted
        */
        function _setUnarchiveProperties(checkout) {
            var currentCheckout = checkout;

            currentCheckout.isArchived = false;
            currentCheckout.archiveDate = null;
            currentCheckout.studentSport = null;

            return currentCheckout;
        }
        
        function _unarchived() {
            //return $resource(ApiEndpoint.url + 'Checkouts/Unarchived');
            return {
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/Unarchived'); 
                }
            };            
        }
    });
})();
