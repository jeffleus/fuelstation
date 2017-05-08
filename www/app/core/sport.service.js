(function () {
   'use strict';

   angular.module('app.core')

   .factory('SportSvc', function ($resource, $http, ApiEndpoint) {
      var service = {
         getSports: getSports
      };

      var url = 'https://tsp5us21ie.execute-api.us-west-2.amazonaws.com/dev/sports/';

      return service;


      function getSports() {
         return $http.get(url)
         .then(function(result){
            return result.data.sports;
         });
      }

   });
})();
