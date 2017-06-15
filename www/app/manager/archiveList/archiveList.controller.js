(function () {
    'use strict';

    angular.module('app.archiveListCtrl', [])

    .controller('ArchiveListCtrl', function (CheckoutSvc, AuthSvc, IonicAlertSvc) {
        var vm = this;

        vm.name = {};
        vm.todaysCheckouts = [];

        vm.init = init;
        vm.clearFilter = _clearFilter;
        vm.nameFilter = _nameFilter;
        vm.setUnarchive = _setUnarchive;

        init();

        function init() {
			AuthSvc.refreshTokens();
            CheckoutSvc.archived().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            function onGetTodaysCheckouts(response) {
				console.log('ARCHIVED: (' + response.data.count + ') checkouts found.');
                vm.todaysCheckouts = response.data.checkouts;
            }
        }

        function _clearFilter() {
            vm.name = {};
        }

        function _nameFilter(item) {
            if (item.isArchived) {
                // Return archived items that contain the name typed in the filter
                if (vm.name.value && vm.name.value.length > 0) {
					var fullName = item.Athlete.lastName + ', ' + item.Athlete.firstName
                    return item.isArchived && (fullName.toLowerCase().indexOf(vm.name.value.toLowerCase()) > -1);
                }
                // Return all archived items
                return item.isArchived;
            }
        }

        function _setUnarchive(checkout, index) {
            var currentCheckout = CheckoutSvc.setUnarchiveProperties(checkout);

            CheckoutSvc.checkout()
				.update(currentCheckout)
                .then(removeCheckoutFromList, IonicAlertSvc.error);

            function removeCheckoutFromList() {
                vm.todaysCheckouts.splice(index, 1);
//				$scope.$apply();
            }
        }
    });
})();
