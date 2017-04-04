(function () {
    'use strict';

    angular.module('app.core')

    .factory('CsvSvc', function () {
        var service = {
            download: _download,
            JSON2CSV: _JSON2CSV
        };

        return service;

        function _download(checkouts, filenamePrefix) {
            var date = moment().format("MM-DD-YY");

            var csv = service.JSON2CSV(checkouts);
            var uriFile = "data:text/csv;charset=utf-8," + encodeURI(csv);
            var link = document.createElement("a");
            link.setAttribute("href", uriFile);
            link.setAttribute("download", filenamePrefix + date + ".csv");

            link.click();
        }

        /**
        * Parse JSON into CSV format
        */
        function _JSON2CSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

            var str = '';
            var line = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';

                for (var index in array[i]) {
                    if (index.charAt(0) != '$' && index.indexOf('toJSON') === -1)
                        line += array[i][index] + ',';
                }


                line = line.slice(0, -1);
                str += line + '\r\n';
            }
            return str;
        }

    });
})();
