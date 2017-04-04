(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('IonicAlertSvc', ioniceAlertSvc);

    function ioniceAlertSvc($ionicPopup, $q, $state, AccountSvc, LoadingSpinner, ErrorLogSvc) {
        var service = {
            alert: _alert,
            confirm: _confirm,
            error: _error
        };

        return service;

        function _alert(msg) {
            LoadingSpinner.hide();

            var opts = {};
            var defaultMsg = "There was an error. Please try again.";

            if (msg) {
                if (msg.title) { // Message passed in manually
                    opts = msg;
                } else if (msg.data) { // Error response from server
                    opts.title = msg.data.message;
                } else {
                    opts.title = defaultMsg;
                }
            } else { // Default error
                opts.title = defaultMsg;
            }

            var iAlert = $ionicPopup.alert(opts);

            iAlert.then(function () {
                if (opts.shouldClearID == true) {
                    AccountSvc.clearStudentId();
                }
                if (opts.redirect) {
                    $state.go(opts.redirect, null, {
                        reload: true
                    });
                }
            });
        }

        function _confirm(msg, onConfirmFn) {
            var opts = {};

            if (msg && msg.title) {
                opts.title = msg.title;
            } else {
                opts.title = "Confirm";
            }

            if (msg && msg.template) {
                opts.template = msg.template;
            }

            var confirmPopup = $ionicPopup.confirm(opts);

            confirmPopup.then(function (res) {
                LoadingSpinner.hide();

                if (res) {
                    onConfirmFn();
                }
            });
        }
        
        
        // Log error then call Ionic alert
        function _error(msg){
            var errorData = {
                exception: msg
            };
            
            ErrorLogSvc.log(errorData);
            
            return service.alert(msg);
        }
    }
})();
