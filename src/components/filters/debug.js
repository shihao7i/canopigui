(function() {
  'use strict';

  angular.module('canopi.filter').filter('debug', debugFilter);

  debugFilter.$inject = ['$log'];

  function debugFilter($log) {
    return function(obj) {
      $log.debug(obj);
    };
  }
})();
