angular.module('admin.app', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'ngStorage',
  'ngGrid',
  'ui.router',
  'ngCookies',
  'drag',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.rowEdit',
  'ui.grid.autoResize',
  'ui.grid.edit',
  'ui.grid.cellNav',
  'ui.grid.resizeColumns',
  'ui.grid.exporter',
  'ui.grid.pinning',
  'ui.grid.resizeColumns',
  'canopi.directive',
  'canopi.filter',
  'admin.service',
  'maxmedia.directive',
  'cgBusy',
  'isteven-multi-select'
]);

angular.module('admin.app').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$tooltipProvider',
  function($stateProvider, $urlRouterProvider, $tooltipProvider) {
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
        controllerAs: 'adminmain'
      })
      .state('adminmaingui.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin-app/dashboard/views/adminDashboard.html',
        controller: 'AdminDashboardController',
        controllerAs: 'dashboard'
      })
      .state('adminmaingui.mobilityorders', {
        url: '/mobilityorders',
        templateUrl: 'app/admin-app/mobilityorders/views/woTemplateTabs.html',
        controller: 'MobilityOrdersController',
        controllerAs: 'mobilityorders',
        resolve: {
          orderPicklists: [
            '$q',
            'AdminJsonService',
            function($q, AdminJsonService) {
              var poTypes = AdminJsonService.getMockPOTypes();
              var woTypes = AdminJsonService.getMockWOTypes();

              return $q.all([poTypes, woTypes]).then(function(results) {
                return {
                  poTypes: results[0],
                  woTypes: results[1]
                };
              });
            }
          ],
          taskPriorityConfig: [
            'AdminJsonService',
            function(AdminJsonService) {
              return AdminJsonService.getTaskPriorityConfig();
            }
          ]
        }
      })
      .state('adminmaingui.tasks', {
        url: '/tasks',
        templateUrl: 'app/admin-app/tasks/views/taskSearch.html',
        controller: 'TasksController',
        controllerAs: 'tasks',
        resolve: {
          taskTypes: [
            'AdminJsonService',
            function(AdminJsonService) {
              return AdminJsonService.getTaskType('tasktypepicklist');
            }
          ]
        },
        onEnter: ['TransitionData', function(TransitionData) {}],
        onExit: [
          'TransitionData',
          function(TransitionData) {
            TransitionData.setNumberOfModalsDisplayed(0);
            TransitionData.setDirtyRows('no');
          }
        ]
      })
      .state('adminmaingui.lookupadmin', {
        url: '/lookupadmin',
        templateUrl: 'app/admin-app/lookupadmin/views/lookupAdmin.html',
        controller: 'LookupAdminController',
        controllerAs: 'lookupadmin',
        resolve: {
          lookupTypeConfig: [
            'AdminJsonService',
            function(AdminJsonService) {
              return AdminJsonService.getLookupTypeConfig();
            }
          ]
        },
        onEnter: ['TransitionData', function(TransitionData) {}],
        onExit: [
          'TransitionData',
          'Dialog',
          function(TransitionData, Dialog) {
            TransitionData.setNumberOfModalsDisplayed(0);
            TransitionData.setDirtyRows('no');
          }
        ]
      })
      .state('adminmaingui.ruleadmin', {
        url: '/ruleadmin/:ruleCategoryValue/:woType',
        params: {
          ruleCategoryValue: { value: null, squash: true },
          woType: { value: null, squash: true }
        },
        templateUrl: 'app/admin-app/ruleadmin/views/ruleAdmin.html',
        controller: 'RuleAdminController',
        controllerAs: 'ruleadmin',
        resolve: {
          ruleCategoryConfig: [
            'AdminJsonService',
            function(AdminJsonService) {
              return AdminJsonService.getRuleCategoryConfig();
            }
          ]
        }
      })
      .state('adminmaingui.activitysearch', {
        url: '/activitysearch',
        templateUrl: 'app/admin-app/utility/views/activitySearch.html',
        controller: 'ActivitySearchController',
        controllerAs: 'activitysearch',
        resolve: {
          picklists: [
            '$q',
            'AdminJsonService',
            function($q, AdminJsonService) {
              var activityTypes = AdminJsonService.getActivityTypes(
                'activitytypepicklist'
              );
              var woTypes = AdminJsonService.getMockWOTypes();

              return $q.all([activityTypes, woTypes]).then(function(results) {
                return {
                  activityTypes: results[0],
                  woTypes: results[1]
                };
              });
            }
          ]
        }
      });
  }
]);

angular.module('admin.app').run([
  '$rootScope',
  '$window',
  '$log',
  'Dialog',
  'TransitionData',
  'UiGridCommands',
  function($rootScope, $window, $log, Dialog, TransitionData, UiGridCommands) {
    console.log('Admin App Runs!');

    init();

    function init() {
      setupEventListenerForStateChange();
    }

    $rootScope.logout = function() {
      console.log('logout called ...');

      // not to trigger logout action while testing from NetBeans IDE
      if (localStorage.getItem('logout')) {
        var logout = new String(localStorage.logout);
        $window.location.href = logout;
      }
    };

    function setupEventListenerForStateChange() {
      $rootScope.$on('$stateChangeStart', function(
        event,
        toState,
        toParams,
        fromState,
        fromParams
      ) {
        //$log.debug("$stateChangeStart (to State)  => " + angular.toJson(toState));
        //$log.debug("TransitionData.getDirtyRows()  => " + TransitionData.getDirtyRows());
        //$log.debug("TransitionData.getNumberOfModalsDisplayed()  => " + TransitionData.getNumberOfModalsDisplayed());
        //if(TransitionData.getDirtyRows() === "yes" && TransitionData.getNumberOfModalsDisplayed() < 1) {
        if (TransitionData.getDirtyRows() === 'yes') {
          event.preventDefault();
          Dialog.confirm(
            'You have changes that are not saved. Would you like to discard the changes and continue?',
            fromState,
            toState
          ).then(function() {
            UiGridCommands.resetCallbacks();
          });

          //                var count = TransitionData.getNumberOfModalsDisplayed();
          //                count = count + 1;
          //
          //                TransitionData.setNumberOfModalsDisplayed(count++);
        }
      });
    }
  }
]);
