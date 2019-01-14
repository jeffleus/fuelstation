(function () {
   'use strict';
	
	var serviceName = "RechargeSvc";

   angular.module('app.recharge')

   .factory(serviceName, function ($http) {
      var service = {
		  getSummary: _getSummary
      };

      var url = 'https://igdgy6rea9.execute-api.us-west-2.amazonaws.com/prod/report/checkouts/summary/';

      return service;

      function _getRecharges(month, year) {
		console.log(serviceName, url + month + '/' + year);
		return $http.get(url + month + '/' + year)
			.then(function(result){
					return result.data;
			});
      }
	   
   });
})();
