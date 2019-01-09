(function () {
   'use strict';
	
	var serviceName = "SummarySvc";

   angular.module('app.summary')

   .factory(serviceName, function ($http) {
      var service = {
		  getSummary: _getSummary
      };

      var url = 'https://ch9a4pr7ia.execute-api.us-west-2.amazonaws.com/demo/report/checkouts/summary/';

      return service;

      function _getSummary(start, end) {
		console.log(serviceName, url + start + '/' + end);
		return $http.get(url + start + '/' + end)
			.then(function(result){
					return result.data;
			});
      }
	   
   });
})();
