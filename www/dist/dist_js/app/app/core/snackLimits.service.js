(function () {
    'use strict';

    angular.module('app.core')

    .factory('SnackLimits', ['$resource', '$http', 'ApiEndpoint', function ($resource, $http, ApiEndpoint) {
        var service = {
            athleteSnackLimits: _athleteSnackLimits,
            snackLimits: _snackLimits
        };

        var url = 'https://n6jjrfl2j7.execute-api.us-west-2.amazonaws.com/dev/snacklimits/';

        return service;
        
        
        function _athleteSnackLimits() {
            return {
                get: function(schoolSidNumber){
                    return $http.get(url + schoolSidNumber)
                        .then(function(result){
                            return result.data;
                        });
                }
            };
            // return $resource(ApiEndpoint.url + 'SnackLimits/:schoolsidnumber', {
            //     schoolsidnumber: "@id"
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
        }

        function _snackLimits() {
            return {
                query: function(){
                    return $http.get(url)
                        .then(function(result){
                            return result.data;
                        });
                }
            };

            // return $resource(ApiEndpoint.url + 'SnackLimits/:id', {
            //     id: "@id"
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
        }
    }]);
})();
