(function () {
    'use strict';
	
	var ctrlName = "ItemsCtrl";

    angular.module('app.items')

    .controller(ctrlName, function ($scope, $q, $ionicModal, $ionicPopup, ionicDatePicker, LoadingSpinner
									 , SummarySvc, ChoiceSvc, ItemsSvc, CsvSvc) {
        var vm = this;		
		vm.items = [];
		vm.openFilter = _openFilter;
        vm.openDateFilter = _openDateFilter;
		vm.openItemFilter = _openItemFilter;
        vm.openDatePicker = _openDatePicker;
        vm.hideModalDate = _hideModalDate;
        vm.hideModalItem = _hideModalItem;
        vm.refreshWithFilter = _refreshWithFilter;
        vm.showAverages = _showAverages;
		vm.download = _download;
        vm.displayMode = 0;
		vm.checkList = _checkList;
		
		vm.dateRange = {
			startDate: moment().subtract(7, 'days'),
			endDate: moment()
		};
		vm.choices;
		vm.selectedItems = [];
        //private values for working with dates
        var type = '';
        var ipObj1 = {
          callback: _datePickerCallback,    //Mandatory
          from: new Date(2017, 7, 1),       //Optional
          to: new Date(2020, 6, 30),        //Optional
          inputDate: new Date(),            //Optional
          mondayFirst: true,                //Optional
          //disableWeekdays: [0],             //Optional
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
			//vm.choices = ItemsSvc.getItems();
			ChoiceSvc.getAllChoices().then(function(choices) {
				vm.choices = choices;
				return;
			}).then(_refreshWithFilter)
			.then(loadModals);
			//_refreshWithFilter();
			//loadModals();
        }
		
		function _openFilter() {
			console.log('open Filter');
			vm.filterModal.show();			
		}
        
        function _openDateFilter() {
			console.log('open DATE Filter');
            vm.filterDateModal.show();
        }
        
        function _openItemFilter() {
			console.log('open ITEM Filter');
            vm.filterItemModal.show();
        }
        
        function _openDatePicker(dateType){
            type = dateType;
            ionicDatePicker.openDatePicker(ipObj1);
        };
        
        function _hideModalDate() {
            vm.filterDateModal.hide();
        }
        
        function _hideModalItem() {			
			vm.selectedItems = _.chain(vm.choices)
				.where({ isSelected: true })
				.pluck('ChoiceID')
				.value();
			console.log(vm.selectedItems.join(","));
            vm.filterItemModal.hide();
        }
		
		function _checkList(choice) {
			var selected = _.where(vm.choices, { isSelected: true });
			if (selected.length > 8 && !self.largeListAckd) {
				$ionicPopup.alert({
					title: 'Large Item List', 
					template: "You have selected more than (8) items to report.  Note a maximum of (8) items can be "
					+ "shown on screen.  However, all selected item data will be included in the CSV export."
				}).then(function(res) {
					self.largeListAckd = true;
					console.log('More than (8) items selected for report.');
				});
			}
		}
        
        function _showAverages() {
            _calculateAverages().then(function(result) {
                vm.averages = result;
            }).then(function(result) {
                vm.displayMode = 1;
            });
        }

        function _download() {
			//clone the data to avoid affecting the on-screen information
			var output = vm.items.slice(0);
			var countOfDays = output.length;
			//clone the series array for a headerRow and add the 'ServiceDate' title to first column
			var headerRow = vm.series.slice(0)
			headerRow.unshift('ServiceDate');
			//clone the totals row and prepend the 'TOTALS' rowHeader to the first column
			var totalsRow = vm.totals.slice(0)
			totalsRow.unshift('TOTALS');
			//clone the totals row and map each numberic col(index>0) to an average by div countOfDays
			var averagesRow = totalsRow.slice(0);
			averagesRow = _.map(averagesRow, function(item, index, list) {
				return (index > 0) ? (item / countOfDays).toFixed(1) : 'AVERAGES';
			});
			
			//prepend the headerRow and append the totals row
			output.unshift(headerRow);
			output.push(totalsRow);
			output.push(averagesRow);
			
			CsvSvc.download(output, "item_report_totals_");
        }

        function _refreshWithFilter() {
            LoadingSpinner.show();
            var fmt = 'YYYY-MM-DD';
			ItemsSvc.getSummary(
                vm.dateRange.startDate.format(fmt), 
                vm.dateRange.endDate.format(fmt),
				vm.selectedItems.join(",")
				//param list for method call so no return needed here...
			).then(function(result) {
				console.log("DataPts: " + result.length);
				vm.items = result;
				return _calculateSeries();
			}).then(function(results) {
				vm.series = results.series;
				vm.labels = results.labels;
				vm.data = results.data;
				
				vm.items = _pivotData(vm.items);				
				return _calculateTotals();
			}).then(function(results) {
				vm.totals = results;
				return;
			}).catch(function(err) {
				console.error(err);
				return;
			}).finally(function() {
				LoadingSpinner.hide();
				vm.filterModal.hide();
			});
        }
        
		function loadModals() {
			// template URL for each of the modals to load
			var filterModalUrl = 'app/manager/reports/items/filterModal.html';
			var dateModalUrl = 'app/manager/reports/summary/filterDateModal.html';
			var itemModalUrl = 'app/manager/reports/items/filterItemModal.html';
			//load each modal using the template and the modal object name on the vm-scope
			return _loadModal( filterModalUrl, 'filterModal' )
				.then(function() {
					return _loadModal( dateModalUrl, 'filterDateModal' );
				}).then(function() {
					return _loadModal( itemModalUrl, 'filterItemModal' )
				});
		}
		
		function _loadModal(templateUrl, scopeModal) {
			return $ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			}).then(function (modal) {
				//reference the modal object on scope using the object[attribute] mechanism
				vm[scopeModal] = modal;
				return;
			});
		}
        
        function _datePickerCallback(val) {
            console.log(ctrlName, 'Return value from the datepicker popup is : ' + val, new Date(val));
            (type == 'start') ? vm.dateRange.startDate = moment(val) : vm.dateRange.endDate = moment(val);
        }
        
        function _calculateTotals() {
            return $q(function(resolve, reject) {
                var memo;
                try {
					//calculate totals for each column(item) of data mapping the data array of columns
					var col_totals = _.map(vm.data, function(col) {
						//var colmemo;
						//use reduce to sum up counts of all days in the item column
						return _.reduce(col, function(memo, num){ return memo + num; }, 0);
						//return total;
					});
                    resolve(col_totals);                    
                }
                catch(e) {
                    reject(e);
                }
            });
        }
        
        function _calculateSeries() {
            return $q(function(resolve, reject) {
                try {
					var grouped = _.groupBy(vm.items, 'ChoiceName');
					var series = _.keys(grouped).sort();
                    var labels = _.map(grouped[series[0]], function(item) {
                        return item.ServiceDate.substring(0,10);
                    });
                    console.log(labels);
                    var data = [];
					_.each(series, function(grp) {
					  data.push(_.pluck(grouped[grp], 'ChoiceCount'));
					});
                    console.log('SeriesCount: ' + data.length);
                    resolve({ series: series, labels: labels, data: data });                    
                }
                catch(e) {
                    reject(e);
                }
            });
        }
		
		function _pivotData(data) {
			//grab a unique(uniq) list of dates(pluck) as a sorted(sort) array(value)
			var dates = _.chain(data)
				.pluck("ServiceDate")
				.uniq()
				.value()
				.sort();
			//group the data by ServiceData creates a row array for each date
			var rowsObj = _.groupBy(data, "ServiceDate");
			//map the dates array, where each row is a list of ChoiceCounts sorted by ChoiceName
			var rows = _.chain(dates).map(function(date) {
				var row = _.chain(rowsObj[date])
					.sortBy("ChoiceName")
					.pluck("ChoiceCount")
					.value();
				//make sure to prepend the date to each row, for row headers
				row.unshift(date);
				return row;
			}).value();
			//return the resulting nested arrays
			return rows;
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
