angular.module('canopi.app').controller('EquipmentSearchController', ['$scope', '$location', '$rootScope', '$state', 'InventoryJsonService', 'Cache', '$filter',
                                       function ($scope, $location, $rootScope, $state, InventoryJsonService, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();
       
       populatePicklistValues();
    
    }  
        
    
    function setupScopeValuesAndMethods() {
    	
    	
    	$scope.accordionOpen = {
    			table: false,
			    search: true
    	};
    	
    	$scope.device = [];
    	
    	$scope.validationMessage = '';
    	
    	$scope.tempDevices = [{
    	    name: "TA5000_AAIPAG48UJ2_2312.14_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: false,
    	    lsLagClli: true,
    	    topologyView: false
    	  },{
    	    name: "TA5000_603716415",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSFMD",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: false,
    	    networkDiscovery: true,
    	    lsLagClli: true,
    	    topologyView: true
    	  },{
    	    name: "TA5000_STA9FLMAFA3_111111.11_11",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "HYWRCA11D38",
    	    ipagCluster: "72201",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: false,
    	    lsLagClli: true,
    	    topologyView: false
    	  },{
    	    name: "TA5000_STAGFLMAJKH_000000.00_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "HYWRCA11RTA",
    	    ipagCluster: "72001",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: false,
    	    lsLagClli: false,
    	    topologyView: false
    	  },{
    	    name: "TA5000_DYBHFLMAT02_010001.01_01",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: true,
    	    lsLagClli: true,
    	    topologyView: true
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "IPLSIN01A54",
    	    ipagCluster: "33601",
    	    homingCluster: "33601_h",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: false,
    	    networkDiscovery: false,
    	    lsLagClli: false,
    	    topologyView: false
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "IPLSIN01A03",
    	    ipagCluster: "33601",
    	    homingCluster: "33601_h",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: false,
    	    lsLagClli: true,
    	    topologyView: false
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "STAGFLMAdp7",
    	    ipagCluster: "72101",
    	    homingCluster: "72101_H",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: true,
    	    lsLagClli: true,
    	    topologyView: true
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "STAGFLMAG31",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: true,
    	    lsLagClli: true,
    	    topologyView: true
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: false,
    	    networkDiscovery: true,
    	    lsLagClli: true,
    	    topologyView: false
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: false,
    	    viewDetail: false,
    	    networkDiscovery: false,
    	    lsLagClli: false,
    	    topologyView: true
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: true,
    	    lsLagClli: false,
    	    topologyView: true
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: false,
    	    networkDiscovery: false,
    	    lsLagClli: false,
    	    topologyView: false
    	  },{
    	    name: "TA5000_AAIPAG48YH2_2334.56_00",
    	    type: "ADTRAN 5000 series",
    	    subType: "TA5000",
    	    status: "In Service",
    	    associatedClli: "ATLNGASSH01",
    	    ipagCluster: "",
    	    homingCluster: "",
    	    ptniiName: "",
    	    regionDomain: "In Region",
    	    modify: true,
    	    viewDetail: true,
    	    networkDiscovery: false,
    	    lsLagClli: false,
    	    topologyView: true,
    	  }];
    
    
        $scope.name = "EquipmentSearch";
        
        $scope.equipmentSearch = {
        		deviceType : '',
        		subType: '',
        		status: '',
        		role: '',
        		locationClli: '',
        		clusterType: '',
        		cluster: '',
        		regionDomain: '',
        		lata: '',
        		ptniiName: '',
        		ipAddress: '',
        		uverseBan: ''
        };
        	
    }
    
    
    function populatePicklistValues() {
    	$scope.deviceTypeList = {};
		$scope.subTypeList = {};
		$scope.roleList = {};
		$scope.lataList = {};
		$scope.statusList = {};
		$scope.clusterTypeList = {};
		$scope.regionDomainList = {};
		$scope.uverseBanIsEnabled=false;
    	
		// picklists for the CANOPI GUI are loaded in app.js
		$rootScope.$watch('picklists', function () {

			//This will fire AFTER this controller has initiated and $state.parms is finally set correctly
			if ($rootScope.picklists !== undefined) {
				
				//Start :: Loading 'Device Type' List
				$scope.deviceTypeAndSubtypesList = $rootScope.picklists.deviceTypeAndSubtypesList;
				var tempDeviceTypeList = new Array();
				
				angular.forEach($scope.deviceTypeAndSubtypesList, function(value) {
					angular.forEach(value.deviceTypeSubTypesMap, function(value2, key2) {
						tempDeviceTypeList.push(key2);
					});
				});
				
				$scope.deviceTypeList = tempDeviceTypeList;
				//End :: Loading 'Device Type' List
				
				//Loading 'LATA' dropdown
				$scope.lataList = $rootScope.picklists.lataList;
				
				//Loading 'Status' dropdown from typeName = 'node' in 'metaStatusesList'
				//Please note: Node == Device == Equipment. So we are assigning 'node' type as status for equipment search.
				angular.forEach($rootScope.picklists.metaStatusesList, function(value) {
					if(value.typeName.indexOf('Node') >= 0) {
						$scope.statusList = value.statusNames;
						return;
					}
				});
				
				//Loading 'Cluster Type' dropdown
				$scope.clusterTypeList = $rootScope.picklists.clusterTypeList;
				
				//Loading 'Region Domain' dropdown
				$scope.regionDomainList = $rootScope.picklists.regionDomainList;
				
				
				$scope.picklistNotReady = false;
				
				setPicklistsToDefaultValues();
			}

		});
	}
    
    $scope.updateSubTypeAndRoleList = function() {
    	$scope.subTypeList = {};
		$scope.roleList = {};
    	var tempSubTypeList = new Array();
    	var tempRoleList = new Array();
    	var deviceType = $scope.equipmentSearch.deviceType;
    	
		angular.forEach($scope.deviceTypeAndSubtypesList, function(value) {
			angular.forEach(value.deviceTypeSubTypesMap, function(value2, key2) {
				if(key2.indexOf(deviceType) >= 0) {
					//Loading 'Sub Type' dropdown based on Device Type selection
					$scope.subTypeList = value2;
					$scope.equipmentSearch.subType = $scope.subTypeList[0];
					$scope.showHideUVerseBanField();
					
					//Loading 'Role' dropdown based on Device Type selection
					$scope.roleList = value.roles;
					return;
				}
			});
		});
    };
    
    $scope.showHideUVerseBanField = function() {
    	$scope.equipmentSearch.uverseBan = '';
    	$scope.uverseBanIsEnabled = false;
    	
    	var subType = $scope.equipmentSearch.subType;
    	angular.forEach($rootScope.picklists.uverseBanDeviceSubtypeList, function(value) {
    		if(value.indexOf(subType) >= 0) {
    			$scope.uverseBanIsEnabled = true;
    			return;
    		}
    	});
    	return;
    };
    
    $scope.equipmentSearch = function() {
    	var validationStatus = false; 
    	validationStatus = validateFormFields();
    	
    	if(validationStatus) {
	    	$scope.isLoading = true;  // set activity indicator to false
	    	$scope.accordionOpen.table = true;
	    	$scope.deviceSelected = [];
	    	
	    	var tempDeviceList = new Array();
	    	$scope.devices = [];
	    	$scope.errMsg = '';
	    	
	    	
	    	var postObject = marshalEquipmentSearchRequest();
	    	var promise = InventoryJsonService.searchEquipmentDatas(postObject);
	
	 	    promise.then(function(data) {
	 	    	
	 	    	if(data.returnMessage != null) {
	 	    		$scope.errMsg = data.returnMessage;
	 	    	} else {
		 	    	//console.log("InventoryJsonService.searchEquipmentDatas Response => " + angular.toJson(data));
		 	    	angular.forEach(data.deviceDataList, function(value) {
		 	    		tempDeviceList.push(value);
		 	    	});
		 	    	
		 	    	$scope.devices = tempDeviceList;
		 	    	
		 	    	$scope.deviceSelected = $scope.devices[0];
	 	    	}
	 	    	//$scope.accordionOpen.table = true;
	 	    	$scope.isLoading = false;  // set activity indicator to false
	 	    });
    	}
 	    
    };
    
    $scope.clear = function() {

    	setPicklistsToDefaultValues();
    };
    
    $scope.updateDeviceInfo = function(device) {
    	$scope.deviceSelected = device;
    };
    
    function validateFormFields() {
    	
    	$scope.validationMessage = '';
    	
    	var validationStatus = true;
    	
    	//Validate Location Clli field. This field is required for certain Device Types
    	angular.forEach($rootScope.picklists.locationClliValidationDeviceList, function(value) {
    		if(($scope.equipmentSearch.deviceType != "") && (value.indexOf($scope.equipmentSearch.deviceType) >= 0)) {
    			if($scope.equipmentSearch.locationClli == "") {
    				$scope.validationMessage = "Location/CLLI is required";
    				validationStatus = false;
    				return;
    			}
    		}
    	});
    	
    	return validationStatus;
    }
    
    function marshalEquipmentSearchRequest() {

    	// for testing only ...
    	var postObject = {
    			deviceType:		$scope.equipmentSearch.deviceType,
    			deviceSubType:	$scope.equipmentSearch.subType,
				status:			$scope.equipmentSearch.status,
				role:			$scope.equipmentSearch.role,
				location:		$scope.equipmentSearch.locationClli,
				clusterType:	$scope.equipmentSearch.clusterType.name,
				clusterID:		$scope.equipmentSearch.cluster,
				domainIndicator:$scope.equipmentSearch.regionDomain.name,
				lata:			$scope.equipmentSearch.lata.name,
				ptniiName:		$scope.equipmentSearch.ptniiName,
				ipAddress:		$scope.equipmentSearch.ipAddress,
				regions:		[],
				uverseBan:		$scope.equipmentSearch.uverseBan,
				placement:		''
		};
    	
    	return postObject;
    }
    
    function setPicklistsToDefaultValues() {

    	$scope.subTypeList = {};
		$scope.roleList = {};
    	
    	
    	
		// set default picklist selection 
    	$scope.equipmentSearch.deviceType	= '';
    	$scope.equipmentSearch.subType 		= '';
    	$scope.equipmentSearch.status		= $scope.statusList[0];
    	$scope.equipmentSearch.role			= '';
    	$scope.equipmentSearch.locationClli	= '';
    	$scope.equipmentSearch.clusterType	= $scope.clusterTypeList[0];
    	$scope.equipmentSearch.cluster		= '';
    	$scope.equipmentSearch.regionDomain	= $scope.regionDomainList[1];
    	$scope.equipmentSearch.lata			= $scope.lataList[0];
    	$scope.equipmentSearch.ptniiName	= '';
    	$scope.equipmentSearch.ipAddress	= '';


		
    }

    
}]);
