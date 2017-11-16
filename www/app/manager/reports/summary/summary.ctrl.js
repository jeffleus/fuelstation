(function () {
    'use strict';
	
	var ctrlName = "SummaryCtrl";

    angular.module('app.summary')

    .controller(ctrlName, function ($scope, $ionicModal, SummarySvc) {
        var vm = this;		
		vm.items = [];
		vm.openFilter = _openFilter;
		
		vm.dateRange = {
			startDate: moment().subtract(7, 'days'),
			endDate: moment()
		};

		_init();
        $scope.$on('$ionicView.enter', function() {
			_init();
		});
		
        function _init() {
            //LoadingSpinner.show();
			SummarySvc.getSummary('2017-11-01', '2017-11-04').then(function(result) {
				console.log(ctrlName, result);
				vm.items = result;
			});
			
			loadModals();
        }
		
		function _openFilter() {
			$scope.filterModal.show();			
		}
		
		function loadModals() {
			$ionicModal.fromTemplateUrl('app/manager/reports/summary/filterModal.html', {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			}).then(function (modal) {
				$scope.filterModal = modal;
//				$scope.filterModal.show();
			});
		}
    });
})();
