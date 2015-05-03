angular.module('canopi.app').controller('RelatedOrdersSearchController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'LookupSearchJsonService', 'HelperUtilService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, LookupSearchJsonService, HelperUtilService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
    	initializeScopeVariables();
       
    	setupScopeMethods();

		populatePicklistValues();
      
    
    }  
        
    
    function initializeScopeVariables() {
        
        $scope.name = "RelatedOrdersSearch";
        
        $scope.isLoading = false;
        
        $scope.picklistNotReady = true;
        $scope.roResults = [];
        
        /*$scope.resultsets =
        {
				'USRP': { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}},
				'SR'  : { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {}},
				'CR'  : { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {}}
		};
        
       $scope.resultData= { "tableRows": 
       							{"rowMetaData":
       								{ "columnList":[ {"hyperlink":true, 	"id":"techorderId",		"displayName":"Order ID"},
       								                 {"hyperlink":false,	"id":"suppNo",			"displayName":"Order Type"},
       								                 {"hyperlink":false,	"id":"orderType",		"displayName":"Order Action"},
       								                 {"hyperlink":false,	"id":"orderAction",		"displayName":"Create Date"},
       								                 {"hyperlink":false,	"id":"dueDate",			"displayName":"Created by"},
       								                 {"hyperlink":false,	"id":"projOrderID",		"displayName":"Due Date"},
       								                 {"hyperlink":false,	"id":"serviceID",		"displayName":"Service ID"},
       								                 {"hyperlink":false,	"id":"creatopmDate",	"displayName":"Order Status"},
       								                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"Customer Code"},
       								                 {"hyperlink":false,	"id":"orderStatus",		"displayName":"Customer Name"},
       								                 {"hyperlink":false,	"id":"provStatus", 		"displayName":"SVID"},
       								                 {"hyperlink":false, 	"id":"provStatusDate",	"displayName":"BAN"},
       								                 {"hyperlink":false,	"id":"custCode",		"displayName":"ACNA"},
       								                 {"hyperlink":false,	"id":"custName",		"displayName":"RTP Indicator"} ] },


       								                
       							    "rowValueList":[ {"cellValues":["wusrpaf06252a1","Mark Henry","Completed","ac0157","on00008","2014-06-25","2014-06-25","","No","Government"]},
       							                     {"cellValues":["usrpsbit4066110","Delta Airlines","Completed","sb547h","ordnum4066110","2014-06-25","2014-06-25","","No","Government"]},
       							                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]}]},
       							      "errorStaus": "Success",
       							      				"errorMessage":"",
       							      				"errorCode":"0" };*/
     
       
       
       $scope.example1model = []; 
       $scope.example1data = [ {id: 1, label: "UNI"}, {id: 2, label: "EVC"}, {id: 3, label: "CNL"}, {id: 4, label:"DeviceSwap"}, {id:5, label:"ALL"}];
       
     //DateTables setup
       /*$scope.tableData = {
           loadTrigger: 0,
           tableDefinition:{},
       };*/
       
       clearROSearchScopeVariables();
       
    }
    
   
    function setupScopeMethods(){
    	
    	$scope.roLookUp = function(){
    		$scope.isLoading = true;
    		$log.debug($scope.roSearch.forSearchType);
    		var type = $scope.roSearch.forSearchType;
    		//checkLookupType(type);
    		
    		/*var postObject = marshalROSearchRequest();
    		console.log("postObject" +JSON.stringify(postObject, null, '\t'));
            var promise = LookupSearchJsonService.searchUnis(postObject); //For Uni Service selection

     	    promise.then(function(data) {

     	    	$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
     	    	$scope.roResults = data.uniDatalist;*/

  //   	    	$scope.enablePagination = true;
//
  //     	    	$scope.tableRecords = data.pageInfo.totalRecords;
//        	    $scope.totalItems = data.pageInfo.totalRecords/10;
//     	    	$scope.currenRecordsReturned = data.serviceOrderList.length;
//
//                processSearchResult(data);
//
     	    //});
    		
    		//NEW
    		
    		$log.debug(type.name);
    		   if(type.name == "UNI Service"){
    			   $scope.roSearchId = "UNI Circuit ID";
    			   var postObject = marshalROSearchRequest();
    				console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.searchUnis(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {

    	    	    	$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	    	    	
    	    	    	$scope.roResultsResponseData = data;
    	    	    	HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    	    	    	
//    	    	    	$log.debug("RO Results" + JSON.stringify($scope.roResults, null, '\t'));
//    	    	    	$log.debug("Uni data list" + JSON.stringify(data.rowValueList, null, '\t'));
    	    	    	//processSearchResult($scope.resultData, 'USRP');
    	    	    	$scope.isLoading = false;
    	    	    	
    	    	    });
    		   }
    		   else if(type.name == "CNL Facility"){
    			   $scope.roSearchId = "CNL Facility ID";
    			   var postObject = marshalROSearchRequestCNLFacility();
    				console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.facilityIdSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   
    		    	   	$scope.roResultsResponseData = data;
    	   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    	   	    	
    	   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	   	    	//$scope.roResults = data;
    	   	    		$scope.isLoading = false;

    	   	    	});
    		   }
    		   else if(type.name == "EVC Service"){
    			   $scope.roSearchId = "EVC Circuit ID (RO)";
    			   var postObject= marshalROSearchRequestEVCCircuitID();
    			   
    			   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.evcCircuitIdSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   
    		    		$scope.roResultsResponseData = data;
    	   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);

    	   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	   	    	//$scope.roResults = data;
    	   	    		$scope.isLoading = false;

    	   	       });
    		   }
    		   else{
    			   $scope.roSearchId = "Device CLLI";
    			   var postObject= marshalROSearchRequestDeviceClli();
    			   
    			   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.deviceSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   $log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    		    		$scope.roResultsResponseData = data;
    	   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);

    	   	    		$scope.isLoading = false;
    	   	    	//$scope.roResults = data;

    	   	       });
    		   }
    		
    		
    	};
    	
    	$scope.pageChanged = function(){
    		$scope.isLoading = true;
    		$log.debug($scope.roSearch.forSearchType);
    		var type = $scope.roSearch.forSearchType;
    		//checkLookupType(type);
    		
    		/*var postObject = marshalROSearchRequest();
    		console.log("postObject" +JSON.stringify(postObject, null, '\t'));
            var promise = LookupSearchJsonService.searchUnis(postObject); //For Uni Service selection

     	    promise.then(function(data) {

     	    	$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
     	    	$scope.roResults = data.uniDatalist;*/

  //   	    	$scope.enablePagination = true;
//
  //     	    	$scope.tableRecords = data.pageInfo.totalRecords;
//        	    $scope.totalItems = data.pageInfo.totalRecords/10;
//     	    	$scope.currenRecordsReturned = data.serviceOrderList.length;
//
//                processSearchResult(data);
//
     	    //});
    		
    		//NEW
    		
    		$log.debug(type.name);
    		   if(type.name == "UNI Service"){
    			   $scope.roSearchId = "UNI Circuit ID";
    			   var postObject = marshalROSearchRequest();
    				console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.searchUnis(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {

    	    	    	$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	    	    	
    	    	    	$scope.roResultsResponseData = data;
    	    	    	//HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    	    	        processSearchResult($scope.roResults, $scope.roResultsResponseData);
//    	    	    	$log.debug("RO Results" + JSON.stringify($scope.roResults, null, '\t'));
//    	    	    	$log.debug("Uni data list" + JSON.stringify(data.rowValueList, null, '\t'));
    	    	    	//processSearchResult($scope.resultData, 'USRP');
    	    	    	$scope.isLoading = false;
    	    	    	
    	    	    });
    		   }
    		   else if(type.name == "CNL Facility"){
    			   $scope.roSearchId = "CNL Facility ID";
    			   var postObject = marshalROSearchRequestCNLFacility();
    				console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.facilityIdSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   
    		    	   	$scope.roResultsResponseData = data;
    	   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    	   	    	
    	   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	   	    	//$scope.roResults = data;
    	   	    		$scope.isLoading = false;

    	   	    	});
    		   }
    		   else if(type.name == "EVC Service"){
    			   $scope.roSearchId = "EVC Circuit ID (RO)";
    			   var postObject= marshalROSearchRequestEVCCircuitID();
    			   
    			   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.evcCircuitIdSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   
    		    		$scope.roResultsResponseData = data;
    	   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);

    	   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	   	    	//$scope.roResults = data;
    	   	    		$scope.isLoading = false;

    	   	       });
    		   }
    		   else{
    			   $scope.roSearchId = "Device CLLI";
    			   var postObject= marshalROSearchRequestDeviceClli();
    			   
    			   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
    		       var promise = LookupSearchJsonService.deviceSearch(postObject); //For Uni Service selection
    		       
    		       promise.then(function(data) {
    		    	   $log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    		    		$scope.roResultsResponseData = data;
    	   	    		//HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    		    		processSearchResult($scope.roResults, $scope.roResultsResponseData);
    	   	    		$scope.isLoading = false;
    	   	    	//$scope.roResults = data;

    	   	       });
    		   }
    	}
    	
    	$scope.roSearch = function(){
    		$scope.isLoading=true; 
    	};
    	
    	$scope.clear = function() {

    		clearROSearchScopeVariables();

            setPicklistsToDefaultValues();
        };
        
       $scope.displayDropdown =  function (){
    	   

        	var type = $scope.roSearch.forSearchType;
        	if(type.name == 'Device Clli'){
        		$scope.showDropdown = true;
        	}
        	else{
        		$scope.showDropdown = false;
        	}
        	$scope.roSearch.search = '';
        	$scope.roSearch.orderType={};
    		$scope.roSearch.categoryList={};
        	
        };
        
        $scope.rowClick = function(value) {
        	
        	$scope.roSearch.search = value.uniCircuitId;
        	
        };
    }
    
    /*function checkLookupType(type){
       $log.debug(type.name);
	   if(type.name == "UNI Service"){
		   $scope.roSearchId = "UNI Circuit ID";
		   var postObject = marshalROSearchRequest();
			console.log("postObject" +JSON.stringify(postObject, null, '\t'));
	       var promise = LookupSearchJsonService.searchUnis(postObject); //For Uni Service selection
	       
	       promise.then(function(data) {

    	    	$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
    	    	
    	    	$scope.roResultsResponseData = data;
    	    	HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
    	    	$scope.isLoading = false;
    	    	
    	    });
	   }
	   else if(type.name == "CNL Facility"){
		   $scope.roSearchId = "CNL Facility ID";
		   var postObject = marshalROSearchRequestCNLFacility();
			console.log("postObject" +JSON.stringify(postObject, null, '\t'));
	       var promise = LookupSearchJsonService.facilityIdSearch(postObject); //For Uni Service selection
	       
	       promise.then(function(data) {
	    	   
	    	   	$scope.roResultsResponseData = data;
   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);
   	    	
   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
   	    	//$scope.roResults = data;

   	    	});
	   }
	   else if(type.name == "EVC Service"){
		   $scope.roSearchId = "EVC Circuit ID (RO)";
		   var postObject= marshalROSearchRequestEVCCircuitID();
		   
		   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
	       var promise = LookupSearchJsonService.evcCircuitIdSearch(postObject); //For Uni Service selection
	       
	       promise.then(function(data) {
	    	   
	    		$scope.roResultsResponseData = data;
   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);

   	    	//$log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
   	    	//$scope.roResults = data;

   	       });
	   }
	   else{
		   $scope.roSearchId = "Device CLLI";
		   var postObject= marshalROSearchRequestDeviceClli();
		   
		   console.log("postObject" +JSON.stringify(postObject, null, '\t'));
	       var promise = LookupSearchJsonService.deviceSearch(postObject); //For Uni Service selection
	       
	       promise.then(function(data) {
	    	   $log.debug("RO Search Results => " + JSON.stringify(data, null, '\t'));
	    		$scope.roResultsResponseData = data;
   	    		HelperUtilService.processResponseResultForDatatable($scope.roResults, $scope.roResultsResponseData);

   	    	
   	    	//$scope.roResults = data;

   	       });
	   }
	   
    }*/
    
    
    /*function processSearchResult(responseData, tableType) {

		//tableType will either be 'USRP', 'CR' or 'SR'
    	var tableData = $scope.resultsets[tableType];
    	tableData.resultData.tableDefinition={};
    	tableData.resultData.loadTrigger = 0;
			tableData.resultData.tableDefinition = responseData.tableRows;
			++tableData.resultData.loadTrigger;			//fires off table generation upon digest

    }*/
    
    
    function processSearchResult(resultData, responseData) {
		resultData.tableDefinition={};
		//resultData.loadTrigger = 0;
		resultData.tableDefinition=responseData.tableRows;
		++resultData.loadTrigger;
	};
    
      
    
    function clearROSearchScopeVariables(){
    	$scope.roSearch = {
    		forSearchType:{},
    		search:'',
    		orderType:{},
    		categoryList:{},
    		deviceClliOrderTypleList:{},
    		deviceClliOrderCategoryList:{},
    		deviceClliOrderStatusList:{}
    	}
    }
    
    
    function marshalROSearchRequest() {

    	// for testing only ...
    	var postObject = {
    		userDto: $rootScope.user,
    		uniSearchCriteria: {   			
    			uniCircuitID: $scope.roSearch.search
    		} 
        };
    	
    	return postObject;
        
    }
    
    function marshalROSearchRequestCNLFacility(){
    	var postObject = {
        		userDto: $rootScope.user,
        		facilityId: $scope.roSearch.search
        		
        };        	
        return postObject;
    }
    
    function marshalROSearchRequestEVCCircuitID(){
    	var postObject = {
        		userDto: $rootScope.user,
        		evcCircuitSearchDto:{
        			evcCircuitId: $scope.roSearch.search
        		}
        		
        };        	
        return postObject;
    }
    
    function marshalROSearchRequestDeviceClli(){
    	var postObject = {
        		userDto: $rootScope.user,
        		deviceClli: $scope.roSearch.search
        };        	
        return postObject;
    }
    
    
    function setPicklistsToDefaultValues() {
    	
		// set default picklist selection 
    	$scope.roSearch.forSearchType = $scope.roSearchTypeList[0];
		$scope.roSearch.orderType = $scope.roOrderTypeList[0];
		$scope.roSearch.categoryList = $scope.roOrderCategoryList[0];
		$scope.roSearch.deviceClliOrderTypleList = $scope.roDeviceClliOrderTypleList[0];
		$scope.roSearch.deviceClliOrderCategoryList = $scope.roDeviceClliOrderCategoryList[0];
		$scope.roSearch.deviceClliOrderStatusList = $scope.roDeviceClliOrderStatusList[0];
		
    }
    
    
	function populatePicklistValues() {

		// picklists for the CANOPI GUI are loaded in app.js
		$rootScope.$watch('picklists', function () {

			//This will fire AFTER this controller has initiated and $state.parms is finally set correctly
			if ($rootScope.picklists !== undefined) {

				$scope.roSearchTypeList  = $rootScope.picklists.roSearchTypeList;   
				$scope.roOrderTypeList  = $rootScope.picklists.roOrderTypeList;   
				$scope.roOrderCategoryList  = $rootScope.picklists.roOrderCategoryList;   
				$scope.roDeviceClliOrderTypleList = $rootScope.picklists.roDeviceClliOrderTypleList;
				$scope.roDeviceClliOrderCategoryList = $rootScope.picklists.roDeviceClliOrderCategoryList;
				$scope.roDeviceClliOrderStatusList = $rootScope.picklists.roDeviceClliOrderStatusList;
				
				$scope.picklistNotReady = false;
				
				setPicklistsToDefaultValues();
			}

		});
	}
	  
}]);
