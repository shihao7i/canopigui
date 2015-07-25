angular.module('canopi.app').controller('ServiceSearchController', ['$scope', '$location', '$rootScope', '$state', 'Cache', '$filter', '$http',
                                       function ($scope, $location, $rootScope, $state, Cache, $filter, $http) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();
    
    }  
        
    
    function setupScopeValuesAndMethods() {
    
    	//Set to true to open the accordions by default.
    	$scope.accordionOpen = {
    			    table: true,
    			    search: true
    	};
    	    	  
    	$scope.selected = undefined;
    	$scope.selected2 = undefined;
    	$scope.selected3 = undefined;
    	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    
    	$scope.states2 = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    
    	$scope.states3 = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];    

    	$scope.name = "ServiceSearch";
        
        $scope.resultsets =
		{
				'USRP': { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {tableDefinition:{}}},
				'SR'  : { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {}},
				'CR'  : { searchRequestErrorMsg: null,	isCriteriaCollapsed: false,  resultData: {}}
		};
        
       $scope.resultData= { "tableRows": 
       							{"rowMetaData":
       								{ "columnList":[ {"hyperlink":true, 	"id":"orderId",			"displayName":"Service ID"},
       								                 {"hyperlink":false,	"id":"customrName",		"displayName":"Service Type"},
       								                 {"hyperlink":false,	"id":"status",			"displayName":"Customer Code"},
       								                 {"hyperlink":false,	"id":"lcm",				"displayName":"ATTUID"},
       								                 {"hyperlink":false,	"id":"usoNumber",		"displayName":"SVID"},
       								                 {"hyperlink":false,	"id":"creationDate",	"displayName":"BAN"},
       								                 {"hyperlink":false,	"id":"completionDate",	"displayName":"ACNA"},
       								                 {"hyperlink":false,	"id":"cancellationDate","displayName":"Service Status"},
       								                 {"hyperlink":false,	"id":"InJeopardy",		"displayName":"Market Indicator"},
       								                 {"hyperlink":false,	"id":"strata",			"displayName":"Customer CKT"} ] },
       								                
       							    "rowValueList":[ {"cellValues":["wusrpaf06252a1","Mark Henry","Completed","ac0157","on00008","2014-06-25","2014-06-25","","No","Government"]},
       							                     {"cellValues":["usrpsbit4066110","Delta Airlines","Completed","sb547h","ordnum4066110","2014-06-25","2014-06-25","","No","Government"]},
       							                     {"cellValues":["usrp24002","Duke Nukame","Completed","sk6959","022","2014-07-08","2014-07-08","","No","Government"]}]},
       							      "errorStaus": "Success",
       							      				"errorMessage":"",
       							      				"errorCode":"0" };
     
       processSearchResult($scope.resultData, 'USRP');
       
       
    }
    
   
    function processSearchResult(responseData, tableType) {

		//tableType will either be 'USRP', 'CR' or 'SR'
    	var tableData = $scope.resultsets[tableType];
    	tableData.resultData.tableDefinition={};
    	tableData.resultData.loadTrigger = 0;
			tableData.resultData.tableDefinition = responseData.tableRows;
			++tableData.resultData.loadTrigger;			//fires off table generation upon digest

    }
    
    
}]);
