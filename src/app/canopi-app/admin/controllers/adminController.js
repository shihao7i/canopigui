angular.module('canopi.app').controller('AdminController', [
  '$scope',
  '$log',
  '$location',
  '$rootScope',
  '$state',
  'Cache',
  '$filter',
  '$http',
  function($scope, $log, $location, $rootScope, $state, Cache, $filter, $http) {
    'use strict';

    init();

    function init() {
      setupScopeValuesAndMethods();
    }

    function setupScopeValuesAndMethods() {}
  }
]);
