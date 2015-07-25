angular.module('canopi.app').controller('DisconnectP2PEVCPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'OrderSearchJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, OrderSearchJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {

    	initializeScopeVariables();
    
	    setupScopeMethods();

		//populatePicklistValues();
       
    }
    
	function initializeScopeVariables() {
	    	
	        $scope.name = "DisconnectP2PEVCPO";
	        //$scope.isChecked = false;
	        
	    	//$scope.isLoading = false;  // set activity indicator to false
	    	
	    	//$scope.picklistNotReady = true;   // picklist values not loaded yet
	    	
	      //Angular UI Datepicker setup
	        $scope.datepickers = {
	        	desiredDatepicker:false,
	            committedDatepicker: false
	        };

	        $scope.dateOptions = {
	            formatYear: 'yy',
	            startingDay: 1
	        };

	        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	        $scope.format = $scope.formats[3];
	        
	        clearDisconnectP2PEVCPOScopeVariables();   	
	  
	    }
    
    function setupScopeMethods(){
		
    	$scope.disconnectP2PEVC.desiredDueDate = new Date();
    	$scope.disconnectP2PEVC.committedDueDate = new Date();

        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	
    	$scope.clear = function() {		        	
			clearDisconnectP2PEVCPOScopeVariables();
        	
        };
    }
    
    function clearDisconnectP2PEVCPOScopeVariables(){
    	$scope.disconnectP2PEVC= {
    		/*marketIndicator:{},
    		productType:{},
    		evcFrame:{},
    		scp:{},
    		
    		customerName:'',
    		evcCircuitID:'',
    		customerCircuitReference:'',
    		optID:'',
    		ban:'',
    		acna:'',
    		reserveProject:'',
    		desiredDueDate:'',
    		ccna:'',
    		evcNcCode:'',
    		originatingService:'',
    		usoNumber:'',
    		
    		app:'',
    		sid:'',
    		dueDate:'',
    		asrNumber:'',
    		asrPonVersion:'',
    		reqType:'',
    		asrItemID:'',
    		asrSuppType:'',
    		asrICSC:'',
    		asrType:'',
    		asrPon:'',
    		asrActivity:''*/
    		desiredDueDate:'',
    		committedDueDate:''
    			
    	}
    }
    
}]);