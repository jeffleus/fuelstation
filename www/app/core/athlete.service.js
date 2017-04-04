(function () {
    'use strict';

    angular.module('app.core')

    .factory('AthleteSvc', function ($http, $resource, $cacheFactory, ApiEndpoint) {
        var service = {
            getAthlete: _getAthlete,
            athleteApi: _athleteApi
        };

        return service;

        function _athleteApi() {
            // return $resource(ApiEndpoint.url + 'StudentSport/:schoolsidnumber', {
            //     schoolsidnumber: "@id"
            // });
        }

        function _getAthlete(id) {
            // return service.athleteApi().query({
            //     schoolsidnumber: id
            // });
            return $http.get('https://9cyvf89py9.execute-api.us-west-2.amazonaws.com/dev/athletes/' + id)
                .then(function(result){
                    return result.data.athletes; // API returns data in 'athletes' property
                });
        }
    });
})();
