(function () {
    'use strict';

    angular.module('app.core')

    .factory('SnackLimits', function ($resource, $http, ApiEndpoint) {
        var service = {
            athleteSnackLimits: _athleteSnackLimits,
            snackLimits: _snackLimits
        };

        return service;
        
        
        function _athleteSnackLimits() {
            return $resource(ApiEndpoint.url + 'SnackLimits/:schoolsidnumber', {
                schoolsidnumber: "@id"
            }, {
                'update': {
                    method: 'PUT'
                }
            });
        }

        function _snackLimits() {
            return $resource(ApiEndpoint.url + 'SnackLimits/:id', {
                id: "@id"
            }, {
                'update': {
                    method: 'PUT'
                }
            });
        }
    });
})();
