(function() {
  'use strict';

  angular
    .module('canopi.service')
    .factory('LookupSearchJsonService', lookupSearchJsonService);

  lookupSearchJsonService.$inject = [
    '$q',
    '$http',
    '$log',
    'Cache',
    'CanopiGuiConstants'
  ];

  function lookupSearchJsonService($q, $http, $log, Cache, CanopiGuiConstants) {
    //var controllerName = MOCk_DATA_FLAG ? 'lookupSearchmock' : 'lookupSearch';
    var controllerName = 'lookupSearch'; // call Cramer WS to get live data

    var baseUrl = '/canopigui/rest/' + controllerName;

    var service = {
      searchCustomers: searchCustomers,
      searchDevices: searchDevices,
      searchUnis: searchUnis,
      facilityIdSearch: facilityIdSearch,
      evcCircuitIdSearch: evcCircuitIdSearch,
      deviceSearch: deviceSearch
    };

    return service;

    /////////

    // CustomerSearchContainerDTO searchCustomers(@RequestBody CustomerSearchRequestDTO customerSearchRequestDto)

    function searchCustomers(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/searchCustomers', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // DeviceClliAZSearchContainerDTO searchDevices(@RequestBody SearchDevicesRequestDTO requestDto)

    function searchDevices(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/searchDevices', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // UniDataContainer searchUnis(@RequestBody UNISearchRequest uniSearchRequest)

    function searchUnis(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/searchUnis', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // FacilityIdSearchContainerDTO facilityIDSearch(@RequestBody FacilityIdSearchRequestDTO facilityIdSearchRequest)

    function facilityIdSearch(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/facilityIdSearch', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // EVCCircuitIdSearchContainerDTO evcCircuitIdSearch(@RequestBody EVCCircuitIdSearchRequestDTO evcCircuitSearchRequest)

    function evcCircuitIdSearch(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/evcCircuitIdSearch', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    // DeviceClliAZSearchContainerDTO deviceSearch(@RequestBody DeviceClliAZSearchRequestDTO deviceClliAZSearchRequest)

    function deviceSearch(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/deviceSearch', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }
  }
})();
