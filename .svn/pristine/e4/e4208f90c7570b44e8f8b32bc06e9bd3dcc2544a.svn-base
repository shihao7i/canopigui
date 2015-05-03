angular.module('canopi.app').controller('NewUniPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
    	initializeScopeVariables();
       
    	setupScopeMethods();
      
		populatePicklistValues();

    }  
        
    
    function initializeScopeVariables() {
    
    	$scope.accordionOpen = {
    			table: true,
			    search: true
    	};
    	
    	
        $scope.name = "NewUniPO";   	
        $scope.isChecked = false;
        
        
//        $scope.isLoading = false;  // set activity indicator to false
//
        $scope.picklistNotReady = true;   // picklist values not loaded yet
        
      //Angular UI Datepicker setup
        $scope.datepickers = {
        		desiredDatepicker:false,
        		appDatepicker:false
        };
        
        
        $scope.dateOptions = {
	            formatYear: 'yy',
	            startingDay: 1
	        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[3];
        
       clearNewUNIPOScopeVariables();
    }
    
    function setupScopeMethods(){    	
    	
//    	$scope.newUniPO=function(){
//    		$scope.isLoading = true;
//    	}
    	
    	
    	$scope.newUniPO.desiredDueDate = new Date();
        $scope.newUniPO.app = new Date();
//        $scope.poSearch.createdStartDate = new Date();
//        $scope.poSearch.createdEndDate = new Date();
//        $scope.poSearch.lastUpdatedStartDate = new Date();
//        $scope.poSearch.lastUpdatedEndDate = new Date();
    	
    	$scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };
    	
    	$scope.clear = function() {

    		clearNewUNIPOScopeVariables();

            setPicklistsToDefaultValues();
        };

    }
    
    function clearNewUNIPOScopeVariables(){
    	
    	$scope.newUniPO={
    			diversityIndicator:{},
    			marketIndicator:{},
    			productType:{},
    			fiberCopper:{},
    			piu:{},
    			portType:{},
    			macAddressLimit:{},
    			emcIndicator:{},
    			portTypeList:{},
    			portConfig:{},
    			exConnSite:{},
    			hasMeetPoint:{},
    			repeater:{},
    			customerCode:'',
    			customerName:'',
    			svid:'',
    			ban:'',
    			acna:'',
    			optID:'',
    			nteCLLI:'',
    			emuxCLLI:'',
    			ipagRouterCLLI:'',
    			diverseIpagCLLI:'',
    			swcCLLI:'',
    			desiredDueDate:'',
    			app:''
    	}
    	
    }
    
function setPicklistsToDefaultValues() {
    	
		// set default picklist selection 
		$scope.newUniPO.diversityIndicator = $scope.uniDiversityIndicatorList[0];
		$scope.newUniPO.marketIndicator = $scope.marketIndicatorList[0];
		$scope.newUniPO.productType = $scope.productTypeList[0];
		$scope.newUniPO.fiberCopper = $scope.uniFiberCopperIndicatorList[0];		
		$scope.newUniPO.piu = $scope.uniPiuList[0];
		$scope.newUniPO.portType = $scope.uniPortTypeOfFrameList[0];
		$scope.newUniPO.macAddressLimit = $scope.uniMacAddressLimitList[0];
		$scope.newUniPO.emcIndicator = $scope.uniEmcIndicatorList[0];
		$scope.newUniPO.portTypeList = $scope.uniPortTypeList[0];
		$scope.newUniPO.portConfig = $scope.uniPortConfigList[0];
		$scope.newUniPO.exConnSite = $scope.uniExcConnSiteList[0];
		$scope.newUniPO.repeater = $scope.uniRepeaterList[0];
		$scope.newUniPO.hasMeetPoint = $scope.uniHasMeetPoint[0];
    }
    
    
	function populatePicklistValues() {

		// picklists for the CANOPI GUI are loaded in app.js
		$rootScope.$watch('picklists', function () {

			//This will fire AFTER this controller has initiated and $state.parms is finally set correctly
			if ($rootScope.picklists !== undefined) {

				$scope.uniDiversityIndicatorList  = $rootScope.picklists.uniDiversityIndicatorList;   
				$scope.marketIndicatorList  = $rootScope.picklists.marketIndicatorList;   
				$scope.productTypeList  = $rootScope.picklists.productTypeList;   
				$scope.uniFiberCopperIndicatorList  = $rootScope.picklists.uniFiberCopperIndicatorList;   
				$scope.uniPiuList  = $rootScope.picklists.uniPiuList;   
				$scope.uniPortTypeOfFrameList  = $rootScope.picklists.uniPortTypeOfFrameList;   
				$scope.uniMacAddressLimitList  = $rootScope.picklists.uniMacAddressLimitList;   
				$scope.uniEmcIndicatorList = $rootScope.picklists.uniEmcIndicatorList;
				$scope.uniPortTypeList= $rootScope.picklists.uniPortTypeList;
				$scope.uniPortConfigList = $rootScope.picklists.uniPortConfigList;
				$scope.uniExcConnSiteList = $rootScope.picklists.uniExcConnSiteList;
				$scope.uniRepeaterList = $rootScope.picklists.uniRepeaterList;
				$scope.uniHasMeetPoint = $rootScope.picklists.uniHasMeetPoint;
				
				$scope.picklistNotReady = false;
				
				setPicklistsToDefaultValues();
			}

		});
	}
    
}]);
