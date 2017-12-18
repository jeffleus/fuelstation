(function () {
   'use strict';
	
	var serviceName = "OverageSvc";

	angular.module('app.overage')

	.factory(serviceName, function ($http) {
		var service = {
		  getOverage: _getOverage
		};

		var url = 'https://6tvxksy2ta.execute-api.us-west-2.amazonaws.com/ademo/report/checkouts/overage/';

		return service;

		function _getOverage(start, end) {
		console.log(serviceName, url + start + '/' + end);
		return $http.get(url + start + '/' + end)
			.then(function(result){
					return result.data;
			});
		}
	   
   });
})();
