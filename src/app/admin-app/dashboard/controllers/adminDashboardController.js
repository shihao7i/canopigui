(function() {
  'use strict';

  angular
    .module('canopi.directive')
    .controller('AdminDashboardController', adminDashboardController);

  adminDashboardController.$inject = ['$log'];

  function adminDashboardController($log) {
    var vm = this;

    $log.debug('Dashboard ...');
  }
})();
