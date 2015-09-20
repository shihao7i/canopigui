(function() {
  'use strict';

  angular
    .module('canopi.service')
    .factory('InventoryJsonService', inventoryJsonService);

  inventoryJsonService.$inject = [
    '$q',
    '$http',
    '$log',
    'Cache',
    'CanopiGuiConstants'
  ];

  function inventoryJsonService($q, $http, $log, Cache, CanopiGuiConstants) {
    //var controllerName = MOCK_DATA_FLAG ? 'inventorymock' : 'inventory';
    var controllerName = 'inventory'; // call Cramer WS to get live data

    var baseUrl = '/canopigui/rest/' + controllerName;

    var service = {
      searchEquipmentDatas: searchEquipmentDatas,
      getDeviceDetail: getDeviceDetail
    };

    return service;

    ///////

    // DeviceDataContainer searchEquipmentDatas(@RequestBody EquipmentSearchCriteria searchCriteria)

    function searchEquipmentDatas(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/searchEquipmentDatas', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // DeviceDataWrapper getDeviceDetail(@PathVariable("attUid") String attUid, @PathVariable("deviceClli") String deviceClli)

    function getDeviceDetail(attUid, deviceClli) {
      var deferred = $q.defer();

      $http
        .get(baseUrl + '/deviceDetail/get/' + attUid + '/' + deviceClli)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }
  }
})();
