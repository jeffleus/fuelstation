(function () {
    'use strict';

    angular.module('app.settings', [])

    .controller('LocationsCtrl', function ($localstorage, AuthSvc) {
        var vm = this;

        vm.settingSvc = SettingSvc;
        vm.saveSettings = _saveSettings;
        
        function _saveSettings() {
            SettingSvc.save();
        }
        
    });
})();
