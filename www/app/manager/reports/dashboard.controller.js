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
		$scope.datasetOverride = [{ 
			yAxisID: 'y-axis-1',
		    borderColor: '#600',
			borderWidth: 4,
			backgroundColor: '#ffb380',
			pointBackgroundColor: '#ff6600',
			pointBorderColor: '#600',
			pointBorderWidth: 1,
			pointRadius: 4
		}];
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
		$scope.datasetOverride_week = [{ 
			yAxisID: 'y-axis-1',
		    borderColor: '#600',
			borderWidth: 4,
			backgroundColor: '#f60',
			pointBackgroundColor: '#f60',
			pointBorderColor: '#600',
			pointBorderWidth: 1,
			pointRadius: 4
		}];
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
		
		$scope.labels_top = ['MFB','MSO','WBB','WSO','MCC','MWR','MBB','COA','STU','WSW','MTO','WTO','WFH','WCC'];
		$scope.series_top = ['Teams'];
		$scope.data_top = [
			[64,35,21,14,13,9,7,5,5,4,3,3,2,2]
		];
		$scope.datasetOverride_top = [{ 
		    borderColor: '#600',
			//borderWidth: 4,
			backgroundColor: '#f60',
//			pointBackgroundColor: '#f60',
//			pointBorderColor: '#600',
//			pointBorderWidth: 1,
//			pointRadius: 4
		}];

		
		$scope.labels_items = ['Sandwich - Ham','PB&J','Cut Fruit','Applesauce','Chocolate Milk','Greek Yogurt','Sandwich #2','Whole Fruit','Bagel','Cheribundi'];
		$scope.series_items = ['Items'];
		$scope.data_items = [
			[31,19,14,11,11,9,9,7,5,5]
		];
		$scope.datasetOverride_items = [{ 
//			yAxisID: 'y-axis-1',
		    borderColor: '#600',
//			borderWidth: 4,
			backgroundColor: '#ffb380',
//			pointBackgroundColor: '#ff6600',
//			pointBorderColor: '#600',
//			pointBorderWidth: 1,
//			pointRadius: 4
		}];
		$scope.options_items = {
		scales: {
		  xAxes: [{
			  ticks: {
				min: 0
				}
		  }]
		}
		};

	});
})();
