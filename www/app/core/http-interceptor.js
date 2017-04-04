(function(){
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', function () {
        return {
            request: function(config){
                    config.headers['Authorization'] = "eyJraWQiOiJlTDVic0lFNktjbEM4d0NsMk9vXC9LbzJPWTFxczlkcW9OTUt3N1ZcL0l6WjQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5YTE5NDAxOS1mNjE4LTQ3Y2ItOWVlOS1mZTBiMjZiNWEyMDMiLCJhdWQiOiJicTR2cWl0OWhyaDk3dnJrdXJkMm5zNDVwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDkxMjc3NjQ1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9IcUNVOGVsdTQiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJqZWZmbGV1cy1jczEiLCJwaG9uZV9udW1iZXIiOiIrMTMxMDg3NzExNTEiLCJleHAiOjE0OTEyODEyNDUsImlhdCI6MTQ5MTI3NzY0NSwiZW1haWwiOiJqZWZmbGV1cytjczFAZ21haWwuY29tIn0.Da7BLANQDnNhdKFn00cgGkMEdIgfoj2xOV1n7gohEEqy7B_AJ1f339HgH-W5hqqIHHQBRGxr_PAdVWBgFYOnjRQQvjH2gHftn5pwkdn3iWCR0Ye26qPFTGCGIcYNG5pmwI0oQQIrUEXGepb1w_p6ycj2ATlv8v-Mrjh93hF5Un7kLoU911w44RU7xfJkrMTmE4m1QIZtl5M30oZx6G6WDwjfYEOvjKBvg4m0goIcgFHI1Zcqpq-H0WnChShxHDAVEWM1LWw3rV4xYtbQFR5yeZXNFOEALZHQFZdzYdKhKebOOAQQB9z5oawAZMCfNvoIDD97_P2QnrTAeF-2KJiKmQ";

                return config;
            }
        }
    });

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

})();