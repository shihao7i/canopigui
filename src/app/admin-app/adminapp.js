angular.module('admin.app', [
    'ngRoute', 'ngResource', 'ui.bootstrap', 'ngGrid',
    'ui.router', 'ngCookies',
    'ui.grid', 'ui.grid.selection', 'ui.grid.rowEdit', 'ui.grid.autoResize', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.exporter',
    'canopi.directive', 'canopi.filter',
    'admin.service',  'maxmedia.directive', 'cgBusy',  'ui.grid.resizeColumns',  'isteven-multi-select'
]);




angular.module('admin.app').config(['$stateProvider', '$urlRouterProvider', '$tooltipProvider', function ($stateProvider, $urlRouterProvider, $tooltipProvider) {
    // ui.bootstrap
    $tooltipProvider.options({
        appendToBody: true
    });
    //$urlRouterProvider.otherwise('adminguidashboard');
    //$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('adminmaingui', {
            abstract: true,
            url: '/adminmain',
            templateUrl: 'app/admin-app/adminmain.html',
            controller: 'AdminMainController',
            controllerAs: 'adminmain',
            resolve: {
                serverInfo: ['CommonUtilJsonService', function (CommonUtilJsonService) {
                    return CommonUtilJsonService.getServerInfo();
                }]
            }
        })
        .state('adminmaingui.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/admin-app/dashboard/views/adminDashboard.html',
            controller: 'AdminDashboardController',
            controllerAs: 'dashboard'
        })
        .state('adminmaingui.mobilityorders', {
            url: '/mobilityorders',
            templateUrl: 'app/admin-app/mobilityorders/views/mobilityOrders.html',
            controller: 'MobilityOrdersController',
            controllerAs: 'mobilityorders',
            resolve: {
                orderPicklists: ['$q', 'AdminJsonService', function ($q, AdminJsonService) {
                    var  poTypes = AdminJsonService.getPOTypes();
                    var  woTypes = AdminJsonService.getWOTypes();
                    
                    return $q.all([poTypes, woTypes]).then(function(results){
                        return {
                            poTypes: results[0],
                            woTypes: results[1]
                        };
                    });
                }]
            }
        })
        .state('adminmaingui.newwotemplate', {
            url: '/newwotemplate',
            templateUrl: 'app/admin-app/mobilityorders/views/newWOTemplate.html',
            controller: 'NewWOTemplateController',
            controllerAs: 'newwotemplate',
            resolve: {
                poPicklist: ['AdminJsonService', function (AdminJsonService) {
                    return AdminJsonService.getPOTypes();
                }]
            }
        })
        .state('adminmaingui.tasks', {
            url: '/tasks',
            templateUrl: 'app/admin-app/tasks/views/taskSearch.html',
            controller: 'TasksController',
            controllerAs: 'tasks',
            resolve: {
                taskTypes: ['AdminJsonService', function (AdminJsonService) {
                    return AdminJsonService.getTaskType('tasktypepicklist');
                }]
            }
        })
        .state('adminmaingui.lookupadmin', {
            url: '/lookupadmin',
            templateUrl: 'app/admin-app/lookupadmin/views/lookupAdmin.html',
            controller: 'LookupAdminController',
            controllerAs: 'lookupadmin',
            resolve: {
                lookupTypes: ['AdminJsonService', function (AdminJsonService) {
                    return AdminJsonService.getLookupType('lookuptypepicklist');
                }]
            }
        })
        .state('adminmaingui.ruleadmin', {
            url: '/ruleadmin/:ruleCategory/:woType',
            templateUrl: 'app/admin-app/ruleadmin/views/ruleAdmin.html',
            controller: 'RuleAdminController',
            controllerAs: 'ruleadmin',
            resolve: {
                ruleCategories: ['AdminJsonService', function (AdminJsonService) {
                    return AdminJsonService.getRuleCategory('rulecategorypicklist');
                }]
            }
        })
        .state('adminmaingui.activitysearch', {
            url: '/activitysearch',
            templateUrl: 'app/admin-app/utility/views/activitySearch.html',
            controller: 'ActivitySearchController',
            controllerAs: 'activitysearch',
            resolve: {
                picklists: ['$q', 'AdminJsonService', function ($q, AdminJsonService) {
                    var  activityTypes = AdminJsonService.getActivityTypes('activitytypepicklist');
                    var  woTypes = AdminJsonService.getWOTypes();
                    
                    return $q.all([activityTypes, woTypes]).then(function(results){
                        return {
                            activityTypes: results[0],
                            woTypes: results[1]
                        };
                    });
                }]
            
            }
         });

}]);


angular.module('admin.app').run([function () {

    console.log("Admin App Runs!");

}]);

//Global options
//angular.module('admin.app').value('uiGridOptions', {
//    enableSelectAll: false,
//    enableHorizontalScrollbar: uiGridConstants.NEVER,
//    enableColumnMenus: false,
//    enableGridMenu: true,
//    multiSelect: false,
//    exporterMenuPdf: false,
//    exporterMenuCsv: false,
//    selectionRowHeaderWidth: '105',
//});