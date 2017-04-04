(function () {
    'use strict';

    angular.module('app.core')

    .service('OrderSvc', function (AccountSvc, CheckoutSvc, IonicAlertSvc) {
        var self = this;

        self.orderItems = [];

        self.addItem = _addItem;
        self.clear = _clear;
        self.parseChoices = _parseChoices;
        self.removeItem = _removeItem;

        function _addItem(item) {
            self.orderItems.push(item);
        }

        function _clear() {
            self.orderItems = [];
        }
        
        // Format data correctly for updating orders
        function _parseChoices(checkoutChoices) {
            var choices = [];
            for (var i = 0; i < checkoutChoices.length; i++) {
                var choice = {};
                choice = checkoutChoices[i].choice;
                
                if (checkoutChoices[i].isSnack) {
                    choice.isSnack = true;
                }
                                
                choices.push(choice);
            }
            return choices;
        }

        function _removeItem(index) {
            self.orderItems.splice(index, 1);
        }
    });
})();
