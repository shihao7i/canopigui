angular.module('canopi.service').service('OrderSearchJsonService', ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants', 
                              function ($q, $http, $log, Cache, CanopiGuiConstants) {
	           
	'use strict';

	//var controllerName = MOCK_DATA_FLAG ? 'orderSearchmock' : 'orderSearch';
	var controllerName = 'orderSearch';  // call DCOMP WS to get live data  

        var baseUrl = '/canopigui/rest/' + controllerName;


    // ServiceOrderContainerDTO getProjectOrderSummary(@RequestBody ProjectOrderSearchDTO posDto)
	
	this.getProjectOrderSummary = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/poSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	

	// ServiceOrderContainerDTO getTechnicalOrderSummary(@RequestBody TechnicalOrderSearchDTO tosDto)
	
	this.getTechnicalOrderSummary = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/toSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	

    // ServiceOrderContainerDTO getRelatedProjectOrders(@RequestBody ProjectOrderSearchRequestDTO poSearchRequestDTO)
		
	this.getRelatedProjectOrders = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/relatedPoSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
		
	
    // ServiceOrderContainerDTO getRelatedTechnicalOrders(TechnicalOrderSearchRequestDTO toSearchRequestDTO)
	
	this.getRelatedTechnicalOrders = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/relatedToSearch', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	
	
	// ServiceOrderContainerDTO searchRelatedOrdersByDeviceClli(DeviceClliRelatedOrdersSearchRequestDTO deviceClliRoSearchRequestDTO)
	
	this.searchRelatedOrdersByDeviceClli = function (postObject) {

		var deferred = $q.defer();
        $http.post(baseUrl + '/searchROByDeviceClli', JSON.stringify(postObject)).success(function (response) {
             deferred.resolve(response);
        });
      
        return deferred.promise; 
	};
	
	
}]);
