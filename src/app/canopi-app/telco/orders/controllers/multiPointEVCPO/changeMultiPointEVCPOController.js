angular.module('canopi.app').controller('ChangeMultiPointEVCPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       //setupScopeValuesAndMethods();
       initializeScopeVariables();
       setupScopeMethods();
      
    
    }  
        
    
     function initializeScopeVariables(){
    	 $scope.name = "ChangeMultiPointEVCPO";   
         //$scope.isChecked = false;     	
     	
     	//Angular UI Datepicker setup
        $scope.datepickers = {
            desiredDatepicker: false,
            appDatepicker: false,
            sidDatepicker: false,
            dueDateDatepicker: false,
//            lastUpdatedStartDateDatepicker: false,
//            lastUpdatedEndDateDatepicker: false
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
    	
    	    
        clearChangeMultiPointEVCPOScopeVariables();
     	
     }
    
    
    function setupScopeMethods() {
    
    	            
        $scope.resultsets =
        {
				'RegularUNI': { 
					searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}
				},
				'MPASharedUNI'  : {
					searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}
				}
		};

       $scope.resultData= { "tableRows":
       							{"rowMetaData":
	       							{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"Site"},
	   								                 {"hyperlink":false,	"id":"customrName",		"displayName":"Activity"},
	   								                 {"hyperlink":false,	"id":"status",			"displayName":"UNI Circuit ID"},
	   								                 {"hyperlink":false,	"id":"lcm",				"displayName":"Port Config"},
	   								                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"VLAN ID"},
	   								                 {"hyperlink":false,	"id":"creationDate",	"displayName":"EVC CIR"},
	   								                 {"hyperlink":false,	"id":"completionDate",	"displayName":"B/M-IND"},
	   								                 {"hyperlink":false,	"id":"cancellationDate","displayName":"B/M-BAND"},
	   								                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"EVC MAC Limit"},
	   								                 {"hyperlink":false,	"id":"strata",			"displayName":"COS Category, Package"},
	   								                 {"hyperlink":false,	"id":"custCode", 		"displayName":"Product"},
	   								                 {"hyperlink":false, 	"id":"custName",		"displayName":"U-Verse Ban"},
	   								                 {"hyperlink":false,	"id":"ckr",				"displayName":"EVC GOS"},
	   								                 {"hyperlink":false,	"id":"svid",			"displayName":"Ingress Profile"},
	   								                 {"hyperlink":false,	"id":"ban",				"displayName":"Egress Profile"},
	   								                 {"hyperlink":false,	"id":"ban",				"displayName":"IPAG CLLI"},
	   								                 {"hyperlink":false,	"id":"rtp",				"displayName":"Diverse IPAG CLLI"} ] },
       								      
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
				{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"Site"},
				                 {"hyperlink":false,	"id":"customrName",		"displayName":"Activity"},
				                 {"hyperlink":false,	"id":"status",			"displayName":"Shared UNI Facility ID"},
				                 {"hyperlink":false,	"id":"lcm",				"displayName":"Port Config"},
				                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"VLAN ID"},
				                 {"hyperlink":false,	"id":"creationDate",	"displayName":"EVC CIR"},
				                 {"hyperlink":false,	"id":"completionDate",	"displayName":"Distance"},
				                 {"hyperlink":false,	"id":"cancellationDate","displayName":"BIP(%)"},
				                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"EVC MAC Limit"},
				                 {"hyperlink":false,	"id":"strata",			"displayName":"EVC GOS"},
				                 {"hyperlink":false,	"id":"custCode", 		"displayName":"ICO UNI Ckt ID"},
				                 {"hyperlink":false, 	"id":"custName",		"displayName":"ICO EVC Ckt ID"},
				                 {"hyperlink":false,	"id":"ckr",				"displayName":"ICO SWC CLLI"},
				                 {"hyperlink":false,	"id":"svid",			"displayName":"Mileage Band"},
				                 {"hyperlink":false,	"id":"ban",				"displayName":"ICO Conn. Charge"},
				                 {"hyperlink":false,	"id":"rtp",				"displayName":"IPAG CLLI"} ] },

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

     
       processSearchResult($scope.resultData, 'RegularUNI');
       processSearchResult($scope.resultData2, 'MPASharedUNI');

        //Called from the results table when the user clicked on a cell that needs an external controller
        //action.
        //eventId indicates the event being fired
        //data is an object containing event specific properties
        $scope.gridEventHandler = function(eventId, data)
        {
            console.log("gridEventHandler: eventId=" + eventId + ", data=" + angular.toJson(data));

        };
        
        $scope.changeMultiPointEVCPO.desiredDueDate = '';
        $scope.changeMultiPointEVCPO.app = '';
        $scope.changeMultiPointEVCPO.sid = '';
        $scope.changeMultiPointEVCPO.dueDate = '';


        $scope.open = function($event, selectedDatepicker) {

            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepickers[selectedDatepicker] = true;
        };

        $scope.clear = function() {

        	clearChangeMultiPointEVCPOScopeVariables();

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
    
    
    function clearChangeMultiPointEVCPOScopeVariables(){
    	$scope.changeMultiPointEVCPO = {
    		desiredDueDate:'',
    		app:'',
    		sid:'',
    		dueDate:''
    	}
    }
    
    
}]);
