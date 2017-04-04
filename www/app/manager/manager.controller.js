(function () {
    'use strict';

    angular.module('app.managerCtrl', [])

    .controller('ManagerCtrl', function (ChoiceSvc, IonicAlertSvc) {
        var vm = this;

        window.setInterval(function () {
            ChoiceSvc.choice().get({id:1});
        }, 30000);
    });
})();
