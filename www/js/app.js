// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    
    'app.core',
    'ionic-datepicker', 
    'chart.js',
    
    'app.archiveListCtrl',
    'app.editOrderCtrl',
    'app.errors',
    'app.settings',
	'app.locations', 
    'app.managerCtrl',
    'app.loginMenuCtrl',
    'app.monthlyCounts',
    'app.orderListCtrl',
    'app.rosterManagerCtrl',
    'app.snackChoicesCtrl',
    'app.snackLimitCtrl',
    'app.studentChoices',
    'app.studentLogin',
    'app.teamManagerCtrl',
    'app.todaysCheckouts',
    'app.unauthenticated',
	
	'app.summary', 
	'app.items', 

    'blocks.exception',
    'blocks.errorlog',

    'templates', 
    'ionic.utils'
    ])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        ionic.Platform.fullScreen( true, true );
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function(ChartJsProvider){
    console.log('SET CHART COLOR OPTIONS');
    ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);


    $stateProvider
        .state('tab', {
            url: '/tab',
            templateUrl: 'templates/app.html',
            abstract: true,
            controller: 'ManagerCtrl as vm'
        })
        .state('tab.studentID', {
            url: '/studentID',
            views: {
                'appContent': {
                    templateUrl: 'athleteLogin/login.html',
                    controller: 'StudentLoginCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/athleteLogin/menu.html',
                    controller: 'LoginMenuCtrl as vm'
                }
            }
        })
        .state('tab.updateChoices', {
            url: '/updateChoices',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/snackChoices/updateChoices.html',
                    controller: 'SnackChoicesCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.snackLimits', {
            url: '/snackLimits',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/snackLimits/snackLimits.html',
                    controller: 'SnackLimitCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }
        })
        .state('tab.orderList', {
            cache: false,
            url: '/orderList',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/orderList/orderList.html',
                    controller: 'OrderListCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.archiveList', {
            cache: false,
            url: '/archiveList',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/archiveList/archiveList.html',
                    controller: 'ArchiveListCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }
        })
        .state('tab.dailyReport', {
            cache: false,
            url: '/dailyReport',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/reports/todaysCheckouts.html',
                    controller: 'TodaysCheckoutsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.monthlyCounts', {
            url: '/monthlyCounts',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/reports/monthlyCounts.html',
                    controller: 'MonthlyCountsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.errorReport', {
            url: '/errorReport',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/errorReport/errors.html',
                    controller: 'ErrorsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/settings/settings.html',
                    controller: 'SettingsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.summary', {
            url: '/summary',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/reports/summary/summary.html',
                    controller: 'SummaryCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.items', {
            url: '/items',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/reports/items/items.html',
                    controller: 'ItemsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.locations', {
            url: '/locations',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/locations/locations.html',
                    controller: 'LocationsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.manageRoster', {
            url: '/manageRoster',
            views: {
                'appContent': {
                    templateUrl: 'app/manager/team/roster-manager.html',
                    controller: 'RosterManagerCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'app/manager/menu.html'
                }
            }

        })
        .state('tab.manageSports', {
           url: '/manageSports',
           views: {
               'appContent': {
                   templateUrl: 'app/manager/team/team-manager.html',
                   controller: 'TeamManagerCtrl as vm'
               },
               'sideMenu': {
                   templateUrl: 'app/manager/menu.html'
               }
           }

      })
        .state('cart', {
            url: '/cart',
            templateUrl: 'app/cart/choices.html',
            controller: 'StudentChoicesCtrl as vm'

        })
        .state('unauthenticated', {
            url: '/unauthenticated',
            templateUrl: 'app/authentication/unauthenticated.html',
            controller: 'UnauthenticatedCtrl as vm'

        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/studentID');

});
