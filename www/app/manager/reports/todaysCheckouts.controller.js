(function () {
    'use strict';

	var ctrlName = 'TodaysCheckoutsCtrl';
	
    angular.module('app.todaysCheckouts', [])

    .controller(ctrlName, function ($scope, $ionicModal, ionicDatePicker, CheckoutSvc, IonicAlertSvc, CsvSvc, LoadingSpinner) {
        var vm = this;
		//data array for display in the table
        vm.checkouts = [];
		//modal filter methods to open and close
		vm.openFilter = _openFilter;
		vm.openDateFilter = _openDateFilter;
		vm.openDatePicker = _openDatePicker;
		vm.openItemFilter = _openItemFilter;
        vm.hideModalDate = _hideModalDate;
        vm.hideModalItem = _hideModalItem;
		//download currently filtered data as a CSV
        vm.download = _download;
        vm.refresh = init;
		vm.refreshWithFilter = _refreshWithFilter;
		//utility method to calculate the selected date range
		vm.daysSelected = _daysSelected;
		
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
		//filter data objects - default is yesterday to today
		vm.dateRange = {
			startDate: moment().subtract(1, 'days'),
			endDate: moment()
		};

        init();
        function init() {
//            LoadingSpinner.show();
//			_loadModals().then(function() {
//				CheckoutSvc.getDailyCheckouts().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);
//			});
			_loadModals()
				.then(_refreshWithFilter);
        }

        function _refreshWithFilter() {
			vm.filterModal.hide();
            LoadingSpinner.show();
            var fmt = 'YYYY-MM-DD';
			CheckoutSvc.getDailyCheckouts().query(
				//no args required for now, evenutally needs dateRange
			).then(
				//process today's checkouts 
				onGetTodaysCheckouts
		  	).catch(function(err) {
				console.error(err);
				return;
			}).finally(function() {
				LoadingSpinner.hide();
			});
        }

        function onGetTodaysCheckouts(response) {
            vm.checkouts = response.data;
            //LoadingSpinner.hide();
			return;
        }

        function _download() {
            CsvSvc.download(vm.checkouts, "daily_report_");
        }
		
		function _loadModals() {
			// template URL for each of the modals to load
			var filterModalUrl = 'app/manager/reports/summary/filterModal.html';
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
			ipObj1.inputDate = (type == 'start') ? vm.dateRange.startDate.toDate() : vm.dateRange.endDate.toDate();
            ionicDatePicker.openDatePicker(ipObj1);
        };
        
        function _datePickerCallback(val) {
            console.log(ctrlName, 'Return value from the datepicker popup is : ' + val, new Date(val));
            (type == 'start') ? vm.dateRange.startDate = moment(val) : vm.dateRange.endDate = moment(val);
        }
		
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
		
		function _daysSelected() {
			return vm.dateRange.endDate.diff(vm.dateRange.startDate, 'days') + 1;
		}

    });
})();
