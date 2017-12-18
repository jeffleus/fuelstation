(function () {
    'use strict';
	
	var ctrlName = "OverageCtrl";

    angular.module('app.overage')

    .controller(ctrlName, function ($scope, $q, $ionicModal, ionicDatePicker, LoadingSpinner
									 , OverageSvc, SportSvc, CsvSvc) {
        var vm = this;		
		vm.items = [];
		vm.openFilter = _openFilter;
        vm.openDateFilter = _openDateFilter;
        vm.openDatePicker = _openDatePicker;
        vm.hideModalDate = _hideModalDate;
        vm.refreshWithFilter = _refreshWithFilter;
        vm.applyFilter = _applyFilter;
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
			console.info(ctrlName + '::ionicView.enter');
			_init();
		});
		
        function _init() {
            vm.showChart = false;
			SportSvc.getSports().then(function(sports) {
				vm.sports = _.groupBy(sports, 'SportCodeID');
				console.log(vm.sports);
			}).then(_refreshWithFilter)
			.then(loadModals)
			.catch(function(err) {
				console.error(err);
			});
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

        function _download() {
			if (vm.displayMode == 1) {
				var data = vm.athletes;
				data.unshift({a:'SportCode', b:'StudentID', c:'FirstName', d:'LastName', e:'ServiceDate', f:'OverageCount'});
				CsvSvc.download(vm.athletes, "overage_rpt_ath_");
			} else {							 
				var data = vm.teams;
				data.unshift({a:'SportCode', b:'AthleteCount', c:'OverageCount'});
				CsvSvc.download(vm.teams, "overage_rpt_teams_");
			}
        }

        function _refreshWithFilter() {
            LoadingSpinner.show();
            var fmt = 'YYYY-MM-DD';
			return OverageSvc.getOverage(
                vm.dateRange.startDate.format(fmt), 
                vm.dateRange.endDate.format(fmt))
			.then(function(result) {
				console.log(ctrlName, result);
				//vm.items = result;
				vm.teams = result.teams;
				vm.athletes = result.athletes;
				if (vm.athletes.length > 600) {
					console.info(ctrlName, 'large dataset returned, performance may be slowed');
				}
				return _calculateTotals();
			}).then(function(result) {
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
				return;
			});
        }
        
		function loadModals() {
			$ionicModal.fromTemplateUrl('app/manager/reports/summary/filterModal.html', {
				scope: $scope,
				animation: 'slide-in-up',
				focusFirstInput: true
			}).then(function (modal) {
				vm.filterModal = modal;
				return $ionicModal.fromTemplateUrl('app/manager/reports/summary/filterDateModal.html', {
					scope: $scope,
					animation: 'slide-in-up',
					focusFirstInput: true
				});
			}).then(function (modal) {
                console.log(ctrlName, vm.dateRange);
				vm.filterDateModal = modal;
				return;
			}).catch(function(err) {
				console.error(ctrlName, err);
				return;
			});
		}
        
        function _datePickerCallback(val) {
            console.log(ctrlName, 'Return value from the datepicker popup is : ' + val, new Date(val));
            (type == 'start') ? vm.dateRange.startDate = moment(val) : vm.dateRange.endDate = moment(val);
        }
        
        function _calculateTotals() {
            return $q(function(resolve, reject) {
                var memo = { totalAthletes: 0, totalOverages: 0 };
                try {
                    var totals = _.reduce(vm.teams, function(m, team) {
                        m.totalAthletes += team.PlayerCount;
						m.totalOverages += team.SportOverage;
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
					var sum = function(t, n) { return t + n; };
					var output = _.mapObject(
					  _.groupBy(vm.athletes, function(ath) { return ath.CheckoutDate.substring(0,10); }),
					  function(values, checkoutDate) {
						return {
						  overage: _.reduce(_.pluck(values, 'OverageCount'), sum, 0),
						  athletes: _(values).chain().pluck('SchoolSidNumber').unique().value().length
						};
					  }
					);
					
					var labels = [];
					var dataAthletes = [];
					var dataOverage = [];
					_.each(output, function(elem, key) {
					  labels.push(key);
					  dataAthletes.push(elem.athletes);
					  dataOverage.push(elem.overage);
					});
					labels = labels.sort();
                    console.log(labels);
                    var data = [];
                    data.push(dataAthletes);
                    data.push(dataOverage);
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
