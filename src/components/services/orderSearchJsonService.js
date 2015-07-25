(function() {
    'use strict';
    
    angular.module('canopi.service')
           .factory('OrderSearchJsonService', orderSearchJsonService);

    orderSearchJsonService.$inject = ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants'];    

    function orderSearchJsonService($q, $http, $log, Cache, CanopiGuiConstants) {
	//var controllerName = MOCK_DATA_FLAG ? 'orderSearchmock' : 'orderSearch';
	var controllerName = 'orderSearch';  // call DCOMP WS to get live data  

        var baseUrl = '/canopigui/rest/' + controllerName;

        
        var service = {
            getProjectOrderSummary: getProjectOrderSummary,
            getTechnicalOrderSummary: getTechnicalOrderSummary,
            getRelatedProjectOrders: getRelatedProjectOrders,
            getRelatedTechnicalOrders: getRelatedTechnicalOrders,
            searchRelatedOrdersByDeviceClli: searchRelatedOrdersByDeviceClli
        };
        
        return service;
        
        /////////
        
        // ServiceOrderContainerDTO getProjectOrderSummary(@RequestBody ProjectOrderSearchDTO posDto)
	
	function getProjectOrderSummary(postObject) {

            var deferred = $q.defer();
            $http.post(baseUrl + '/poSearch', JSON.stringify(postObject)).success(function (response) {
                 deferred.resolve(response);
            });

            return deferred.promise; 
	};
	

	// ServiceOrderContainerDTO getTechnicalOrderSummary(@RequestBody TechnicalOrderSearchDTO tosDto)
	
	function getTechnicalOrderSummary(postObject) {

            var deferred = $q.defer();
            $http.post(baseUrl + '/toSearch', JSON.stringify(postObject)).success(function (response) {
                 deferred.resolve(response);
            });

            return deferred.promise; 
	};
	

        // ServiceOrderContainerDTO getRelatedProjectOrders(@RequestBody ProjectOrderSearchRequestDTO poSearchRequestDTO)
		
	function getRelatedProjectOrders(postObject) {

            var deferred = $q.defer();
            $http.post(baseUrl + '/relatedPoSearch', JSON.stringify(postObject)).success(function (response) {
                 deferred.resolve(response);
            });

            return deferred.promise; 
	};
		
	
        // ServiceOrderContainerDTO getRelatedTechnicalOrders(TechnicalOrderSearchRequestDTO toSearchRequestDTO)
	
	function getRelatedTechnicalOrders(postObject) {

            var deferred = $q.defer();
            $http.post(baseUrl + '/relatedToSearch', JSON.stringify(postObject)).success(function (response) {
                 deferred.resolve(response);
            });

            return deferred.promise; 
	};
	
	
	
	// ServiceOrderContainerDTO searchRelatedOrdersByDeviceClli(DeviceClliRelatedOrdersSearchRequestDTO deviceClliRoSearchRequestDTO)
	
	function searchRelatedOrdersByDeviceClli(postObject) {

            var deferred = $q.defer();
            $http.post(baseUrl + '/searchROByDeviceClli', JSON.stringify(postObject)).success(function (response) {
                 deferred.resolve(response);
            });

            return deferred.promise; 
	};
        
    }

})();

