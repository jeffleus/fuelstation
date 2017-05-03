(function () {
    angular.module('app').run(function (AuthSvc, $rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!AuthSvc.isAuthenticated() && toState.name !== 'unauthenticated') {
                event.preventDefault();
                 $state.go('unauthenticated');
            }
        });
    });
})();
