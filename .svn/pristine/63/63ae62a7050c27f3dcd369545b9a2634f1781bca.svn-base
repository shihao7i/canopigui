angular.module('canopi.service').service('LookupSearchJsonService', ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants', 
                              function ($q, $http, $log, Cache, CanopiGuiConstants) {
	           
	'use strict';

	//var controllerName = MOCk_DATA_FLAG ? 'lookupSearchmock' : 'lookupSearch';
	var controllerName = 'lookupSearch';  // call Cramer WS to get live data 

    var baseUrl = '/canopigui/rest/' + controllerName;


    // CustomerSearchContainerDTO searchCustomers(@RequestBody CustomerSearchRequestDTO customerSearchRequestDto)
	
	this.searchCustomers = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/searchCustomers', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	// DeviceClliAZSearchContainerDTO searchDevices(@RequestBody SearchDevicesRequestDTO requestDto)
	
	this.searchDevices = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/searchDevices', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	
	
	// UniDataContainer searchUnis(@RequestBody UNISearchRequest uniSearchRequest)
	
	this.searchUnis = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/searchUnis', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	
	
	// FacilityIdSearchContainerDTO facilityIDSearch(@RequestBody FacilityIdSearchRequestDTO facilityIdSearchRequest)
	
	this.facilityIdSearch = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/facilityIdSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	
	// EVCCircuitIdSearchContainerDTO evcCircuitIdSearch(@RequestBody EVCCircuitIdSearchRequestDTO evcCircuitSearchRequest)
			
	this.evcCircuitIdSearch = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/evcCircuitIdSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};		

	
	// DeviceClliAZSearchContainerDTO deviceSearch(@RequestBody DeviceClliAZSearchRequestDTO deviceClliAZSearchRequest)
	
	this.deviceSearch = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/deviceSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};		
	
	
}]);
