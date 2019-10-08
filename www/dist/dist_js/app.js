angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('athleteLogin/login.html','<ion-view view-title="Fuel Station">\r\n    <ion-content class="padding text-center has-header" has-bouncing="false">\r\n        <div>\r\n            <h1 class="light-weight">Fuel Station</h1>\r\n            <h3 class="light-weight">\r\n                    Please enter your student ID:\r\n                </h3>\r\n            <h2 class="light-weight">{{vm.accountSvc.studentId}} &nbsp;</h2>\r\n        </div>\r\n\r\n        <div class="numpad-container">\r\n\r\n            <div class="row">\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'1\')">\r\n                        <h1>1</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'2\')">\r\n                        <h1>2</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'3\')">\r\n                        <h1>3</h1></button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'4\')">\r\n                        <h1>4</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'5\')">\r\n                        <h1>5</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'6\')">\r\n                        <h1>6</h1></button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'7\')">\r\n                        <h1>7</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'8\')">\r\n                        <h1>8</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'9\')">\r\n                        <h1>9</h1></button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.deleteButton()">\r\n                        <h1><i class="icon ion-arrow-left-b line-height-0 larger-icon"></i></h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.numButton(\'0\')">\r\n                        <h1>0</h1></button>\r\n                </div>\r\n                <div class="col key-padding">\r\n                    <button type="button" class="button button-stable round-ios-button" ng-click="vm.accountSvc.clearStudentId()">\r\n                        <h1>CLR</h1></button>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>\r\n');
$templateCache.put('athleteLogin/menu.html','<header class="bar bar-header bar-positive">\n    <h1 class="title">Menu</h1>\n</header>\n<ion-content class="has-header">\n\n    <ul class="list">\n        <li>\n            <a class="item item-calm" menu-close ng-click="vm.openModal()">Manager</a>\n        </li>\n        <li>\n            <a class="item" menu-close ng-click="vm.openFSLogin()">{{vm.authSvc.isAuthenticated()?\'Logout\':\'Login\'}}</a>\n        </li>\n        <li>\n            <a class="item" menu-close ng-click="vm.authNewUser(vm.newUser)">Auth New User</a>\n        </li>\n<!--\n        <li>\n            <a class="item item-calm" menu-close ng-click="vm.changePassword()">Change Pwd</a>\n        </li>\n-->\n    </ul>\n</ion-content>\n');
$templateCache.put('cart/choices.html','<ion-view view-title="Fuel Station">\r\n    <ion-side-menus>\r\n\r\n        <ion-side-menu-content>\r\n            <ion-header-bar class="bar-positive">\r\n                <button class="button button-icon ion-navicon" ng-click="vm.toggleLeft()" ng-hide="$exposeAside.active"></button>\r\n                <h1 class="title">Fuel Station Choices</h1>\r\n            </ion-header-bar>\r\n            <ion-content class="padding">\r\n\r\n                <div ng-if="!vm.accountSvc.shouldHidePre" class="category-fade">\r\n                    <h4>Pre-Workout Options:</h4>\r\n                    <hr />\r\n                    <p>\r\n                        <button class="button button-balanced" ng-repeat="c in vm.choiceSvc.pre" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\r\n                    </p>\r\n                </div>\r\n                <div ng-if="!vm.accountSvc.shouldHidePost" class="category-fade">\r\n                    <h4>Post-Workout Options:</h4>\r\n                    <hr />\r\n                    <p>\r\n                        <button class="button button-royal" ng-repeat="c in vm.choiceSvc.post" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\r\n                    </p>\r\n                </div>\r\n                <div ng-if="!vm.accountSvc.shouldHideHydration" class="category-fade">\r\n                    <h4>Hydration Options:</h4>\r\n                    <hr />\r\n                    <p>\r\n                        <button class="button button-energized" ng-repeat="c in vm.choiceSvc.hydration" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\r\n                    </p>\r\n                </div>\r\n                <div ng-if="!vm.accountSvc.shouldHideSnacks" class="category-fade">\r\n                    <h4>Snack Options:</h4>\r\n                    <hr />\r\n                    <p>\r\n                        <button class="button button-calm" ng-repeat="c in vm.choiceSvc.snacks" ng-click="vm.orderItem(c, true)" ng-show="c.isActive">\r\n                            {{c.name}}\r\n                        </button>\r\n                        <button class="button button-balanced" ng-repeat="c in vm.choiceSvc.pre" ng-if="vm.accountSvc.shouldHidePre && c.isActive" ng-click="vm.orderItem(c, true)">\r\n                            {{c.name}}\r\n                        </button>\r\n                        <button class="button button-royal" ng-repeat="c in vm.choiceSvc.post" ng-if="vm.accountSvc.shouldHidePost && c.isActive" ng-click="vm.orderItem(c, true)">\r\n                            {{c.name}}\r\n                        </button>\r\n                        <button class="button button-energized" ng-repeat="c in vm.choiceSvc.hydration" ng-if="vm.accountSvc.shouldHideHydration && c.isActive" ng-click="vm.orderItem(c, true)">\r\n                            {{c.name}}\r\n                        </button>\r\n                    </p>\r\n                </div>\r\n                <div class="category-fade" ng-if="(vm.accountSvc.shouldHideSnacks &&\r\n                     vm.accountSvc.shouldHideHydration &&\r\n                     vm.accountSvc.shouldHidePre &&\r\n                     vm.accountSvc.shouldHidePost)">\r\n\r\n                    <div class="energized-bg padding">\r\n                        <h4 class="text-white">\r\n                            You have reached your limit. To change your selection, remove items from your order list.\r\n                        </h4>\r\n                    </div>\r\n                </div>\r\n            </ion-content>\r\n        </ion-side-menu-content>\r\n\r\n        <ion-side-menu expose-aside-when="large">\r\n            <ion-header-bar class="bar-positive">\r\n                <h1 class="title">Current Order:</h1>\r\n            </ion-header-bar>\r\n\r\n            <ion-content>\r\n                <div ng-show="vm.timeRemaining < 60" class="padding text-center">\r\n                    <h4 class="text-center assertive"><strong>0:{{vm.seconds}} remaining. <br />Please make a selection.</strong></h4>\r\n                </div>\r\n                <ion-item class="bar-stable">\r\n                    <p class="text-center">\r\n                        Welcome, {{vm.accountSvc.athleteData[0].firstName}}\r\n                        <br /><br />\r\n                    </p>\r\n                    <p>\r\n                        <strong>\r\n                            Monthly snacks remaining: {{vm.accountSvc.monthSnacksRemaining}}<br />\r\n                            Snacks remaining today: {{vm.accountSvc.daySnacksRemaining}}<br />\r\n                        </strong>\r\n                    </p>\r\n                </ion-item>\r\n                <ion-item>\r\n                    <button class="button button-stable stable-border" ng-click="vm.cancel()">Cancel</button>\r\n\r\n                    <button class="button button-positive" ng-click="vm.onOrderClick()" ng-disabled="vm.orderItems.length === 0">Order</button>\r\n                </ion-item>\r\n                <ion-item class="item-button-right" ng-repeat="oi in vm.orderItems track by $index">\r\n                    {{oi.name}}\r\n                    <a class="button button-icon icon ion-close-circled assertive" ng-click="vm.removeItem($index)"></a>\r\n                </ion-item>\r\n\r\n            </ion-content>\r\n        </ion-side-menu>\r\n\r\n    </ion-side-menus>\r\n</ion-view>\r\n');
$templateCache.put('fsLogin/fs-login.modal.html','<ion-modal-view>\n    <ion-header-bar class="bar-positive">\n        <h1 class="title">FS Login</h1>\n    </ion-header-bar>\n    <ion-content class="has-header">\n        <form name="vm.loginForm" autocomplete="off" ng-submit="vm.onSubmitFS()" novalidate>\n            <div class="list">\n\n\t\t\t\t<label class="item item-input">\n\t\t\t\t  <span class="input-label">Username</span>\n\t\t\t\t  <input type="text" ng-model="vm.loginData.username">\n\t\t\t\t</label>\n\t\t\t\t<label class="item item-input">\n\t\t\t\t  <span class="input-label">Password</span>\n\t\t\t\t  <input type="password" ng-model="vm.loginData.password">\n\t\t\t\t</label>\n\n                <div class="padding">\n                    <button ng-click="vm.closeFSModal()" class="button button-stable" type="button">Cancel</button>\n                    <button class="button button-positive" type="submit">Submit</button>\n                </div>\n\n\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>');
$templateCache.put('manager/manager-login.html','<ion-modal-view>\n    <ion-header-bar class="bar-positive">\n        <h1 class="title">Manager Login</h1>\n    </ion-header-bar>\n    <ion-content class="has-header">\n        <form name="vm.passwordForm" autocomplete="off" ng-submit="vm.onSubmitPassword()" novalidate>\n            <div class="list">\n\n                <label for="password" class="item item-input">\n                    <span class="input-label">\n                        Password\n                    </span>\n                    <input ng-model="vm.password.value" name="password"\n                           type="password" />\n                </label>\n\n                <div class="padding">\n                    <button ng-click="vm.closeModal()" class="button button-stable" type="button">Cancel</button>\n                    <button class="button button-positive" type="submit">Submit</button>\n                </div>\n\n\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>');
$templateCache.put('manager/menu.html','<header class="bar bar-header bar-positive">\n    <h1 class="title">Menu</h1>\n</header>\n<ion-content class="has-header">\n\n    <ul class="list">\n        <li class="item item-divider">\n            Today\'s Orders\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/orderList">Open Order List</a>\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/archiveList">Archived Orders List</a>\n        </li>\n        <li class="item item-divider">\n            FuelStation Config\n        </li>\n        <li>\n            <a class="item" menu-close nav-clear href="#/tab/snackLimits">Snack Limits</a>\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/updateChoices">FuelStation Choices</a>\n        </li>\n        <li class="item item-divider">\n            Reporting\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/dailyReport">Today\'s Checkout Report</a>\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/monthlyCounts">Monthly Counts Report</a>\n        </li>\n        <li>\n            <a class="item" menu-close href="#/tab/errorReport">Error Report</a>\n        </li>\n        <li>\n            <a class="item item-balanced" menu-close href="#/tab/studentID">Return to Athlete Checkout</a>\n        </li>\n        <li>\n            <span class="item item-divider item-stable" style="font-style: italic">v 0.0.5</span>\n        </li>\n    </ul>\n</ion-content>\n');
$templateCache.put('manager/archiveList/archiveList.html','<ion-view view-title="Today\'s Archive">\n    <ion-nav-buttons side="right">\n        <button class="button button-large ng-click-active ion-refresh" ng-click="vm.init()"> Refresh\n        </button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class="container">\n            <ul class="list m-b-0">\n                <li class="item item-icon-right">\n                    <i ng-if="vm.name.value" ng-click="vm.clearFilter()" class="icon ion-close-circled assertive"></i>\n                    <input type="text" ng-model="vm.name.value" placeholder="Filter by name" class="col">\n                </li>\n            </ul>\n            <div class="row  unlimited-items">\n                <div class="col-33 animate-leave" ng-repeat="checkout in vm.todaysCheckouts  | filter: vm.nameFilter track by $index">\n                    <div class="list card card-checkout">\n                        <div class="item item-card-divider item-button-right positive-bg text-white">\n                            <button class="button button-clear" ng-click="vm.setUnarchive(checkout, $index)"><i class="icon ion-reply light"></i></button>\n                            <strong>{{checkout.Athlete.firstName + \' \' + checkout.Athlete.lastName}}</strong>\n                            <br>\n                            <small>{{checkout.createDate | date: \'shortTime\'}}</small>\n                        </div>\n                        <div class="card-order-body" ng-click="editCheckout(checkout)">\n                            <ion-scroll>\n                                <ion-list>\n                                    <ion-item class="padding" ng-repeat="choice in checkout.CheckoutChoices">\n                                        {{choice.Choice.name}}\n                                    </ion-item>\n                                    <ion-item></ion-item>\n                                </ion-list>\n                            </ion-scroll>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </ion-content>\n</ion-view>\n');
$templateCache.put('manager/errorReport/errors.html','<ion-view view-title="Errors">\n    <ion-nav-buttons side="right">\n        <button class="button button-large ng-click-active ion-refresh" ng-click="vm.refresh()"> Refresh\n        </button>\n    </ion-nav-buttons>\n    <ion-content class="has-header">\n        <button class="button button-assertive" ng-click="vm.deleteLog()">Delete Log</button>\n        <div class="container padding">\n            <!--<div class="row stable-bg">\n                <div class="col-10"><strong>Date</strong></div>\n                <div class="col-20"><strong>Cause</strong></div>\n                <div class="col-33"><strong>Stack</strong></div>\n                <div class="col-33"><strong>Other</strong></div>\n            </div>\n\n            <div class="row m-t-20 m-b-10" ng-repeat="error in vm.errors" style="border-bottom: 1px #ccc solid">\n                <div class="col-10" ng-bind="vm.parseDate(error.date)"></div>\n                <div class="col-20">{{error.cause}}</div>\n                <div class="col-33">{{error.stack}}</div>\n                <div class="col-33">{{error.other}}</div>\n            </div>-->\n\n            <div class="row padding" ng-class="{\'stable-bg\': $index % 2 === 1}" ng-repeat="error in vm.errors">\n                <div class="col">\n                    <strong><p ng-bind="vm.parseDate(error.date)"></p></strong>\n                    <p><strong>Cause:</strong> {{error.cause}}</p>\n                    <p><strong>Stack:</strong> {{error.stack}}</p>\n                    <p><strong>Other:</strong> {{error.other}}</p>\n                    \n                </div>\n            </div>\n\n        </div>\n    </ion-content>\n</ion-view>\n');
$templateCache.put('manager/orderList/editOrderModal.html','<ion-modal-view class="large-modal" ng-controller="EditOrderCtrl as vm">\n    <ion-side-menus>\n\n        <ion-side-menu-content class="width-70">\n            <ion-header-bar class="bar-positive">\n                <button class="button button-icon ion-navicon" ng-click="vm.toggleLeft()" ng-hide="$exposeAside.active"></button>\n                <h1 class="title">Fuel Station Choices</h1>\n            </ion-header-bar>\n            <ion-content class="padding">\n                {{categories}}\n                <div ng-if="!vm.accountSvc.shouldHidePre" class="category-fade">\n                    <h4>Pre-Workout Options:</h4><hr />\n                    <p>\n                        <button class="button button-balanced" ng-repeat="c in vm.choiceSvc.pre" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\n                    </p>\n                </div>\n                <div ng-if="!vm.accountSvc.shouldHidePost" class="category-fade">\n                    <h4>Post-Workout Options:</h4><hr />\n                    <p>\n                        <button class="button button-royal" ng-repeat="c in vm.choiceSvc.post" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\n                    </p>\n                </div>\n                <div ng-if="!vm.accountSvc.shouldHideHydration" class="category-fade">\n                    <h4>Hydration Options:</h4><hr />\n                    <p>\n                        <button class="button button-energized" ng-repeat="c in vm.choiceSvc.hydration" ng-click="vm.orderItem(c)" ng-show="c.isActive">{{c.name}}</button>\n                    </p>\n                </div>\n                <div ng-if="!vm.accountSvc.shouldHideSnacks" class="category-fade">\n                    <h4>Snack Options:</h4><hr />\n                    <p>\n                        <button class="button button-calm" ng-repeat="c in vm.choiceSvc.snacks" ng-click="vm.orderItem(c, true)" ng-show="c.isActive">\n                            {{c.name}}\n                        </button>\n                        <button class="button button-balanced" ng-repeat="c in vm.choiceSvc.pre" ng-if="vm.accountSvc.shouldHidePre && c.isActive" ng-click="vm.orderItem(c, true)">\n                            {{c.name}}\n                        </button>\n                        <button class="button button-royal" ng-repeat="c in vm.choiceSvc.post" ng-if="vm.accountSvc.shouldHidePost && c.isActive" ng-click="vm.orderItem(c, true)">\n                            {{c.name}}\n                        </button>\n                        <button class="button button-energized" ng-repeat="c in vm.choiceSvc.hydration" ng-if="vm.accountSvc.shouldHideHydration && c.isActive" ng-click="vm.orderItem(c, true)">\n                            {{c.name}}\n                        </button>\n                    </p>\n                </div>\n                <div class="category-fade"\n                     ng-if="(vm.accountSvc.shouldHideSnacks &&\n                     vm.accountSvc.shouldHideHydration &&\n                     vm.accountSvc.shouldHidePre &&\n                     vm.accountSvc.shouldHidePost)">\n\n                    <div class="energized-bg padding">\n                        <h4 class="text-white">\n                            You have reached your limit. To change your selection, remove items from your order list.\n                        </h4>\n                    </div>\n                </div>\n            </ion-content>\n        </ion-side-menu-content>\n\n        <ion-side-menu expose-aside-when="large">\n            <ion-header-bar class="bar-positive">\n                <h1 class="title">Current Order:</h1>\n            </ion-header-bar>\n\n            <ion-content>\n                <ion-item class="bar-stable">\n                    <p class="text-center">\n                        Order for {{vm.accountSvc.athleteData[0].firstname}}<br />\n                    </p>\n                    <p>\n                        <strong>\n                            Monthly snacks remaining: {{vm.accountSvc.monthSnacksRemaining}}<br />\n                            Snacks remaining today: {{vm.accountSvc.daySnacksRemaining}}<br />\n                        </strong>\n                    </p>\n                </ion-item>\n                <ion-item>\n                    <button class="button button-stable stable-border" ng-click="vm.closeModal()">Cancel</button>\n\n                    <button class="button button-positive" ng-click="vm.onOrderClick()" ng-disabled="vm.orderSvc.orderItems.length === 0">Update</button>\n                </ion-item>\n                <ion-item class="item-button-right" ng-repeat="oi in vm.orderSvc.orderItems track by $index">\n                    {{oi.name}}<a class="button button-icon icon ion-close-circled assertive" ng-click="vm.removeItem($index)"></a>\n                </ion-item>\n\n            </ion-content>\n        </ion-side-menu>\n\n    </ion-side-menus>\n    \n</ion-modal-view>\n');
$templateCache.put('manager/orderList/orderList.html','<ion-view view-title="Today\'s Orders">\n    <ion-nav-buttons side="right">\n        <button class="button button-large ng-click-active ion-refresh" ng-click="vm.init()"> Refresh\n        </button>\n    </ion-nav-buttons>\n    <ion-content class="has-header">\n        <div class="container">\n            <ul class="list m-b-0">\n                <li class="item item-icon-right">\n                    <i ng-if="vm.name.value" ng-click="vm.clearFilter()" class="icon ion-close-circled assertive"></i>\n                    <input type="text" ng-model="vm.name.value" placeholder="Filter by name" class="col">\n                </li>\n            </ul>\n            <div class="row unlimited-items">\n                \n                <div class="col-33 animate-leave" ng-repeat="checkout in vm.todaysCheckouts | filter: vm.nameFilter track by $index">\n                    <div class="list card card-checkout">\n                        <div class="item item-card-divider positive-bg text-white p-r-120 p-l-50">\n                            <button class="button button-clear first-left-btn" ng-click="vm.setArchive(checkout, $index)"><i class="icon ion-checkmark-circled light"></i></button>\n                            <button class="button button-clear second-right-btn" ng-click="vm.openModal(checkout)"><i class="icon ion-edit light"></i></button>\n                            <button class="button button-clear first-right-btn" ng-click="vm.deleteCheckout(checkout)"><i class="icon ion-close-circled light"></i></button>\n                            <strong>{{checkout.Athlete.lastName + \', \' + checkout.Athlete.firstName}}</strong>\n                            <br>\n                            <small>{{checkout.CreateDate | date: \'shortTime\'}}</small>\n                            <!-- <small>{{vm.parseRelativeTime(checkout.createDate)}}</small>-->\n                        </div>\n                        <div class="card-order-body">\n                            <ion-scroll>\n                                <ion-list>\n                                    <ion-item class="padding" ng-repeat="choice in checkout.CheckoutChoices">\n                                        {{choice.Choice.name}}\n                                    </ion-item>\n                                    <ion-item></ion-item>\n                                </ion-list>\n                            </ion-scroll>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </ion-content>\n</ion-view>\n');
$templateCache.put('manager/snackChoices/choiceModal.html','<ion-modal-view>\n    <ion-header-bar class="bar-positive">\n        <h1 class="title">Add/Update Choice</h1>\n    </ion-header-bar>\n    <ion-content class="has-header">\n        <div class="padding energized-bg" ng-if="vm.formInvalid">\n            Please fill out all fields before saving.\n        </div>\n        <form name="vm.newChoiceForm" novalidate>\n            <div class="list">\n\n                <label for="name" class="item item-input">\n                    <span class="input-label">\n                                Name\n                            </span>\n                    <input type="text" name="name" ng-model="vm.selectedSnack.name" required/>\n                </label>\n\n                <label for="type" class="item item-input item-select">\n                    <span class="input-label">\n                                Type\n                            </span>\n                    <select name="type" ng-model="vm.selectedSnack.type" ng-options="type.value as type.label for type in vm.typeOptions" required>\n\n                    </select>\n                </label>\n                <label for="type" class="item item-input item-select">\n                    <span class="input-label">\n                                Available\n                            </span>\n                    <select name="type" ng-model="vm.selectedSnack.isActive" ng-options="type.value as type.label for type in vm.activeOptions" required>\n                    </select>\n                </label>\n                <div class="padding">\n                    <button ng-click="vm.closeModal()" class="button button-stable">Cancel</button>\n                    <button ng-click="vm.saveChoice()" class="button button-balanced">Save</button>\n                </div>\n\n\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n');
$templateCache.put('manager/snackChoices/updateChoices.html','<ion-view view-title="FuelStation Choices">\r\n    <div class="bar bar-subheader bar-stable text-center vcenter">\r\n        <button class="button button-icon icon ion-ios-plus force-balanced align-left" ng-click="vm.openModal()"></button>\r\n        <div class="title">\r\n            Sort by: <span ng-class="{bold: vm.predicate === \'name\'}" ng-click="vm.predicate = \'name\'">Name</span> | <span ng-class="{bold: vm.predicate === \'type\'}" ng-click="vm.predicate = \'type\'">Type</span>\r\n        </div>\r\n    </div>\r\n    <ion-content class="has-subheader">\r\n\r\n        <ion-list show-delete="vm.data.showDelete" can-swipe="true">\r\n            <ion-item ng-repeat="choice in vm.allChoices | orderBy:vm.predicate">\r\n                {{choice.name}} <span ng-show="!choice.isActive" class="text-gray"> &ndash; <em><i class="icon ion-close-circled"></i> Not Available</em></span>\r\n                <span class="align-right">{{vm.getType(choice.type)}}</span>\r\n                <ion-option-button class="button-energized"\r\n                                   ng-click="vm.editChoice(choice)">\r\n                    Edit\r\n                </ion-option-button>\r\n                <ion-option-button class="button-assertive"\r\n                                   ng-click="vm.deleteChoice(choice)">\r\n                    Delete\r\n                </ion-option-button>\r\n            </ion-item>\r\n        </ion-list>\r\n\r\n\r\n    </ion-content>\r\n</ion-view>\r\n');
$templateCache.put('manager/reports/monthlyCounts.html','<ion-view view-title="Monthly Counts">\n\n    <ion-content class="has-header">\n        <div class="container padding">\n            <div class="list">\n                <div class="row">\n                    <div class="col-25">\n                        <label class="item item-input item-select">\n                            <div class="input-label">\n                                Month\n                            </div>\n                            <select ng-model="vm.dateSelection.month" ng-init="vm.dateSelection.month = vm.currentMonth" \n                                    ng-options="num as month for (month, num) in vm.months"></select>\n                        </label>\n\n                    </div>\n                    <div class="col-25">\n                        <label class="item item-input item-select">\n                            <div class="input-label">\n                                Year\n                            </div>\n                            <select ng-model="vm.dateSelection.year" ng-init="vm.dateSelection.year = vm.currentYear" \n                                    ng-options="y for y in vm.years() track by y"></select>\n                        </label>\n                    </div>\n\n                    <div class="col-10 text-center">\n                        <button type="button" class="button button-positive" ng-click="vm.getMonthCounts()" style="min-height: 35px; line-height: 20px;">Go</button>\n\n                    </div>\n\n                    <div class="col-20">\n                        <button type="button" class="button button-balanced" ng-click="vm.download()" style="min-height: 35px; line-height: 20px;" ng-disabled="vm.counts.length === 0">Download CSV</button>\n                    </div>\n                </div>\n\n\n\n            </div>\n            <div ng-if="vm.counts.length > 0" class="category-fade">\n                <div class="row stable-bg m-b-10">\n                    <div class="col-25"><strong>Choice</strong></div>\n                    <div class="col-20"><strong>Count</strong></div>\n                </div>\n\n                <div class="row m-b-10" ng-repeat="item in vm.counts">\n                    <div class="col-25">{{item.choice}}</div>\n                    <div class="col-20">{{item.count}}</div>\n                </div>\n            </div>\n            <div ng-if="vm.counts.length === 0" class="padding">\n                <h4 ng-show="vm.noRecords">There are no records for the selected time period.</h4>\n                <h4>Please select a month and year, then press Go.</h4>\n            </div>\n        </div>\n        \n        \n    </ion-content>\n</ion-view>\n');
$templateCache.put('manager/reports/todaysCheckouts.html','<ion-view view-title="Today\'s Checkout Report">\n    <ion-nav-buttons side="right">\n        <button class="button button-large ng-click-active ion-refresh" ng-click="vm.refresh()"> Refresh\n        </button>\n    </ion-nav-buttons>\n    <ion-content class="has-header">\n        <div class="container padding">\n            <button type="button" class="button button-balanced" ng-click="vm.download()" style="min-height: 35px; line-height: 20px;">Download CSV</button>\n            <div class="row stable-bg m-t-10">\n                <div class="col"><strong>First Name</strong></div>\n                <div class="col"><strong>Last Name</strong></div>\n                <div class="col"><strong>Choice</strong></div>\n                <div class="col"><strong>Time Order Created</strong></div>\n                <div class="col"><strong>Time Order Archived</strong></div>\n            </div>\n\n            <div class="row" ng-repeat="checkout in vm.checkouts">\n                <div class="col">{{checkout.firstname}}</div>\n                <div class="col">{{checkout.lastname}}</div>\n                <div class="col">{{checkout.choiceName}}</div>\n                <div class="col">{{checkout.createDate | date: \'shortTime\'}}</div>\n                <div class="col">{{checkout.archiveDate | date: \'shortTime\'}}</div>\n            </div>\n\n        </div>\n    </ion-content>\n</ion-view>\n');
$templateCache.put('manager/snackLimits/snackLimits.html','<ion-view view-title="Snack Limits">\r\n    <ion-content class="">\r\n\r\n        <div class="two-columns padding">\r\n            <form name="vm.limitForm{{$index}}" ng-submit="vm.onSubmitSnackLimits(sport)" ng-repeat="sport in vm.sportsLimits" class="m-b-10">\r\n                <div class="list">\r\n\r\n                    <div>\r\n\r\n                        <label class="item item-input item-stacked-label">\r\n                            <span class="input-label bold">{{sport.sport.sportDescription}}</span>\r\n                        </label>\r\n\r\n                        <label class="item item-input item-stacked-label energized-bg" ng-show="!vm.limitForm{{$index}}.$valid">\r\n                            Please enter a whole number greater than 0.\r\n                        </label>\r\n\r\n                        <label for="daySnackLimit" class="item item-input">\r\n                            <span class="input-label">\r\n                                Daily Snack Limit\r\n                            </span>\r\n                            <input ng-model="sport.daySnackLimit" name="daySnackLimit"\r\n                                   type="number" min="1" inputmode="tel" pattern="[0-9]*" required />\r\n                        </label>\r\n\r\n                        <label for="monthSnackLimit" class="item item-input">\r\n                            <span class="input-label">\r\n                                Monthly Snack Limit\r\n                            </span>\r\n                            <input ng-model="sport.monthSnackLimit" name="monthSnackLimit"\r\n                                   type="number" min="1" inputmode="tel" pattern="[0-9]*" required />\r\n                        </label>\r\n\r\n                        <span class="item item-input item-stacked-label">\r\n                            <button type="submit" class="button button-balanced unset-position"\r\n                                    style="position:unset; float: right; margin-right: 10px !important" ng-disabled="!vm.limitForm{{$index}}.$valid">Save</button>\r\n                        </span>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n\r\n            </form>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>\r\n');
$templateCache.put('templates/app.html','<ion-side-menus>\n\n    <ion-side-menu-content>\n        <ion-nav-bar class="bar-positive">\n            <ion-nav-buttons side="left">\n                <button menu-toggle="left" class="button button-icon icon ion-navicon"></button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n\n        <ion-nav-view name="appContent" animation="slide-left-right"></ion-nav-view>\n\n    </ion-side-menu-content>\n\n    <ion-side-menu side="left">\n\n        <ion-nav-view name="sideMenu"></ion-nav-view>\n\n    </ion-side-menu>\n\n</ion-side-menus>\n');}]);
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',

    'googlechart',
    'app.core',

    'app.archiveListCtrl',
    'app.editOrderCtrl',
    'app.errors',
    'app.managerCtrl',
    'app.loginMenuCtrl',
    'app.monthlyCounts',
    'app.orderListCtrl',
    'app.snackChoicesCtrl',
    'app.snackLimitCtrl',
    'app.studentChoices',
    'app.studentLogin',
    'app.todaysCheckouts',

    'blocks.exception',
    'blocks.errorlog',

    'templates', 
    'ionic.utils'
    ])

