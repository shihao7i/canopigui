angular.module('canopi.app').controller('NewP2PEVCPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'OrderSearchJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, OrderSearchJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {

    	initializeScopeVariables();
    
	    setupScopeMethods();

		//populatePicklistValues();
       
    }
    
	function initializeScopeVariables() {
	    	
	        $scope.name = "NewP2PEVCPO";
	        $scope.isChecked = false;
	        
	        $scope.radioList = [ {id: 'radio1', value: 'Regular UNI Site A', isSelected: false},
	                             {id: 'radio2', value: 'MPA Shared UNI Site A', isSelected: false}];
	    	$scope.radioList2 = [ {id: 'radio1', value: 'Regular UNI Site Z', isSelected: false},
		                             {id: 'radio2', value: 'MPA Shared UNI Site Z', isSelected: false}];
	    	//$scope.isLoading = false;  // set activity indicator to false
	    	
	    	//$scope.picklistNotReady = true;   // picklist values not loaded yet
	    	 	
	        
	    	//Angular UI Datepicker setup
	        $scope.datepickers = {
	        	desiredDatepicker:false,
	            appDatepicker: false,
	            sidDatepicker:false,
	            dueDatepicker:false
	        };

	        $scope.dateOptions = {
	            formatYear: 'yy',
	            startingDay: 1
	        };

	        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	        $scope.format = $scope.formats[3];
	    	
	    	
	    	clearNewP2PEVCPOScopeVariables();   	
	  
	    }
    
    function setupScopeMethods(){
		
    	$scope.newP2PEVC.desiredDueDate = new Date();
    	$scope.newP2PEVC.app = new Date();
    	$scope.newP2PEVC.sid = new Date();
        $scope.newP2PEVC.dueDate = new Date();

        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	
    	
    	$scope.clear = function() {		        	
			clearNewP2PEVCPOScopeVariables();
        	
        };
    }
    
    function clearNewP2PEVCPOScopeVariables(){
    	$scope.newP2PEVC= {
    		marketIndicator:{},
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
    		asrActivity:''
    		
    			
    			
    	}
    	$scope.isChecked = false;
    }
    
}]);