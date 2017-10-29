(function () {
    'use strict';

    angular.module('app.locations', [])

    .controller('LocationsCtrl', function (LocationSvc, AuthSvc) {
        var vm = this;

        vm.locationSvc = LocationSvc;
		
		vm.editLocation = _editLocation;
		vm.deleteLocation = _deleteLocation;
		
		function _editLocation(loc) {
			console.log('editLocation', loc);
		}
		
		function _deleteLocation(loc) {
			console.log('deleteLocation', loc);
		}
        
    });
})();