.run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider'
         , function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
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
                    templateUrl: 'athleteLogin/menu.html',
                    controller: 'LoginMenuCtrl as vm'
                }
            }
        })
        .state('tab.updateChoices', {
            url: '/updateChoices',
            views: {
                'appContent': {
                    templateUrl: 'manager/snackChoices/updateChoices.html',
                    controller: 'SnackChoicesCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }

        })
        .state('tab.snackLimits', {
            url: '/snackLimits',
            views: {
                'appContent': {
                    templateUrl: 'manager/snackLimits/snackLimits.html',
                    controller: 'SnackLimitCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }
        })
        .state('tab.orderList', {
            cache: false,
            url: '/orderList',
            views: {
                'appContent': {
                    templateUrl: 'manager/orderList/orderList.html',
                    controller: 'OrderListCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }

        })
        .state('tab.archiveList', {
            cache: false,
            url: '/archiveList',
            views: {
                'appContent': {
                    templateUrl: 'manager/archiveList/archiveList.html',
                    controller: 'ArchiveListCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }
        })
        .state('tab.dailyReport', {
            cache: false,
            url: '/dailyReport',
            views: {
                'appContent': {
                    templateUrl: 'manager/reports/todaysCheckouts.html',
                    controller: 'TodaysCheckoutsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }

        })
        .state('tab.monthlyCounts', {
            url: '/monthlyCounts',
            views: {
                'appContent': {
                    templateUrl: 'manager/reports/monthlyCounts.html',
                    controller: 'MonthlyCountsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }

        })
        .state('tab.errorReport', {
            url: '/errorReport',
            views: {
                'appContent': {
                    templateUrl: 'manager/errorReport/errors.html',
                    controller: 'ErrorsCtrl as vm'
                },
                'sideMenu': {
                    templateUrl: 'manager/menu.html'
                }
            }

        })
        .state('cart', {
            url: '/cart',
            templateUrl: 'cart/choices.html',
            controller: 'StudentChoicesCtrl as vm'

        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/studentID');

}]);

(function(){
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', ['AuthSvc', function (AuthSvc) {
        return {
            request: function(config) {
                return AuthSvc.getToken().then(function(token) {
                    config.headers['Authorization'] = AuthSvc.token;
                    return config;                    
                });
            }
        }
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

})();
(function () {
    'use strict';

    angular
        .module('blocks.exception', [])
        .config(exceptionConfig);

    exceptionConfig.$inject = ['$provide'];

    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', '$localstorage', 'ErrorLogSvc'];

    // Borrowed from John Papa. This code adds to Angular's exception handler
    function extendExceptionHandler($delegate, $localstorage, ErrorLogSvc) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            
            ErrorLogSvc.log(errorData);
            
            console.error(exception.msg || exception.message, errorData);   
        };
    }
})();

(function () {
    'use strict';

    angular.module('ionic.utils', [])

    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('blocks.errorlog', [])

    .service('ErrorLogSvc', ['$localstorage', function ($localstorage) {
        var service = {
            clear: _clear,
            log: _log
        };

        return service;

        function _clear(){
            var errorWrapper = {
                data: []
            };
            
            $localstorage.setObject('fsErrors', errorWrapper);
        }
        
        function _log(errorData) {
            var errorWrapper = {
                data: []
            };

            var errorLog = {
                date: Date(),
                cause: errorData.cause || errorData.exception.cause,
                stack: errorData.exception.stack || new Error(),
                other: errorData.exception
            };

            var fsErrors = $localstorage.getObject('fsErrors') || {
                data: []
            };
            if (fsErrors.data && fsErrors.data.length > 0) {
                fsErrors.data.unshift(errorLog);
                 errorWrapper.data = fsErrors.data;
            }
            else {
                errorWrapper.data = [errorLog];
            }
            
            $localstorage.setObject('fsErrors', errorWrapper);
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.studentChoices', [])

    .controller('StudentChoicesCtrl', ['ChoiceSvc', 'AccountSvc', 'OrderSvc', '$state', 'CheckoutSvc', '$ionicSideMenuDelegate', '$ionicPopup', 'IonicAlertSvc', '$interval', '$scope', function (ChoiceSvc, AccountSvc, OrderSvc, $state, CheckoutSvc, $ionicSideMenuDelegate, $ionicPopup, IonicAlertSvc, $interval, $scope) {
        var vm = this;

        var timer;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderItems = OrderSvc.orderItems;
        vm.timeRemaining = 120;

        vm.cancel = _cancel;
        vm.onOrderClick = _onOrderClick;
        vm.orderItem = _orderItem;
        vm.removeItem = _removeItem;
        vm.toggleLeft = _toggleLeft;

        init();

        function init() {
            // Start counting down timer, which was initialized to 120 above
            timer = $interval(function () {
                vm.timeRemaining--;
                vm.seconds = vm.timeRemaining < 10 ? "0" + vm.timeRemaining : vm.timeRemaining;

                if (vm.timeRemaining === 0) {
                    $interval.cancel(timer);

                    var opts = {};
                    opts.title = "You have been logged out due to inactivity.";
                    opts.shouldClearID = true;
                    opts.redirect = 'tab.studentID';

                    IonicAlertSvc.alert(opts);
                }
            }, 1000);
        }

        // Cancel timer when controller is destroyed (i.e. when route changes), otherwise timer continues even if user has already been logged out
        $scope.$on('$destroy', function () {
            $interval.cancel(timer);
        });


        function _cancel() {
            var msg = {
                template: "Are you sure you want to cancel this order?"
            };

            var onConfirmFn = function () {
                $state.go('tab.studentID', null, {
                    reload: true
                });
            }

            IonicAlertSvc.confirm(msg, onConfirmFn);
        }

        function _onOrderClick() {
            resetTimer();

            if (!AccountSvc.athleteData || !AccountSvc.athleteData[0]) {
                var opts = {};
                opts.title = "Athlete data error.";
                opts.AcctSvc_athleteData = AccountSvc.athleteData;
                opts.OrderItems = OrderSvc.orderItems;

                IonicAlertSvc.alert(opts);
            }

            if (OrderSvc.orderItems.length >= 1) {
                try {
                    CheckoutSvc.processCheckout(OrderSvc.orderItems, AccountSvc.athleteData[0].AthleteID);
                } catch (err) {
                    IonicAlertSvc.alert(err);
                }
            }
        }

        function _orderItem(item, isSnack) {
            resetTimer();

            // Clone the item that was added to cart to keep track of whether it is a snack or not. If choice is not cloned first, the snack attribute will remain even if the athlete selects it as pre/post
            var itemClone = _.clone(item);

            if (isSnack) {
                AccountSvc.monthSnacksRemaining--;
                AccountSvc.daySnacksRemaining--;
                itemClone.isSnack = true;
            }

            OrderSvc.addItem(itemClone);
            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function _removeItem(index) {
            resetTimer();

            if (OrderSvc.orderItems[index].isSnack) {
                if (AccountSvc.monthSnacksRemaining < AccountSvc.monthSnacksLimit) {
                    AccountSvc.monthSnacksRemaining++;
                }
                if (AccountSvc.daySnacksRemaining < AccountSvc.daySnacksLimit) {
                    AccountSvc.daySnacksRemaining++;
                }
            }
            OrderSvc.removeItem(index);

            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function resetTimer() {
            vm.timeRemaining = 120;
        }

        function _toggleLeft() {
            $ionicSideMenuDelegate.toggleLeft();
        }
    }]);
})();

(function () {
    'use strict';

    angular
        .module('app.studentLogin', [])

    .controller('StudentLoginCtrl', ['AccountSvc', 'OrderSvc', 'AthleteSvc', 'IonicAlertSvc', 'CheckoutSvc', 'ChoiceSvc', '$state', 'LoadingSpinner', '$ionicModal', '$scope', '$timeout', '$localstorage', function (AccountSvc, OrderSvc, AthleteSvc, IonicAlertSvc, CheckoutSvc, ChoiceSvc, $state, LoadingSpinner, $ionicModal, $scope, $timeout, $localstorage) {
        var vm = this;

        vm.accountSvc = AccountSvc;
        vm.password = {};

        vm.deleteButton = _deleteButton;
        vm.numButton = _numButton;

        init();

        function init() {
            // On page load, remove all previous athlete and order data
            AccountSvc.clear();
            OrderSvc.clear();

            var post = $localstorage.getObject('fsErrors');
            //console.log("LOCAL STORAGE ERRORS", post);
            
           // throw new Error("TESTERROR");
        }

        function _deleteButton() {
            AccountSvc.studentId = AccountSvc.studentId.slice(0, AccountSvc.studentId.length - 1)
        }

        function _numButton(num) {
            console.log('yo! a number was pressed...');
            // Student ID must be 9 characters long. 
            if (AccountSvc.studentId.length < 9) {
                AccountSvc.studentId = AccountSvc.studentId + num;
                checkStudentId();
            }
        }

        function checkStudentId() {
            if (AccountSvc.studentId.length === 9) {
                LoadingSpinner.show();
                getAthleteData();
            }
        }

        /**
         * Gets athlete data, saves data in AccountSvc, gets athlete checkout history, computes logic to hide choice categories, and redirects to cart page
         */
        function getAthleteData() {
            //
            AthleteSvc.getAthlete(AccountSvc.studentId)
                .then(AccountSvc.saveAthleteData)
                .then(AccountSvc.getSnackLimits)
                .then(getCheckoutHistory)
                .then(AccountSvc.initializeHiddenCategories)
                .then(getAllChoices)
                .then(redirectToCart)
                .catch(IonicAlertSvc.error);
        }

        /**
         * Get all snack choices, then initialize hidden categories
         */
        function getAllChoices(success) {
            if (success) {
                ChoiceSvc.getAllChoices()
                    .then(ChoiceSvc.initializeChoiceCategories)
                    .catch(IonicAlertSvc.error);
            }
        }

        /** 
         * Gets athlete checkout history
         * @returns {object} Counts of: Today's snack checkouts, current month snack checkouts, and whether athlete has checked out pre, post, or hydration today
         */
        function getCheckoutHistory(id) {
            return CheckoutSvc.getCheckoutHistory(id)
                .then(function (response) {
                    return response;
                }, IonicAlertSvc.error);
        }

        function redirectToCart() {
            LoadingSpinner.hide();
            $state.go('cart', null, {
                reload: true
            });
        }
    }]);
})();

(function () {
    'use strict';

    angular
        .module('app.loginMenuCtrl', [])

    .controller('LoginMenuCtrl', ['IonicAlertSvc', '$state', 'LoadingSpinner', '$scope', '$timeout', '$ionicModal', 'AuthSvc', function (IonicAlertSvc, $state, LoadingSpinner, $scope, $timeout, $ionicModal, AuthSvc) {
        var vm = this;

        vm.password = { value:"fu3lst4tion!" };
  		vm.loginData = { username:"fsdemo-manager", password:"FuelStation17!" };
        vm.authSvc = AuthSvc;

        vm.closeModal = _closeModal;
        vm.closeFSModal = _closeFSModal;
        vm.onSubmitPassword = _onSubmitPassword;
        vm.onSubmitFS = _onSubmitFS;
        vm.openModal = _openModal;
		vm.openFSLogin = _openFSLogin;
		vm.changePassword = _changePassword;

        vm.newUser = { username:'fsdemo-student', password:'TempPass17!' };
        vm.authNewUser = function(loginData) {
            return AuthSvc.authNewUser(loginData);
        };

        loadModal();
		loadFSModal();

		function _changePassword() {
            alert('testing new js');
//			AuthSvc.changePassword('GoBruins2017', 'FuelStation17!')
//				.then(function(result) {
//				console.log(result);
//			});;
		}
		
        function _closeModal() {
            $scope.modal.hide();
        }

        function _closeFSModal() {
            $scope.fsModal.hide();
        }

        // Manager login
        function _onSubmitPassword() {
            var err = {
                title: "The password you entered was not correct. Please try again.",
                stack: (new Error()).stack,
                cause: "Wrong manager login password"
            };

            if (vm.password.value === "fu3lst4tion!") {
                $state.go('tab.orderList', null, {
                    reload: true
                });
            } else {
                IonicAlertSvc.error(err);
            }
        }
        // FS login
        function _onSubmitFS() {
            var err = {
                title: "The password you entered was not correct. Please try again.",
                stack: (new Error()).stack,
                cause: "Wrong manager login password"
            };

			AuthSvc.login(vm.loginData).then(function(token) {
				console.info("idToken", token);
                $state.go('tab.orderList', null, {
                    reload: true
                });
			}).catch(function(err) {
				IonicAlertSvc.error(err);
			});
        }

        function _openModal() {
            $scope.modal.show();
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('manager/manager-login.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
        }
		
		function _openFSLogin() {
            if (AuthSvc.isAuthenticated()) {
                AuthSvc.logout();
            } else {
                $scope.fsModal.show();
            }
		};

        function loadFSModal() {
            $ionicModal.fromTemplateUrl('fsLogin/fs-login.modal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                $scope.fsModal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.fsModal.remove();
            });
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.managerCtrl', [])

    .controller('ManagerCtrl', ['ChoiceSvc', 'IonicAlertSvc', function (ChoiceSvc, IonicAlertSvc) {
        var vm = this;

        window.setInterval(function () {
            ChoiceSvc.choice().get({id:1});
        }, 30000);
    }]);
})();

(function () {
    'use strict';

    angular.module('app.orderListCtrl', [])

    .controller('OrderListCtrl', ['AccountSvc', 'CheckoutSvc', 'IonicAlertSvc', 'OrderSvc', '$ionicModal', '$scope', 'LoadingSpinner', '$timeout', '$interval', function (AccountSvc, CheckoutSvc, IonicAlertSvc, OrderSvc, $ionicModal, $scope, LoadingSpinner, $timeout, $interval) {
        var vm = this;
        var polling;

        vm.name = {};
        vm.todaysCheckouts = [];

        vm.init = init;
        vm.clearFilter = _clearFilter;
        vm.deleteCheckout = _deleteCheckout;
        vm.nameFilter = _nameFilter;
        vm.openModal = _openModal;
        vm.setArchive = _setArchive;

        init();

        function init() {
            LoadingSpinner.show();

            CheckoutSvc.unarchived().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            // Fix bug where header is hidden on route change, with delay to make sure this function gets called after the view is finished rendering
            $timeout(function () {
                showHeader();
            }, 800);

            polling = $interval(function () {
                CheckoutSvc.unarchived().query().then(onGetTodaysCheckouts);
            }, 20000);

            loadModal();
        }

        // Cancel polling when controller is destroyed (i.e. when route changes)
        $scope.$on('$destroy', function () {
            $interval.cancel(polling);
        });

        function _clearFilter() {
            vm.name = {};
        }

        function _deleteCheckout(checkout) {
            var msg = {
                template: "Are you sure you want to cancel and delete this order?"
            };

            var onConfirmFn = function () {
                CheckoutSvc.checkout().delete({ checkoutID: checkout.checkoutID }).$promise
                    .then(init)
                    .catch(IonicAlertSvc.error);
            };

            IonicAlertSvc.confirm(msg, onConfirmFn);
        }

        function _nameFilter(item) {
            if (!item.isArchived) {
                // Return orders that are not archived and that contain name in filter
                if (vm.name.value && vm.name.value.length > 0) {
                    return !item.isArchived && (item.studentSport.fullName.toLowerCase().indexOf(vm.name.value.toLowerCase()) > -1);
                }
                // Return all orders that have not been archived
                return !item.isArchived;
            }
        }

        function onGetTodaysCheckouts(response) {
            LoadingSpinner.hide();
            vm.todaysCheckouts = response.data.checkouts;
        }


        function _openModal(checkout) {
            AccountSvc.clear();
            CheckoutSvc.currentCheckout = checkout;
            OrderSvc.orderItems = OrderSvc.parseChoices(checkout.CheckoutChoices);
            AccountSvc.studentId = checkout.Athlete.schoolid;
            //loadModal();
            $scope.$broadcast("openModal");
            $scope.modal.show();
        }

        function _setArchive(checkout, index) {
            var currentCheckout = CheckoutSvc.setArchiveProperties(checkout);

            CheckoutSvc.checkout().update(currentCheckout)
                .then(removeCheckoutFromList)
                .then(init)
                .catch(IonicAlertSvc.error);

            function removeCheckoutFromList() {
                vm.todaysCheckouts.splice(index, 1);
            }
        }

        function showHeader() {
            angular.element(document.querySelector("ion-nav-bar")).removeClass("hide");
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('manager/orderList/editOrderModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                //$scope.modal.show();
            });

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            $scope.$on('modal.hidden', function () {
                //init();
                CheckoutSvc.checkout().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            });
            $scope.$on('modal.removed', function () {
                console.log("modal removed");
            });
        }
    }]);
})();

(function () {
    'use strict';

    angular
        .module('app.editOrderCtrl', [])

    .controller('EditOrderCtrl', ['AccountSvc', 'OrderSvc', 'AthleteSvc', 'IonicAlertSvc', 'CheckoutSvc', 'ChoiceSvc', 'LoadingSpinner', '$scope', function (AccountSvc, OrderSvc, AthleteSvc, IonicAlertSvc, CheckoutSvc, ChoiceSvc, LoadingSpinner, $scope) {
        var vm = this;

        vm.accountSvc = AccountSvc;
        vm.choiceSvc = ChoiceSvc;
        vm.orderSvc = OrderSvc;
        vm.orderItems = OrderSvc.orderItems;

        vm.closeModal = _closeModal;
        vm.onOrderClick = _onOrderClick;
        vm.orderItem = _orderItem;
        vm.removeItem = _removeItem;

        init();

        $scope.$on("openModal", init);
        function init() {
			ChoiceSvc.ini
            if (AccountSvc.studentId) {
                AthleteSvc.getAthlete(AccountSvc.studentId)
                    .then(AccountSvc.saveAthleteData)
                    .then(AccountSvc.getSnackLimits)
                    .then(getCheckoutHistory)
                    .then(initializeHiddenCategories)
                    .then(getAllChoices)
                    .catch(alertAndCloseModal);
            }
        }

        // If there is an error getting the order information, close the modal and alert the error
        function alertAndCloseModal(msg) {
            IonicAlertSvc.error(msg);
            vm.closeModal();
        }

        function _closeModal() {
            //OrderSvc.clear();
            $scope.modal.hide();
        }

        function getAllChoices() {
            return ChoiceSvc.getAllChoices()
                .then(ChoiceSvc.initializeChoiceCategories)
                .catch(IonicAlertSvc.error);
        }

        function getCheckoutHistory(id) {
            return CheckoutSvc.getCheckoutHistory(id)
                .then(function (response) {
                    return response;
                }, IonicAlertSvc.error);
        }

        function initializeHiddenCategories(result) {
            // Pass true as second parameter so function knows that this is an update of an order, not a new order
            return AccountSvc.initializeHiddenCategories(result, true);
        }

        // Deletes the checkout then posts a new one
        function _onOrderClick() {
            if (OrderSvc.orderItems.length >= 1) {
                LoadingSpinner.show();

                CheckoutSvc.checkout().delete(CheckoutSvc.currentCheckout.CheckoutID)
                    .then(processCheckout)
                    .catch(IonicAlertSvc.error);
            }


            function processCheckout() {
                var checkout = CheckoutSvc.fillCheckoutObject(OrderSvc.orderItems, AccountSvc.athleteData[0].AthleteID);

                CheckoutSvc.checkout().save(checkout)
                    .then(onOrderSuccess)
                    .then(vm.closeModal)
                    .catch(IonicAlertSvc.error);
            }

            function onOrderSuccess() {
                LoadingSpinner.hide();
                var msg = {
                    title: "This order has been updated."
                };
                IonicAlertSvc.alert(msg);
            }

        }

        function _orderItem(item, isSnack) {
            var itemClone = _.clone(item);

            if (isSnack) {
                AccountSvc.monthSnacksRemaining--;
                AccountSvc.daySnacksRemaining--;
                itemClone.isSnack = true;
            }

            OrderSvc.addItem(itemClone);
            AccountSvc.updateHiddenCategories(OrderSvc.orderItems);
        }

        function _removeItem(index) {
            if (OrderSvc.orderItems[index].isSnack) {
                if (AccountSvc.monthSnacksRemaining < AccountSvc.monthSnacksLimit) {
                    AccountSvc.monthSnacksRemaining++;
                }
                if (AccountSvc.daySnacksRemaining < AccountSvc.daySnacksLimit) {
                    AccountSvc.daySnacksRemaining++;
                }
            }

            AccountSvc.updateHiddenCategories(OrderSvc.orderItems, OrderSvc.orderItems[index]);
            OrderSvc.removeItem(index);
        }

    }]);
})();

(function () {
    'use strict';

    angular.module('app.archiveListCtrl', [])

    .controller('ArchiveListCtrl', ['CheckoutSvc', 'AuthSvc', 'IonicAlertSvc', function (CheckoutSvc, AuthSvc, IonicAlertSvc) {
        var vm = this;

        vm.name = {};
        vm.todaysCheckouts = [];

        vm.init = init;
        vm.clearFilter = _clearFilter;
        vm.nameFilter = _nameFilter;
        vm.setUnarchive = _setUnarchive;

        init();

        function init() {
			AuthSvc.refreshTokens();
            CheckoutSvc.archived().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);

            function onGetTodaysCheckouts(response) {
				console.log('ARCHIVED: (' + response.data.count + ') checkouts found.');
                vm.todaysCheckouts = response.data.checkouts;
            }
        }

        function _clearFilter() {
            vm.name = {};
        }

        function _nameFilter(item) {
            if (item.isArchived) {
                // Return archived items that contain the name typed in the filter
                if (vm.name.value && vm.name.value.length > 0) {
                    return item.isArchived && (item.studentSport.fullName.toLowerCase().indexOf(vm.name.value.toLowerCase()) > -1);
                }
                // Return all archived items
                return item.isArchived;
            }
        }

        function _setUnarchive(checkout, index) {
            var currentCheckout = CheckoutSvc.setUnarchiveProperties(checkout);

            CheckoutSvc.checkout()
				.update(currentCheckout)
                .then(removeCheckoutFromList, IonicAlertSvc.error);

            function removeCheckoutFromList() {
                vm.todaysCheckouts.splice(index, 1);
            }
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.snackChoicesCtrl', [])

    .controller('SnackChoicesCtrl', ['$ionicSideMenuDelegate', '$ionicPopup', '$ionicModal', '$scope', 'ChoiceSvc', 'IonicAlertSvc', 'LoadingSpinner', function ($ionicSideMenuDelegate, $ionicPopup, $ionicModal, $scope, ChoiceSvc, IonicAlertSvc, LoadingSpinner) {
        var vm = this;

        vm.getType = ChoiceSvc.getType;
        vm.predicate = 'name';
        vm.selectedSnack = {};
        vm.typeOptions = ChoiceSvc.typeOptions();
        vm.activeOptions = [
            { label: "Yes", value: true },
            { label: "No", value: false }
        ];

        vm.closeModal = _closeModal;
        vm.deleteChoice = _deleteChoice;
        vm.editChoice = _editChoice;
        vm.openModal = _openModal;
        vm.saveChoice = _saveChoice;

        init();

        function init() {
            ChoiceSvc.getAllChoices().then(onGetAllChoicesSuccess, IonicAlertSvc.error);

            function onGetAllChoicesSuccess(data) {
                vm.allChoices = data;
            }

            loadModal();
        }

        function _closeModal() {
            vm.modal.hide();
        }

        function _deleteChoice(choice) {
            var msg = {
                template: "Are you sure you want to delete " + choice.name + " from the list of choices?"
            };

            var currentChoiceIndex = vm.allChoices.indexOf(choice);

            IonicAlertSvc.confirm(msg, onConfirmDelete);

            function onConfirmDelete() {
                LoadingSpinner.show();

                ChoiceSvc.choice().delete({
                    id: choice.choiceID
                }, onDeleteSuccess, IonicAlertSvc.error);

                function onDeleteSuccess() {
                    LoadingSpinner.hide();
                    vm.allChoices.splice(currentChoiceIndex, 1);
                }
            }
        }

        function _editChoice(choice) {
            vm.selectedSnack = _.clone(choice);
            vm.openModal();
        }

        function _openModal() {
            vm.modal.show();
            vm.formInvalid = false;
        }

        function _saveChoice() {
            if (!vm.newChoiceForm.$valid) {
                // Display error message if form fields not completed
                vm.formInvalid = true;
            } else {
                LoadingSpinner.show();

                // If there is a choiceID, it is an update. Otherwise, save a new choice.
                if (vm.selectedSnack.ChoiceID) {
                    ChoiceSvc.updateChoice(vm.selectedSnack)
                        .then(onSuccess, IonicAlertSvc.error);
                } else {
                    vm.selectedSnack.categoryID = 6; // Set to 'Misc' category. Api currently requires a category
                    ChoiceSvc.saveChoice(vm.selectedSnack)
                        .then(onSuccess, IonicAlertSvc.error);
                }
            }

            function onSuccess() {
                LoadingSpinner.hide();
                init();
                vm.closeModal();
                vm.selectedSnack = {};
                vm.formInvalid = false;
            }
        }

        function loadModal() {
            $ionicModal.fromTemplateUrl('manager/snackChoices/choiceModal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function (modal) {
                vm.modal = modal;
            });

            $scope.$on('$destroy', function () {
                vm.modal.remove();
            });
            $scope.$on('modal.hidden', function () {
                vm.selectedSnack = {};
            });
            $scope.$on('modal.removed', function () {
                console.log("modal removed");
            });
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.snackLimitCtrl', [])

    .controller('SnackLimitCtrl', ['SnackLimits', '$ionicPopup', 'IonicAlertSvc', 'LoadingSpinner', function (SnackLimits, $ionicPopup, IonicAlertSvc, LoadingSpinner) {
        var vm = this;
        var sport;

        vm.onSubmitSnackLimits = _onSubmitSnackLimits;
        vm.sportsLimits;

        init();

        function init() {
            SnackLimits.snackLimits().query()
                .then(onGetSnackLimitsSuccess, IonicAlertSvc.error);
        }

        function onGetSnackLimitsSuccess(data) {
            vm.sportsLimits = data;
        }

        function _onSubmitSnackLimits(sportLimit) {
            LoadingSpinner.show();

            sport = sportLimit.sport.sportDescription;

            SnackLimits.snackLimits().update(sportLimit).$promise
                        .then(onUpdateSnackLimitSuccess, IonicAlertSvc.error);
        }

        function onUpdateSnackLimitSuccess() {
            LoadingSpinner.hide();

            var msg = {
                title: "Snack limits for " + sport + " have been saved."
            };
            IonicAlertSvc.alert(msg);
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.todaysCheckouts', [])

    .controller('TodaysCheckoutsCtrl', ['CheckoutSvc', 'IonicAlertSvc', 'CsvSvc', function (CheckoutSvc, IonicAlertSvc, CsvSvc) {
        var vm = this;

        vm.checkouts = [];
        
        vm.download = _download;
        vm.refresh = init;

        init();

        function init() {
            CheckoutSvc.getDailyCheckouts().query().then(onGetTodaysCheckouts, IonicAlertSvc.error);
        }

        function onGetTodaysCheckouts(response) {
            vm.checkouts = response.data;
        }

        function _download() {
            CsvSvc.download(vm.checkouts, "daily_report_");
        }

    }]);
})();

(function () {
    'use strict';

    angular.module('app.errors', [])

    .controller('ErrorsCtrl', ['$localstorage', 'ErrorLogSvc', 'AuthSvc', function ($localstorage, ErrorLogSvc, AuthSvc) {
        var vm = this;

        vm.errors = {};
        
        vm.deleteLog = _deleteLog;
        vm.parseDate = _parseDate;
        vm.refresh = init;
        
        init();

        function init() {
            var errors = $localstorage.getObject('fsErrors');
            vm.errors = errors.data;
        }
        
        function _deleteLog(){
            ErrorLogSvc.clear();
            init();
        }
		
        function _parseDate(dateStr){
            return moment(dateStr).format('MM-DD-YY, h:mm a');
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.monthlyCounts', [])

    .controller('MonthlyCountsCtrl', ['CheckoutSvc', 'IonicAlertSvc', 'CsvSvc', '$timeout', function (CheckoutSvc, IonicAlertSvc, CsvSvc, $timeout) {
        var vm = this;

        vm.counts = [];
        vm.dateSelection = {};
        vm.currentYear = new Date().getFullYear();
        vm.currentMonth = new Date().getMonth() + 1;

        vm.download = _download;
        vm.getMonthCounts = _getMonthCounts;
        vm.years = _years;

        function _download() {
            vm.getMonthCounts();

            // Allow downloads only if there is data to download, with timeout to ensure data downloads first
            $timeout(function () {
                if (vm.counts.length > 0) {
                    CsvSvc.download(vm.counts, vm.dateSelection.month + "-" + vm.dateSelection.year + "_counts_");
                }
            }, 1200);
        }

        function _getMonthCounts() {
            CheckoutSvc.getMonthCounts(vm.dateSelection).query().then(onGetMonthCounts, IonicAlertSvc.error);
        }

        // Hidden logic for message that says "No records found for this time period"
        function onGetMonthCounts(response) {
            if (response.length > 0) {
                vm.noRecords = false;
                vm.counts = response;
            } else {
                vm.noRecords = true;
                vm.counts = [];
            }
        }

        // Set up options for Select - builds array of last three years
        function _years() {
            var currentYear = new Date().getFullYear();
            var years = [];
            for (var i = 0; i < 3; i++) {
                years.unshift(currentYear - i);
            }
            return years;
        }

        vm.months = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };

    }]);
})();

(function() {
    'use strict';

    angular.module('app.core', ['ngResource']);
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant("ApiEndpoint", {
    "url": "http://fuelstationmock.athletics.ucla.edu/api/"
    //    "url": "http://localhost:56623/api/"
});
})();
(function () {
    'use strict';

    angular.module('app.core')

    .factory('SnackLimits', ['$resource', '$http', 'ApiEndpoint', function ($resource, $http, ApiEndpoint) {
        var service = {
            athleteSnackLimits: _athleteSnackLimits,
            snackLimits: _snackLimits
        };

        var url = 'https://bwtchslm53.execute-api.us-west-2.amazonaws.com/dev/snacklimits/';

        return service;
        
        
        function _athleteSnackLimits() {
            return {
                get: function(schoolSidNumber){
                    return $http.get(url + schoolSidNumber)
                        .then(function(result){
                            return result.data;
                        });
                }
            };
            // return $resource(ApiEndpoint.url + 'SnackLimits/:schoolsidnumber', {
            //     schoolsidnumber: "@id"
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
        }

        function _snackLimits() {
            return {
                query: function(){
                    return $http.get(url)
                        .then(function(result){
                            return result.data;
                        });
                }
            };

            // return $resource(ApiEndpoint.url + 'SnackLimits/:id', {
            //     id: "@id"
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.core')

    .service('ChoiceSvc', ['$http', '$resource', 'ApiEndpoint', function ($http, $resource, ApiEndpoint) {
        var self = this;
        var apiUrl = 'https://mna6x5va5e.execute-api.us-west-2.amazonaws.com/dev/choices';

        self.alphabetize = _alphabetize;
        self.choice = _choice;
        self.getAllChoices = _getAllChoices;
        self.getType = _getType;
        self.hydrationFilter = _hydrationFilter;
        self.initializeChoiceCategories = _initializeChoiceCategories;
        self.postWorkout = _postWorkout;
        self.preWorkout = _preWorkout;
        self.saveChoice = _saveChoice;
        self.snackOnly = _snackOnly;
        self.typeOptions = _typeOptions;
        self.updateChoice = _updateChoice;

        function _alphabetize(a, b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        }

         function _choice() {
            return {
                get: function(args) {
                    return $http.get(apiUrl + '/' + args.id)
                    .then(function(result){
                        return result.data.choices;
                    });
                },
                delete: function(args) {
                    return $http.delete(apiUrl + '/' + args.id);
                }
            };
         }

        function _getAllChoices() {
            //return $resource(ApiEndpoint.url + 'Choices', {});
            return $http.get(apiUrl)
                .then(function(result){
                    return result.data.choices;
                });
        }

        function _getType(type) {
            if (type === 0) {
                return "Snack only";
            } else if (type === 1) {
                return "Pre";
            } else if (type === 2) {
                return "Post";
            } else if (type === 3) {
                return "Hydration";
            }
        }

        function _hydrationFilter(data) {
            var hydrations = _.where(data, {
                type: 3
            });
            return hydrations;
        }

        function _initializeChoiceCategories(choices) {
            var allChoices = choices.sort(self.alphabetize);
            self.snacks = self.snackOnly(allChoices);
            self.pre = self.preWorkout(allChoices);
            self.post = self.postWorkout(allChoices);
            self.hydration = self.hydrationFilter(allChoices);
        }

        function _postWorkout(data) {
            return _.where(data, {
                type: 2
            });
        }

        function _preWorkout(data) {
            return _.where(data, {
                type: 1
            });
        }

        function _saveChoice(choice){
            return $http.post(apiUrl, choice);
        }

        function _snackOnly(data) {
            return _.where(data, {
                type: 0
            });
        }

        function _typeOptions() {
            var opts = [
                {
                    label: "Snack only",
                    value: 0
            }, {
                    label: "Pre",
                    value: 1
            }, {
                    label: "Post",
                    value: 2
            }, {
                    label: "Hydration",
                    value: 3
            }
            ];
            return opts;
        }

        function _updateChoice(choice){
            return $http.put(apiUrl, choice)
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.core')

        .service('AccountSvc', ['$q', 'SnackLimits', function ($q, SnackLimits) {
            var self = this;
            self.daySnacksLimit = 0;
            self.monthSnacksLimit = 0;

            self.studentId = '';

            self.gotPreToday = false;
            self.gotPostToday = false;
            self.gotHydrationToday = false;

            self.shouldHidePre = false;
            self.shouldHidePost = false;
            self.shouldHideHydration = false;
            self.shouldHideSnacks = false;
            // Note: Need both 'gotPreToday' and 'shouldHidePre' variables so that if athlete already checked out a Pre workout item, and they order it again as a snack then remove it from their cart, it won't become available again as a Pre workout item - it should remain a snack-only option

            self.daySnacksRemaining = '';
            self.monthSnacksRemaining = '';

            self.clear = _clear;
            self.clearStudentId = _clearStudentId;
            self.getSnackLimits = _getSnackLimits;
            self.initializeHiddenCategories = _initializeHiddenCategories;
            self.saveAthleteData = _saveAthleteData;
            self.updateHiddenCategories = _updateHiddenCategories;

            /**
            * Clears saved athlete data and visisbility logic for choices and gets updated snack limits
            */
            function _clear() {
                self.shouldHidePre = false;
                self.shouldHidePost = false;
                self.shouldHideHydration = false;
                self.shouldHideSnacks = false;
                self.athleteData = null;
                self.gotPreToday = false;
                self.gotPostToday = false;
                self.gotHydrationToday = false;
                self.clearStudentId();
                self.daySnacksRemaining = '';
                self.monthSnacksRemaining = '';
                //self.getSnackLimits();
            }

            function _clearStudentId() {
                self.studentId = '';
            }

            function _getSnackLimits(athlete) {
                // TEMP:    return $q.when(athlete[0].AthleteID);

                return SnackLimits.athleteSnackLimits().get(athlete[0].schoolid)
                    .then(function (data) {
                        self.daySnacksLimit = data.daySnackLimit;
                        self.monthSnacksLimit = data.monthSnackLimit;

                        return $q.when(athlete[0].schoolid);
                    });

                // return SnackLimits.athleteSnackLimits().get(athlete[0]).$promise.then(function (data) {
                //     self.daySnacksLimit = data.daySnackLimit;
                //     self.monthSnacksLimit = data.monthSnackLimit;

                //     return $q.when({
                //         studentSportID: athlete[0].studentSportID
                //     });
                // });

            }

            function _initializeHiddenCategories(history, isUpdate) {
                if (history) {
                    if (history.dayPreCount > 0) {
                        self.shouldHidePre = true;
                        self.gotPreToday = true;
                    }
                    if (history.dayPostCount > 0) {
                        self.shouldHidePost = true;
                        self.gotPostToday = true;
                    }
                    if (history.dayHydrationCount > 0) {
                        self.shouldHideHydration = true;
                        self.gotHydrationToday = true;
                    }
                    if (history.daySnacksCount >= self.daySnacksLimit || history.monthSnacksCount >= self.monthSnacksLimit) {
                        self.shouldHideSnacks = true;

                        if (self.gotPreToday == true &&
                            self.gotPostToday == true &&
                            self.gotHydrationToday == true) {
                            var err = {
                                title: "Limit Reached",
                                template: "You have already reached your limit.",
                                shouldClearID: true
                            }

                            // If manager is updating the order, it should not reject
                            if (!isUpdate) {
                                self.clear();
                                return $q.reject(err);
                            }
                        }
                    }

                    // Manually setting defaults (|| self...) because history currently not implemented
                    self.monthSnacksRemaining = Math.max(self.monthSnacksLimit - history.monthSnacksCount, 0) || self.monthSnacksLimit;
                    self.daySnacksRemaining = Math.max(self.daySnacksLimit - history.daySnacksCount, 0) || self.daySnacksLimit;

                    if (self.monthSnacksRemaining < self.daySnacksLimit) {
                        self.daySnacksRemaining = Math.min(self.monthSnacksRemaining, self.daySnacksRemaining);
                    }
                    return $q.when(true);
                }
            }

            /**
            * Hold athlete information in variable so that it can be accessed, e.g. posting checkout with student's ID.
            * If not athlete data is passed in, then reject the request - the student ID does not exist.
            */
            function _saveAthleteData(result) {
                if (result.length > 0) {
                    self.athleteData = result;

                    // Check if sport is eligible to receive snacks (ie in season)
                    if (result[0].sportCode.toUpperCase() === 'MFB') {
                        var err = {
                            title: "Sorry, you are currently not eligible to check out items.",
                            shouldClearID: true,
                            stack: new Error().stack,
                            cause: "Sport not eligible to receive snacks"
                        }
                        return $q.reject(err);
                    }
                    else {
                        return $q.when(result);
                    }
                } else if (result.length === 0) {
                    var err = {
                        title: "The student ID you entered was not found. Please try again.",
                        shouldClearID: true,
                        stack: new Error().stack,
                        cause: "Student ID not found"
                    }
                    return $q.reject(err);
                }
            }

            /**
            * This function is called whenever an item is added to or removed from the cart.
            */
            function _updateHiddenCategories(orders, cancelledItem) {
                var preCounter = 0;
                var postCounter = 0;
                var hydrationCounter = 0;
                var snackCounter = 0;

                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].type === 1) {
                        preCounter++;
                        self.shouldHidePre = true;
                    } else if (orders[i].type === 2) {
                        postCounter++;
                        self.shouldHidePost = true;
                    } else if (orders[i].type === 3) {
                        hydrationCounter++;
                        self.shouldHideHydration = true;
                    } else if (orders[i].isSnack == true) {
                        snackCounter++;
                    }
                }


                if (self.monthSnacksRemaining <= 0 || self.daySnacksRemaining <= 0) {
                    self.shouldHideSnacks = true;
                } else {
                    self.shouldHideSnacks = false;
                }

                // The second condition in the following if statements ensures that Pre, Post, and Hyd options display if a manager removes these choices from an already-placed order
                if ((preCounter === 0 && !self.gotPreToday) || (cancelledItem && cancelledItem.type === 1 && !cancelledItem.isSnack)) {
                    self.shouldHidePre = false;
                }
                if ((postCounter === 0 && !self.gotPostToday) || (cancelledItem && cancelledItem.type === 2 && !cancelledItem.isSnack)) {
                    self.shouldHidePost = false;
                }
                if ((hydrationCounter === 0 && !self.gotHydrationToday) || (cancelledItem && cancelledItem.type === 3 && !cancelledItem.isSnack)) {
                    self.shouldHideHydration = false;
                }
            }

        }]);
})();

(function () {
    'use strict';

    angular.module('app.core')

	.service('AuthSvc', ['$q', function($q) {
		var self = this;
		self.isAuthenticated = _isAuthenticated;
		self.login = _login;
		self.logout = _logout;
		self.getUser = _getUser;
		self.getToken = _getToken;
		self.refreshTokens = _refreshTokens;
		self.changePassword = _changePassword;
        self.authNewUser = _authNewUser;
		self.token = null;

//		self.poolData = { 
//			UserPoolId : "us-west-2_HqCU8elu4",
//			ClientId : "bq4vqit9hrh97vrkurd2ns45p"
//		};
		//FuelStation User Pool
		self.poolData = { 
			UserPoolId : "us-west-2_KMI3gTfQw",
			ClientId : "49f7iepq786236nea8t33m1kje"
		};
		AWSCognito.config.update({region:'us-west-2'});

		function _login(loginData) {
			var authenticationData = {
				Username : loginData.username,
				Password : loginData.password
			};
			var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var userData = {
				Username : loginData.username,
				Pool : userPool
			};
			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
			return $q(function(resolve, reject){
				cognitoUser.authenticateUser(authenticationDetails, {                
					onSuccess: function (result) {
						//console.log('access token + ' + result.getAccessToken().getJwtToken());
						/*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
						console.log('refreshToken + ' + result.getRefreshToken().token);
						console.log('accessToken + ' + new Date(result.getAccessToken().getExpiration() * 1000));
						console.log('idToken + ' + new Date(result.getIdToken().getExpiration() * 1000));
						self.token = result.idToken.jwtToken;
                        
				// Add the User's Id Token to the Cognito credentials login map.
                AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:28695927-b308-4073-acd6-fedc4e1cd40b',
                    Logins: {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_KMI3gTfQw': result.getIdToken().getJwtToken()
                    }
                });
                        
						resolve(result.idToken.jwtToken);
					},

					onFailure: function(err) {
						console.error(err);
						reject(err);
					}
				});            
			});
		}
		
		function _changePassword(oldPassword, newPassword) {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();
			return $q(function(resolve, reject){
				cognitoUser.getSession(function(err, session) {
					if (err) {
						console.error('Error encountered during getSession.', err);
						reject(err);
					}
					cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
						if (err) {
							reject(err);
							return;
						}
						console.log('call result: ' + result);
						resolve(result);
					});
				});
			});
		}

		function _isAuthenticated() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return (cognitoUser != null);
		}

		function _logout() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return cognitoUser.signOut();
		}

		function _getToken() {
			return $q(function(resolve, reject) {
				if (self.token) {
                    if (self.tokenExpiration > new Date()) {
						//console.log(self.token);
                        resolve(self.token);
                    } else {
                        console.info('EXPIRED - refresh tokens w/ AWS and the refreshToken...');
						_refreshTokens();
                        resolve(null);
                    }
                }
				else {
					return _getUser().then(function(token) {
						self.token = token;
						resolve(token)
					}).catch(function(err) {
						reject(err);
					});
				}
			});
		}
		
		function _refreshTokens() {
			//call refresh method in order to authenticate user and get new temp credentials
			AWSCognito.config.credentials.refresh((error) => {
				if (error) {
					console.error(error);
				} else {
					console.log('Successfully logged!');
					_getUser();
				}
			});
		}

		function _getUser() {
			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var cognitoUser = userPool.getCurrentUser();

			return $q(function(resolve, reject) {
				if (cognitoUser != null) {
					cognitoUser.getSession(function(err, session) {
						if (err) {
							console.error('Error encountered during getSession.', err);
							reject(err);
						}
						self.token = session.getIdToken().jwtToken;
                        self.tokenExpiration = new Date(session.getIdToken().getExpiration() * 1000);
						console.info("Token Remain (min): ", (self.tokenExpiration - new Date())/60000);

				// Add the User's Id Token to the Cognito credentials login map.
                AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:28695927-b308-4073-acd6-fedc4e1cd40b',
                    Logins: {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_KMI3gTfQw': session.getIdToken().getJwtToken()
                    }
                });
						
						resolve(session.getIdToken().jwtToken);
					});
				} else { return resolve(null); }
			});
		}
        
        function _authNewUser(loginData) {
			var authenticationData = {
				Username : loginData.username,
				Password : loginData.password
			};
			var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(self.poolData);
			var userData = {
				Username : loginData.username,
				Pool : userPool
			};
			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            return $q(function(resolve, reject) {
                if (cognitoUser != null) {
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            // User authentication was successful
                            console.log('User Auth for new user was successful!');
                            resolve(result);
                        },

                        onFailure: function(err) {
                            // User authentication was not successful
                            console.error('User Auth Problem: ', err);
                            reject(err);
                        },

                        mfaRequired: function(codeDeliveryDetails) {
                            // MFA is required to complete user authentication.
                            // Get the code from user and call
                            console.log('User Auth requires an MFA code...');
                            cognitoUser.sendMFACode(mfaCode, this)
                        },

                        newPasswordRequired: function(userAttributes, requiredAttributes) {
                            // User was signed up by an admin and must provide new
                            // password and required attributes, if any, to complete
                            // authentication.

                            // the api doesn't accept this field back
                            delete userAttributes.email_verified;

                            // Get these details and call
                            var newPassword = 'FuelStation17!';
                            userAttributes.family_name = 'Leininger';
                            userAttributes.given_name = 'Jeff';
                            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
                        }
                    });
                } else { reject('no user found for authentication...'); }
			});
	   }
    }]);
})();
(function () {
    'use strict';

    angular.module('app.core')

    .service('OrderSvc', ['AccountSvc', 'CheckoutSvc', 'IonicAlertSvc', function (AccountSvc, CheckoutSvc, IonicAlertSvc) {
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
                choice = checkoutChoices[i].Choice;
                
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
    }]);
})();

(function () {
    'use strict';

    angular.module('app.core')

    .factory('AthleteSvc', ['$http', '$resource', '$cacheFactory', 'ApiEndpoint', function ($http, $resource, $cacheFactory, ApiEndpoint) {
        var service = {
            getAthlete: _getAthlete,
            athleteApi: _athleteApi
        };

        return service;

        function _athleteApi() {
            // return $resource(ApiEndpoint.url + 'StudentSport/:schoolsidnumber', {
            //     schoolsidnumber: "@id"
            // });
        }

        function _getAthlete(id) {
            // return service.athleteApi().query({
            //     schoolsidnumber: id
            // });
            return $http.get('https://9cyvf89py9.execute-api.us-west-2.amazonaws.com/dev/athletes/' + id)
                .then(function(result){
                    return result.data.athletes; // API returns data in 'athletes' property
                });
        }
    }]);
})();

(function () {
    'use strict';

    angular.module('app.core')

    .factory('CheckoutSvc', ['$http', '$resource', 'ApiEndpoint', 'IonicAlertSvc', 'LoadingSpinner', function ($http, $resource, ApiEndpoint, IonicAlertSvc, LoadingSpinner) {
        var service = {
            archived: _archived,
            checkout: _checkout,
            currentCheckout: {},
            getCheckoutHistory: _getCheckoutHistory,
            getDailyCheckouts: _getDailyCheckouts,
            getMonthCounts: _getMonthCounts,
            fillCheckoutObject: _fillCheckoutObject,
            processCheckout: _processCheckout,
            setArchiveProperties: _setArchiveProperties,
            setUnarchiveProperties: _setUnarchiveProperties,
            unarchived: _unarchived
        };

        return service;

        
        function _archived() {
//            return $resource(ApiEndpoint.url + 'Checkouts/Archived');
            return {
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/Archived'); 
                }
            };            
        }
        
        function _checkout() {
            // return $resource(ApiEndpoint.url + 'Checkouts/:checkoutID', {
            //     checkoutID: '@checkoutID'
            // }, {
            //     'update': {
            //         method: 'PUT'
            //     }
            // });
            return {
                save: function(checkout) {
                    return $http.post('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout);
                },
                update: function(checkout) {
                    return $http.put('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout);
                },
                delete: function(id) {
                    return $http.delete('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/' + id);
                },
                get: function(id) {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/' + id);
                },
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts?filter=93262,93263,93265,93266');
                }
            };
            return $http.post('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts',checkout)
        }

        // This currently returns a specific checkout by checkout ID, not the checkout history of athlete
        function _getCheckoutHistory(id) {
            // return $resource(ApiEndpoint.url + 'Checkouts/History/:studentSportID', {
            //     studentSportID: '@studentSportID'
            // });
            return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/history/' + id)
                .then(function(result){
                    return result.data;
                });
        }
        
        function _getDailyCheckouts() {
            //return $resource(ApiEndpoint.url + 'Checkouts/GetDailyCheckouts');
			return {
				query: function() {
					return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/daily');
				}
			}
        }
        
        /**
        * Gets total orders for each snack by month
        */
        function _getMonthCounts(timePeriod){
            //return $resource(ApiEndpoint.url + 'Checkouts/GetMonthCounts/Month/' + timePeriod.month + '/Year/' + timePeriod.year);
            return {
                query: function(){
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/report/checkouts/monthly')
                        .then(function(result){
                            return result.data;
                        });
                }
            }
        }

        /**
        * Sets required data properties on checkout required for database model
        */
        function _fillCheckoutObject(order, studentSportID) {
            var checkout = {};

            checkout.CreateDate = moment().format();
            checkout.StudentSportID = studentSportID;
            checkout.CheckoutChoices = order;

            return checkout;
        }

        function _processCheckout(orderItems, studentSportID) {
            LoadingSpinner.show();
            
            var checkout = service.fillCheckoutObject(orderItems, studentSportID);

            // var saveCheckout = service.checkout().save(checkout);
            // saveCheckout.$promise.then(onOrderSuccess, IonicAlertSvc.error);
            return service.checkout().save(checkout)
                .then(onOrderSuccess)
                .catch(IonicAlertSvc.error);

            function onOrderSuccess() {
                LoadingSpinner.hide();
                var msg = {
                    title: "Thank you for placing your order",
                    redirect: "tab.studentID"
                };
                IonicAlertSvc.alert(msg);
            }
        }

        function _setArchiveProperties(checkout) {
            var currentCheckout = checkout;

            currentCheckout.isArchived = true;
            currentCheckout.archiveDate = moment().format();
            currentCheckout.studentSport = null;

            return currentCheckout;
        }
        
        /**
        * Remove archive properties if order is unarchived to be edited or deleted
        */
        function _setUnarchiveProperties(checkout) {
            var currentCheckout = checkout;

            currentCheckout.isArchived = false;
            currentCheckout.archiveDate = null;
            currentCheckout.studentSport = null;

            return currentCheckout;
        }
        
        function _unarchived() {
            //return $resource(ApiEndpoint.url + 'Checkouts/Unarchived');
            return {
                query: function() {
                    return $http.get('https://f5ekrwo1b6.execute-api.us-west-2.amazonaws.com/dev/checkouts/Unarchived'); 
                }
            };            
        }
    }]);
})();

(function () {
    'use strict';

    ioniceAlertSvc.$inject = ['$ionicPopup', '$q', '$state', 'AccountSvc', 'LoadingSpinner', 'ErrorLogSvc'];
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

(function () {
    'use strict';

    angular.module('app.core')

    .factory('LoadingSpinner', ['$ionicLoading', function ($ionicLoading) {
        
        var service = {
            show: _show,
            hide: _hide
        }

        return service;
        
        function _show() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>',
                delay: 400,
                duration: 20000
            });
        }
        
        function _hide() {
            $ionicLoading.hide();
        }
    }]);
})();

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
