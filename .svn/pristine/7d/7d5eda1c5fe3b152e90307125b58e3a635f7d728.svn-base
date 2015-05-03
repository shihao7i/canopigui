angular.module('canopi.app').controller('DisconnectLAGPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'OrderSearchJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, OrderSearchJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {

    	initializeScopeVariables();
    
	    setupScopeMethods();

		//populatePicklistValues();
       
    }
    
	function initializeScopeVariables() {
	    	
	        $scope.name = "DisconnectLagPO";
	        $scope.isChecked = false;
	    	
	    	//$scope.isLoading = false;  // set activity indicator to false
	    	
	    	//$scope.picklistNotReady = true;   // picklist values not loaded yet
	    	 	
	        
	      //Angular UI Datepicker setup
	        $scope.datepickers = {
	            dueDatepicker: false
	        };

	        $scope.dateOptions = {
	            formatYear: 'yy',
	            startingDay: 1
	        };

	        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	        $scope.format = $scope.formats[3];
	        
	        
	        clearDisconnectLAGPOScopeVariables();
	
	        
	        // init value for DataTables
	        
	//    	$scope.tableData = {
	//            loadTrigger: 0,
	//            tableDefinition:{},
	//        };
	//     	   
	//        
	//    	$scope.accordionOpen = {
	//			table: true,
	//		    search: true
	//    	};
	    	
	  
	    }
    
    function setupScopeMethods(){
    	
    	$scope.disconnectLAG.dueDate = new Date();

        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	
    	
		$scope.clear = function() {		        	
			clearDisconnectLAGPOScopeVariables();
        	
        };
    }
    
    function clearDisconnectLAGPOScopeVariables(){
    	$scope.disconnectLAG= {
    			   			
    			dueDate:'',
    			lagName:''
    			
    	}
    	$scope.isChecked = false;
    }
    
}]);