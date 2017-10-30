(function () {
    'use strict';

    angular.module('app.settings', [])

    .controller('SettingsCtrl', function ($scope, $localstorage, SettingSvc, LocationSvc, AuthSvc) {
        var vm = this;

		vm.settingSvc = SettingSvc;
		vm.saveSettings = _saveSettings;
		
		vm.locations = [
			{LocationID: 1, title: 'Fuel Station', description: 'main fuel station location'},
			{LocationID: 2, title: 'Grab-N-Go', description: 'self-service snack-only location'},
			{LocationID: 3, title: 'Acosta Center', description: 'supplemental snack location'}
		];

		//SettingSvc.locationID = 3;
		console.log(SettingSvc.locationID);
		
		vm.data = {
			"locationID": SettingSvc.locationID//parseInt(SettingSvc.locationID)
		};
		
		function _saveSettings() {
			SettingSvc.save();
		}
        
    });
})();
