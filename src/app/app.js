var token = 'default';

token = 'admin';

if (token === 'admin') {
  angular.module('main.app', ['admin.app']);

  angular.module('main.app').run([
    '$state',
    function($state) {
      $state.transitionTo('adminmaingui.dashboard');
    }
  ]);
} else {
  angular.module('main.app', ['canopi.app']);

  angular.module('main.app').run([
    '$state',
    '$rootScope',
    '$log',
    '$http',
    '$timeout',
    '$sanitize',
    'CommonUtilJsonService',
    '$cookieStore',
    '$cookies',
    function(
      $state,
      $rootScope,
      $log,
      $http,
      $timeout,
      $sanitize,
      CommonUtilJsonService,
      $cookieStore,
      $cookies
    ) {
      $state.transitionTo('canopimaingui.dashboard');
    }
  ]);
}
