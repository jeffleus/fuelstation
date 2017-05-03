(function () {
    'use strict';

    angular.module('app.core')

    .factory('AthleteSvc', function ($http, $resource, $cacheFactory, ApiEndpoint) {
      var url = 'https://9cyvf89py9.execute-api.us-west-2.amazonaws.com/dev/athletes/';
        var service = {
            getAthlete: _getAthlete,
            getAthletesBySport: _getAthletesBySport,
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
            return $http.get(url + id)
                .then(function(result){
                    return result.data.athletes; // API returns data in 'athletes' property
                });
        }

        function _getAthletesBySport(sportCode){
           return $http.get(url + "?filter=" + sportCode)
               .then(function(result){
                   return result.data.athletes;
               });
        }
    });
})();
