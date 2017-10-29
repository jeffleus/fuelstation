(function () {
    'use strict';
    
    var SERVICE = 'LocationSvc';

    angular.module('app.core')

    .service(SERVICE, function ($http) {
        var self = this;
        console.log(SERVICE, 'starting the service');
        
        self.locations = [];
        
        _init();
        function _init() {
			self.locations = [
				{LocationID: 1, title: 'Fuel Station', description: 'main fuel station location'},
				{LocationID: 1, title: 'Grab-N-Go', description: 'self-service snack-only location'},
				{LocationID: 1, title: 'Acosta Center', description: 'supplemental snack location'}
			];
        }
        
    });
})();
