angular.module('canopi.service').service('InventoryJsonService', ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants', 
                              function ($q, $http, $log, Cache, CanopiGuiConstants) {
	           
	'use strict';

	//var controllerName = MOCK_DATA_FLAG ? 'inventorymock' : 'inventory';
	var controllerName = 'inventory';  // call Cramer WS to get live data 

    var baseUrl = '/canopigui/rest/' + controllerName;


    // DeviceDataContainer searchEquipmentDatas(@RequestBody EquipmentSearchCriteria searchCriteria)
	
	this.searchEquipmentDatas = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/searchEquipmentDatas', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};

	
	// DeviceDataWrapper getDeviceDetail(@PathVariable("attUid") String attUid, @PathVariable("deviceClli") String deviceClli)
	
	this.getDeviceDetail = function (attUid, deviceClli) {

		var deferred = $q.defer();

        $http.get(baseUrl + '/deviceDetail/get/' + attUid + '/' + deviceClli).success(function (response) {
            deferred.resolve(response);
        });
      
        return deferred.promise; 
	};


}]);
