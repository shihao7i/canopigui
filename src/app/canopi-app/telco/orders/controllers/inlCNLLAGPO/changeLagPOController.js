angular.module('canopi.app').controller('ChangeLAGPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'OrderSearchJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, OrderSearchJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {

    	initializeScopeVariables();
    
	    setupScopeMethods();

		//populatePicklistValues();
       
    }
    
	function initializeScopeVariables() {
	    	
	        $scope.name = "ChangeLagPO";
	        $scope.isChecked = false;
	    	
	    	//$scope.isLoading = false;  // set activity indicator to false
	    	
	    	//$scope.picklistNotReady = true;   // picklist values not loaded yet
	    	 	
	        clearChangeLAGPOScopeVariables();
	
	        
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
		$scope.clear = function() {		        	
			clearChangeLAGPOScopeVariables();
        	
        };
    }
    
    function clearChangeLAGPOScopeVariables(){
    	$scope.changeLAG= {
    			   			
    			deviceCLLIA:'',
    			deviceTypeA:'',
    			deviceNameA:'',
    			
    			ptniiNameA:'',
    			lagName:'',
    			lagIDA:'',
    			
    			deviceCLLIZ:'',
    			deviceTypeZ:'',
    			deviceNameZ:'',
    			ptniiNameZ:'',
    			
    			numberINL:{},
    			
    			lagIDZ:'',
    			dueDate:'',
    			
    			facilityType:{},    			
    			collectorCircuit:{},
    			
    			//Link1
    			portALink1:'',
    			portZLink1:'',
    			bankALink1:'',
    			bankZLink1:'',
    			transceiverALink1:'',
    			transceiverZLink1:'',
    			ATALink1:'',
    			reserveProjectLink1:'',
    			systemPrefixLink1:'',
    			systemSuffixLink1:'',
    			pdacLink1:'',
    			subPathLink1:'',
    			coordinationNo1Link1:'',
    			coordinationNo2Link1:'',
    			userLink1:'',
    			divisionRevenueGroupLink1:'',
    			divisionRevenueTypeLink1:'',
    			workGroupLink1:'',
    			dvLink1:'',
    			fmtLink1:''    			
    			
    			//Link2
//				portALink2:'',
//    			portZLink2:'',
//    			bankALink2:''	
    			
    	}
    	$scope.isChecked = false;
    }
    
}]);