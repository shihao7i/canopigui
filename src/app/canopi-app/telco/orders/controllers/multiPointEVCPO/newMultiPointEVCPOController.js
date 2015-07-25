angular.module('canopi.app').controller('NewMultiPointEVCPOController', ['$scope', '$log', '$location', '$rootScope', '$state', 'CommonUtilJsonService', 'Cache', '$filter',
                                       function ($scope, $log, $location, $rootScope, $state, CommonUtilJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();
       
      
    
    }  
        
    
    function setupScopeValuesAndMethods() {
    
    	$scope.accordionOpen = {
			    search: true
    	};
    	
    	$scope.selected = undefined;
    	$scope.selected2 = undefined;
    	$scope.selected3 = undefined;
    	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    
    	$scope.states2 = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    
    	$scope.states3 = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    

    	
        $scope.name = "NewMultiPointEVCPO";   
        $scope.isChecked = false;
             
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
       								                 {"hyperlink":false,	"id":"customrName",		"displayName":"Delete"},
       								                 {"hyperlink":false,	"id":"status",			"displayName":"UNI Circuit ID"},
       								                 {"hyperlink":false,	"id":"lcm",				"displayName":"Port Config"},
       								                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"EVC CIR"},
       								                 {"hyperlink":false,	"id":"creationDate",	"displayName":"Distance"},
       								                 {"hyperlink":false,	"id":"completionDate",	"displayName":"BIP(%)"},
       								                 {"hyperlink":false,	"id":"cancellationDate","displayName":"VLAN ID"},
       								                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"EVC MAC Limit"},
       								                 {"hyperlink":false,	"id":"strata",			"displayName":"EVC GOS"},
       								                 {"hyperlink":false,	"id":"custCode", 		"displayName":"ICO UNI Ckt ID"},
       								                 {"hyperlink":false, 	"id":"custName",		"displayName":"ICO EVC Ckt ID"},
       								                 {"hyperlink":false,	"id":"ckr",				"displayName":"ICO SWC CLLI"},
       								                 {"hyperlink":false,	"id":"svid",			"displayName":"ICO Conn. Change"},
       								                 {"hyperlink":false,	"id":"ban",				"displayName":"MIleage Band"},
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
       
       $scope.resultData2= { "tableRows":
			{"rowMetaData":
				{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"Site"},
				                 {"hyperlink":false,	"id":"customrName",		"displayName":"Delete"},
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
				                 {"hyperlink":false,	"id":"ban",				"displayName":"ICO COnn. Charge"},
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
    }
    
   
    function processSearchResult(responseData, tableType) {

    	var tableData = $scope.resultsets[tableType];

        tableData.resultData.tableDefinition={};

        tableData.resultData.loadTrigger = 0;

        tableData.resultData.tableDefinition = responseData.tableRows;

        ++tableData.resultData.loadTrigger;			//fires off table generation upon digest

    }
    
    
    
}]);
