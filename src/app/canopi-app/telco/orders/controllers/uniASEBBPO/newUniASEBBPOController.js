angular.module('canopi.app').controller('NewUniASEBBPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
    
 	   initializeScopeVariables();
       setupScopeMethods();
       //populatePicklistValues();
      
    
    }
    
    
    function initializeScopeVariables(){
    	$scope.name = "NewUniASEBBPO";   
    	
    	//Angular UI Datepicker setup
        $scope.datepickers = {
            desiredDatepicker: false,
            dueEndDateDatepicker: false,
            createdStartDateDatepicker: false,
            createdEndDateDatepicker: false,
            lastUpdatedStartDateDatepicker: false,
            lastUpdatedEndDateDatepicker: false
        };
        
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: "false"
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[3];
        
        $scope.accordionOpen = {
			    search: true
    	};
    	
        clearNewUNIASEBBPOScopeVariables();
    }
        
    
    function setupScopeMethods() {
    
    	$scope.newUNIASEBBPO.desiredDueDate = '';
        $scope.newUNIASEBBPO.dueEndDate = '';
        $scope.newUNIASEBBPO.createdStartDate = '';
        $scope.newUNIASEBBPO.createdEndDate = '';
        $scope.newUNIASEBBPO.lastUpdatedStartDate = '';
        $scope.newUNIASEBBPO.lastUpdatedEndDate = '';

        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	
    	 $scope.clear = function() {

            clearNewUNIASEBBPOScopeVariables();

            //setPicklistsToDefaultValues();
        };
        	
             
       
    }
    
    function clearNewUNIASEBBPOScopeVariables(){
    	$scope.newUNIASEBBPO={
    			desiredDueDate:''
    	};
    }
    
    
}]);
