(function () {
    'use strict';
    
    var SERVICE = 'SettingSvc';

    angular.module('app.core')

    .service('SettingSvc', function ($window, $localstorage) {
        var self = this;
        console.log(SERVICE, 'starting the service');
        
        self.terminalID = -1;
        self.locationID = -1;
        self.getTerminal = _getTerminal;
        self.setTerminal = _setTerminal;
        self.getLocation = _getLocation;
        self.setLocation = _setLocation;
        self.save = _save;
        
        _init();
        function _init() {
            if (!$window.localStorage) {
                console.err(SERVICE, 'There is no localStorage available for storing settings.');                
            } else {
                self.terminalID = $window.localStorage.getItem('terminalID') || -1;
                self.locationID = $window.localStorage.getItem('locationID') || -1;
            }
        }
        
        function _getTerminal() {
            if ($window.localStorage) {
                return $window.localStorage.getItem('terminalID');                
            } else {
                return null;
            }
        }
        
        function _setTerminal(terminalID) {
            if ($window.localStorage) {
                $window.localStorage.setItem('terminalID', terminalID);
            } else {
                console.err(SERVICE, 'There is no localStorage available for storing terminalID.');                
            }
        }

        function _getLocation() {
            if ($window.localStorage) {
                return $window.localStorage.getItem('locationID');                
            } else {
                return null;
            }
        }
        
        function _setLocation(locationID) {
            if ($window.localStorage) {
                $window.localStorage.setItem('locationID', locationID);
            } else {
                console.err(SERVICE, 'There is no localStorage available for storing locationID.');                
            }
        }
        
        function _save() {
            _setTerminal(self.terminalID);
            _setLocation(self.locationID);
        }

    });
})();
