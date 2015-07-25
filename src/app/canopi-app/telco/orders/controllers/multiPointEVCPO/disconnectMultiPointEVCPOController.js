angular.module('canopi.app').controller('DisconnectMultiPointEVCPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter', 'MessagesService',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter, MessagesService) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       //setupScopeValuesAndMethods();
    	initializeScopeVariables();
    	setupScopeMethods();
      
    
    }  
        
    function initializeScopeVariables(){
    	 $scope.name = "DisconnectMultiPointEVCPO"; 
    	 $scope.accordionOpen = {
 			    search: true
     	};
     	
     	
        
         $scope.isChecked = false;
              
        
    
      //Angular UI Datepicker setup
        $scope.datepickers = {
            desiredDatepicker: false,
            committedDatepicker:false
        };
        
        $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: "false"
            };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[3];
        
        clearDisconnectMultiPointEVCPOScopeVariables();
    
    }
    
    function setupScopeMethods() {
    
    	 $scope.resultsets =
         {
 				'UNIBasedEVC': { 
 					searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}
 				},
 				'MPASharedUNI'  : {
 					searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}
 				}
 		};

        $scope.resultData= { "tableRows":
        							{"rowMetaData":
        								{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"UNI Circuit ID"},
        								                 {"hyperlink":false,	"id":"customrName",		"displayName":"Port Config"},
        								                 {"hyperlink":false,	"id":"status",			"displayName":"VLAN ID"},
        								                 {"hyperlink":false,	"id":"lcm",				"displayName":"EVC CIR"},
        								                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"COS Category, Package"},
        								                 {"hyperlink":false,	"id":"creationDate",	"displayName":"Product"},
        								                 {"hyperlink":false,	"id":"completionDate",	"displayName":"EVC GOS"},
        								                 {"hyperlink":false,	"id":"cancellationDate","displayName":"Ingress Profile"},
        								                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"Egress Profile"},
        								                 {"hyperlink":false,	"id":"strata",			"displayName":"MAC Address Limit"} ] },
        								      
        							    "rowValueList":[ {"cellValues":["wusrpaf06252a1","Mark Henry","Completed","ac0157","on00008","2014-06-25","2014-06-25","","No","Government"]},
        							                     {"cellValues":["usrpsbit4066110","Delta Airlines","Completed","sb547h","ordnum4066110","2014-06-25","2014-06-25","","No","Government"]},
        							                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
                                                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]}]},
        							      "errorStaus": "Success",
        							      				"errorMessage":"",
        							      				"errorCode":"0" };
        
        $scope.resultData2= { "tableRows":
 			{"rowMetaData":
 				{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"MPA Shared UNI Facility ID"},
 					                 {"hyperlink":false,	"id":"customrName",		"displayName":"Port Config"},
 					                 {"hyperlink":false,	"id":"status",			"displayName":"VLAN ID"},
 					                 {"hyperlink":false,	"id":"lcm",				"displayName":"EVC CIR"},
 					                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"MAC Limit"},
 					                 {"hyperlink":false,	"id":"creationDate",	"displayName":"EVC GOS"},
 					                 {"hyperlink":false,	"id":"completionDate",	"displayName":"ICO UNI Circuit ID"},
 					                 {"hyperlink":false,	"id":"cancellationDate","displayName":"ICO EVC Circuit ID"},
 					                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"ICO SWC CLLI"},
 					                 {"hyperlink":false,	"id":"strata",			"displayName":"MIleage Band"},
 					                 {"hyperlink":false,	"id":"custCode", 		"displayName":"ICO Connection Charge"} ] },

 			    "rowValueList":[ {"cellValues":["wusrpaf06252a1","Mark Henry","Completed","ac0157","on00008","2014-06-25","2014-06-25","","No","Government"]},
 			                     {"cellValues":["usrpsbit4066110","Delta Airlines","Completed","sb547h","ordnum4066110","2014-06-25","2014-06-25","","No","Government"]},
 			                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]},
 		                           {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]}]},
 			      "errorStaus": "Success",
 			      				"errorMessage":"",
 			      				"errorCode":"0" };

     
       processSearchResult($scope.resultData, 'UNIBasedEVC');
       processSearchResult($scope.resultData2, 'MPASharedUNI');

        //Called from the results table when the user clicked on a cell that needs an external controller
        //action.
        //eventId indicates the event being fired
        //data is an object containing event specific properties
        $scope.gridEventHandler = function(eventId, data)
        {
            console.log("gridEventHandler: eventId=" + eventId + ", data=" + angular.toJson(data));

        };
        
        $scope.disconnectMultiPointEVCPO.desiredDueDate = '';
        $scope.disconnectMultiPointEVCPO.committedDueDate = '';
        
        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };

        $scope.clear = function() {

        	clearDisconnectMultiPointEVCPOScopeVariables();

            //setPicklistsToDefaultValues();
        };
        
        
    }
    
   
    function processSearchResult(responseData, tableType) {

		//tableType will either be 'USRP', 'CR' or 'SR'
    	var tableData = $scope.resultsets[tableType];

        tableData.resultData.tableDefinition={};

        tableData.resultData.loadTrigger = 0;

        tableData.resultData.tableDefinition = responseData.tableRows;

        ++tableData.resultData.loadTrigger;			//fires off table generation upon digest

    }
    
    function clearDisconnectMultiPointEVCPOScopeVariables(){
    	$scope.disconnectMultiPointEVCPO = {
    			desiredDueDate:'',
    			committedDueDate:''
    	}
    }
    
    
}]);
