angular.module('canopi.app').controller('NetworkDiscoveryController', ['$scope', '$location', '$rootScope', '$state', 'Cache', '$filter','$http',
                                       function ($scope, $location, $rootScope, $state, Cache, $filter, $http) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();


    }



    function setupScopeValuesAndMethods() {

        $('#aboutDevice').on('shown.bs.modal', function () {
            $scope.$broadcast('layout');
        });

        $scope.accordionOpen = {
    			search: true,
			    details: true,
			    table: true
    	};
    
        $scope.name = "DeviceDetails";
        
        $scope.networkDetailsData = {};
        
        $scope.deviceClliInfo = {};
        
        $http.get('app/mock/telco/network/networkDetailsResponse.json')
		.then(function(res){
			$scope.networkDetailsResponseData = res.data;
			processResponseResult($scope.networkDetailsData, $scope.networkDetailsResponseData);
		});
        
        
        $http.get('app/mock/telco/network/deviceClliInfoResponse.json')
		.then(function(res){
			$scope.deviceClliInfoResponseData = res.data;
			processResponseResult($scope.deviceClliInfo, $scope.deviceClliInfoResponseData);
		});
        
        
	}
    
    function processResponseResult(resultData, responseData) {
		resultData.tableDefinition={};
		resultData.loadTrigger = 0;
		resultData.tableDefinition=responseData.tableRows;
		resultData.loadTrigger++;

    }
    

    
}]);