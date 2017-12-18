(function () {
    'use strict';
	
	var ctrlName = "SummaryCtrl";

    angular.module('app.summary')

    .controller(ctrlName, function ($scope, $q, $ionicModal, ionicDatePicker, LoadingSpinner, SummarySvc, CsvSvc) {
        var vm = this;		
		vm.items = [];
		vm.openFilter = _openFilter;
        vm.openDateFilter = _openDateFilter;
        vm.openDatePicker = _openDatePicker;
        vm.hideModalDate = _hideModalDate;
        vm.refreshWithFilter = _refreshWithFilter;
        vm.applyFilter = _applyFilter;
        vm.showAverages = _showAverages;
		vm.download = _download;
        vm.displayMode = 0;
		
		vm.dateRange = {
			startDate: moment().subtract(7, 'days'),
			endDate: moment()
		};
        //private values for working with dates
        var type = '';
        var ipObj1 = {
          callback: _datePickerCallback,    //Mandatory
          from: new Date(2017, 7, 1),       //Optional
          to: new Date(2018, 6, 30),        //Optional
          inputDate: new Date(),            //Optional
          mondayFirst: true,                //Optional
          disableWeekdays: [0],             //Optional
          closeOnSelect: false,             //Optional
          templateType: 'popup'             //Optional
        };
        
        vm.colors = [ '#3366cc', '#dc3912', '#ff9900', '#DCDCDC', '#46BFBD', '#949FB1', '#4D5360'];

		_init();
        $scope.$on('$ionicView.enter', function() {
			_init();
		});
		
        function _init() {
            vm.showChart = false;
            _refreshWithFilter();
			loadModals();
        }
		
		function _openFilter() {
			vm.filterModal.show();			
		}
        
        function _openDateFilter() {
            vm.filterDateModal.show();
        }
        
        function _openDatePicker(dateType){
            type = dateType;
            ionicDatePicker.openDatePicker(ipObj1);
        };
        
        function _hideModalDate() {
            vm.filterDateModal.hide();
        }
        
		function _applyFilter() {
			return _refreshWithFilter()
			.then(function() {
				if (vm.filterModal) {
					vm.filterModal.hide();
				}
				return;
			});
		}
        
        function _showAverages() {
            _calculateAverages().then(function(result) {
                vm.averages = result;
            }).then(function(result) {
                vm.displayMode = 1;
            });
        }

        function _download() {
			if (vm.displayMode == 1) {				
				CsvSvc.download(vm.averages, "summary_report_avg_");
			} else {
				CsvSvc.download(vm.items, "summary_report_totals_");
			}
        }

        function _refreshWithFilter() {
            LoadingSpinner.show();
            var fmt = 'YYYY-MM-DD';
			SummarySvc.getSummary(
                vm.dateRange.startDate.format(fmt), 
                vm.dateRange.endDate.format(fmt)).then(function(result) {
                    console.log(ctrlName, result);
                    vm.items = result;
                    _calculateTotals().then(function(result) {
                        console.log(result);
                        vm.totals = result;
                        return;
                    }).then(_calculateSeries)
                    .then(function(results) {
                        console.log(ctrlName, 'set vm data for the chart');
                        vm.series = ['Students', 'Checkouts', 'Items'];
                        vm.labels = results.labels;
                        vm.data = results.data;
                        return;
                    }).catch(function(err) {
                        console.error(err);
                        return;
                    }).finally(function() {
                        LoadingSpinner.hide();
                        vm.filterModal.hide();
                    });
                    //_calculateSeries();
                });
        }
        
		function loadModals() {
			$ionicModal.fromTemplateUrl('app/manager/reports/summary/filterModal.html', {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			}).then(function (modal) {
				vm.filterModal = modal;
			});
			$ionicModal.fromTemplateUrl('app/manager/reports/summary/filterDateModal.html', {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			}).then(function (modal) {
                console.log(ctrlName, vm.dateRange);
				vm.filterDateModal = modal;
			});
		}
        
        function _datePickerCallback(val) {
            console.log(ctrlName, 'Return value from the datepicker popup is : ' + val, new Date(val));
            (type == 'start') ? vm.dateRange.startDate = moment(val) : vm.dateRange.endDate = moment(val);
        }
        
        function _calculateTotals() {
            return $q(function(resolve, reject) {
                var memo = { totalDays: 0, totalStudents: 0, avgStudents: 0, totalCheckouts: 0, totalItems: 0 };
                try {
                    var totals = _.reduce(vm.items, function(m, item) {
                        m.totalDays++;
                        m.totalStudents += item.StudentCount;
                        m.avgStudents = (m.totalDays == 0) ? 0 : m.totalStudents / m.totalDays;
                        m.totalCheckouts += item.CheckoutCount;
                        m.totalItems += item.ItemCount;
                        return m;
                    }, memo);
                    resolve(totals);                    
                }
                catch(e) {
                    reject(e);
                }
            });
        }
        
        function _calculateSeries() {
            return $q(function(resolve, reject) {
                try {
                    var labels = _.map(vm.items, function(item) {
                        return item.ServiceDate.substring(0,10);
                    });
                    console.log(labels);
                    var data = [];
                    data.push(_.pluck(vm.items, 'StudentCount'));
                    data.push(_.pluck(vm.items, 'CheckoutCount'));
                    data.push(_.pluck(vm.items, 'ItemCount'));
                    console.log(data);
                    resolve({ labels: labels, data: data });                    
                }
                catch(e) {
                    reject(e);
                }
            });
        }
        
        function _calculateAverages() {
            return $q(function(resolve, reject) {
                try {
                    var averages = _.map(vm.items, function(item) {
                        var average = {};
                        average.ServiceDate = item.ServiceDate;
                        average.CheckoutPerStudent = (item.StudentCount==0)?0:item.CheckoutCount / item.StudentCount;
                        average.ItemPerStudent = (item.StudentCount==0)?0:item.ItemCount / item.StudentCount;
                        average.ItemPerCheckout = (item.CheckoutCount==0)?0:item.ItemCount / item.CheckoutCount;
                        return average;
                    });
                    console.log(averages);
                    resolve(averages);                    
                }
                catch(e) {
                    reject(e);
                }
            });
        }
    });
})();
