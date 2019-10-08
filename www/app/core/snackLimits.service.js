(function () {
    'use strict';

    angular.module('app.core')

    .factory('SnackLimits', function ($resource, $http, ApiEndpoint) {
        var service = {
            athleteSnackLimits: _athleteSnackLimits,
            snackLimits: _snackLimits
        };

        //mocked service url
        //var url = 'https://bwtchslm53.execute-api.us-west-2.amazonaws.com/dev/snacklimits/';
        //live service url
        var url = 'https://bwtchslm53.execute-api.us-west-2.amazonaws.com/demo/snacklimits/';
        
        return service;
        
        
        function _athleteSnackLimits() {
            return {
                get: function(schoolSidNumber){
                    return $http.get(url + schoolSidNumber)
                        .then(function(result){
                            return result.data.snacklimit[0];
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
                },
                update: function(json){
                    return $http.put(url, json);
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
    });
})();
