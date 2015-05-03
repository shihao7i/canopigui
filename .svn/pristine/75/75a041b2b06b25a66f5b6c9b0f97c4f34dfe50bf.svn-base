angular.module('canopi.app').controller('DisconnectINLCNLPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'OrderSearchJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, OrderSearchJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {

    	initializeScopeVariables();
    
	    setupScopeMethods();

		//populatePicklistValues();
       
    }
    
	function initializeScopeVariables() {
	    	
	        $scope.name = "DisconnectInlCNLPO";
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
	        
	        clearDisconnectINLCNLScopeVariables();
	
	        
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
		
    	$scope.disconnectINLCNL.dueDate = new Date();

        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	    	
    	
    	$scope.clear = function() {		        	
			clearDisconnectINLCNLScopeVariables();
        	
        };
    }
    
    function clearDisconnectINLCNLScopeVariables(){
    	$scope.disconnectINLCNL = {
    			
    			ortOrder:false,
    			
    			facilityId:'',
    			diversityIndicator:'',
    			relatedFacilityId:'',
    			
    			customerCode:'',
    			customerName:'',
    			svid:'',
    			ban:'',
    			dueDate:'',
    			optId:'',
    			ccna:'',
    			acna:''
    			
    			
    	}
    	$scope.isChecked = false;
    }
    
}]);