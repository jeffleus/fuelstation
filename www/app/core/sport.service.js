(function () {
   'use strict';

   angular.module('app.core')

   .factory('SportSvc', function ($resource, $http, ApiEndpoint) {
      var service = {
		  getSports: _getSports,
		  saveSport: _saveSport,
		  deleteSport: _deleteSport
      };

      var url = 'https://tsp5us21ie.execute-api.us-west-2.amazonaws.com/dev/sports/';

      return service;


      function _getSports() {
         return $http.get(url)
         .then(function(result){
            return result.data.sports;
         });
      }
	   
	   function _saveSport(s) {
		   return $http.post(url,s)
		   .then(function(result) {
			   console.log(result);
			   return result;
		   });
	   }
	   
	   function _deleteSport(id) {
		   return $http.delete(url + id)
			   .then(function(result) {
				   console.log('deleted sport from db service');
				   return result;
		   		});		   
	   }

   });
})();
