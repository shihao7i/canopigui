angular.module('canopi.app').controller('EquipmentReviewController', [
  '$scope',
  '$location',
  '$rootScope',
  '$state',
  'Cache',
  '$filter',
  '$http',
  '$timeout',
  function(
    $scope,
    $location,
    $rootScope,
    $state,
    Cache,
    $filter,
    $http,
    $timeout
  ) {
    'use strict';

    init();

    function init() {
      setupScopeValuesAndMethods();
    }

    function setupScopeValuesAndMethods() {
      $scope.name = 'EquipmentReview';

      $scope.accordionOpen = {
        clli: true,
        devices: true,
        linkMapping: true
      };
    }
  }
]);
