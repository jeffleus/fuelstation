(function () {
    'use strict';

    angular.module('app.dashboard', [])

    .controller('DashboardCtrl', function ($scope) {

		$scope.labels = ["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
		$scope.series = ['Series A'];
		$scope.data = [
			[1,50,50,68,86,55,63,69,44,39,5]
		];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
		$scope.options = {
		scales: {
		  yAxes: [
			{
			  id: 'y-axis-1',
			  type: 'linear',
			  display: true,
			  position: 'left'
			}
		  ]
		}
		};
		
		
		$scope.labels_week = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
		$scope.series_week = ['Series A'];
		$scope.data_week = [
			[537,530,519,388,404]
		];
		$scope.onClick_week = function (points, evt) {
			console.log(points, evt);
		};
		$scope.datasetOverride_week = [{ yAxisID: 'y-axis-1' }];
		$scope.options_week = {
		scales: {
		  yAxes: [
			{
			  id: 'y-axis-1',
			  type: 'linear',
			  display: true,
			  position: 'left'
			}
		  ]
		}
		};
		
		
    });
})();
