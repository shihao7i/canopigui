angular.module('canopi.app').controller('NewAAFCNLPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
    	initializeScopeVariables();
        
	    setupScopeMethods();

		//populatePicklistValues();
       
      
    
    }  
        
    
    function initializeScopeVariables() {
    
    	   	
    	
        $scope.name = "NewAafCNLPO";   	
        $scope.isChecked=false;
        
        
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
        
       
        clearNewAAFCNLPOScopeVariables();
    }
    
    function setupScopeMethods(){
		
    	 $scope.newAAFCNLPO.dueDate = new Date();

         $scope.open = function($event, selectedDatepicker) {

             $event.preventDefault();
             $event.stopPropagation();

             $scope.datepickers[selectedDatepicker] = true;
         };
    	
    	
    	$scope.clear = function() {		        	
			clearNewAAFCNLPOScopeVariables();
        	
        };
    }
    
    function clearNewAAFCNLPOScopeVariables(){
    	$scope.newAAFCNLPO = {
    			nteCLLI: '',
    			deviceType:'',
    			deviceName:'',
    			customerCode:'',
    			customerName:'',
    			acna:'',
    			
    			device1CLLI:'',
    			device1Type:'',
    			device1Name:'',
    			svid:'',
    			ban:'',
    			ccna:'',
    			optID:'',
    			device2CLLI:'',
    			device2Type:'',
    			device2Name:'',
    			dueDate:'',
    			
    			productType:{},
    			facilityType:{},
    			collectorCircuit:{},
    			siteType:{},
    			numberLink:{},
    			
    			//LINK 1
    			ntePortLink1:'',
    			device1PortLink1:'',
    			nteTransceiverLink1:'',
    			device1TransceiverLink1:'',
    			ATALink1:'',
    			reserveProjLink1:'',
    			systemPrefixLink1:'',
    			systemSuffixLink1:'',
    			pdacLink1:'',
    			subPathLink1:'',
    			coordinationNo1Link1:'',
    			coordinationNo2Link1:'',
    			ATZLink1:'',
    			userLink1:'',
    			divisionRevenueGroupLink1:'',
    			divisionRevenueTypeLink1:'',
    			workGroupLink1:'',
    			DVLink1:'',
    			FMTLink1:'',
    			
    			nteBankLink1:{},
    			device1BankLink1:{},
    			
    			
    			
    			//Link 2
    			ntePortLink2:'',
    			device1PortLink2:'',
    			nteTransceiverLink2:'',
    			device1TransceiverLink2:'',
    			ATALink2:'',
    			reserveProjLink2:'',
    			systemPrefixLink2:'',
    			systemSuffixLink2:'',
    			pdacLink2:'',
    			subPathLink2:'',
    			coordinationNo1Link2:'',
    			coordinationNo2Link2:'',
    			ATZLink2:'',
    			userLink2:'',
    			divisionRevenueGroupLink2:'',
    			divisionRevenueTypeLink2:'',
    			workGroupLink2:'',
    			DVLink2:'',
    			FMTLink2:'',
    			
    			nteBankLink2:{},
    			device1BankLink2:{}   			
    			
    	}
    	$scope.isChecked=false;
    }
    
}]);