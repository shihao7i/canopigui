angular.module('canopi.app').controller('DeviceDetailsController', [
  '$scope',
  '$location',
  '$rootScope',
  '$state',
  'Cache',
  '$filter',
  '$http',
  function($scope, $location, $rootScope, $state, Cache, $filter, $http) {
    'use strict';
    var vm = this;

    init();

    function init() {
      setupScopeValuesAndMethods();
    }

    function setupScopeValuesAndMethods() {
      vm.accordionOpen = {
        search: true,
        details: true,
        table: true
      };

      vm.name = 'DeviceDetails';

      vm.ipAddressesData = {};
      vm.cardsOrPortsData = {};

      $http
        .get('app/canopi-app/mock/telco/network/ipAddressesResponse.json')
        .then(function(res) {
          vm.ipAddressesResponseData = res.data;
          processResponseResult(vm.ipAddressesData, vm.ipAddressesResponseData);
        });

      $http
        .get('app/canopi-app/mock/telco/network/cardsOrPortsResponse.json')
        .then(function(res) {
          vm.cardsOrPortsResponseData = res.data;
          processResponseResult(
            vm.cardsOrPortsData,
            vm.cardsOrPortsResponseData
          );
        });
    }

    function processResponseResult(resultData, responseData) {
      resultData.tableDefinition = {};
      resultData.loadTrigger = 0;
      resultData.tableDefinition = responseData.tableRows;
      resultData.loadTrigger++;
    }
  }
]);
