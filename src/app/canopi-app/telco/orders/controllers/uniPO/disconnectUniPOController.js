angular.module('canopi.app').controller('DisconnectUniPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();
       
      
    
    }  
        
    
    function setupScopeValuesAndMethods() {
    
    	$scope.accordionOpen = {
			    search: true
    	};
    	
    	
        $scope.name = "DisconnectUniPO";   	
        $scope.isChecked=false;  
       
    }
    
    
}]);
