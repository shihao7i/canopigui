angular.module('canopi.app').controller( 'ManageGroupsAdminController', [ '$scope', '$log', '$location', '$rootScope', '$state', 'Cache', '$filter', '$http', 'UamJsonService', 
                                       function ( $scope, $log, $location, $rootScope, $state, Cache, $filter, $http, UamJsonService ) {
	'use strict';
		
	init();
		
    function init () {
    	
        setupScopeVariablesAndMethods();
     
        populateManageGroupsData(); 
        
    }
	   
	function setupScopeVariablesAndMethods () {
		
		$scope.name = "ManageGroupsAdmin";
		
		$scope.isLoading = false;
			
		$scope.usingAddGroupModal = false; 
								
	    $scope.groupAffiliateFilter = { filterText: '' };   
	    $scope.addAdminFilter       = { filterText: '' };
	  		   
	    $scope.groupAffiliateSelectedItems     = [];	    
	    $scope.getUserInWorkGroupSelectedItems = [];
	    $scope.addGroupSelectedItems           = [];
	    $scope.modifyGroupSelectedItems        = [];
	    $scope.addAdminSelectedItems 		   = [];	    
	    	    
        // Group Permission List and Permission List Grids "
	    $scope.getGroupPermissionsList = { permissionlist: null };  
	    $scope.listAllPermissions      = null;
	    	    
        $scope.columnDefs = [{ 
        	field       : 'name', 
        	displayName : 'Name',       	
        	cellClass   : 'nowrap'
        }];
        
        $scope.swappingGridOptions = {
	        enableColumnResize : true,
	        enableRowSelection : true,
	        multiSelect        : false
        };
	       
        // ng-grid on the left
        var templateWithTooltip = '<div tooltip="{{row.entity.description}}" tooltip-animation="false" tooltip-append-to-body="true" tooltip-placement="left" >{{row.getProperty(col.field)}}</div>';
        
        $scope.groupAffiliateOptions = {       	
			data               : 'getAllWorkGroups.workGrouplist',
			enableColumnResize : true,			
			multiSelect        : false,
			selectedItems      : $scope.groupAffiliateSelectedItems,
			filterOptions      : $scope.groupAffiliateFilter,
			columnDefs       : [{
				field        : 'name',
				displayName  : 'Group Name',
				cellTemplate : templateWithTooltip,
				cellClass    : 'nowrap',
			}, {
				field        : 'affiliate',
				displayName  : 'Affiliate',
			}],
			afterSelectionChange : function ( row, event ) {				
				clearSelectedItems( $scope.getUserInWorkGroupSelectedItems );
				if ( $scope.groupAffiliateSelectedItems !== null || $scope.groupAffiliateSelectedItems !== undefined ) {
					if ( $scope.groupAffiliateSelectedItems.length > 0 ) {
						var workGroupId = $scope.groupAffiliateSelectedItems[0].id;
						var promise     = UamJsonService.getPermissions( workGroupId );		
						promise.then( function( data ) {
							//$log.debug( "list Group Permissions" + JSON.stringify( data, null, '\t' ) );
							$scope.getGroupPermissionsList = data;
							populatePermissionsListData();
							populateUsersInfoInWorkGroup();
						});						
					}										
				}
			}
        };
               
        // ng-grid under Users tab
        $scope.userOptions = {
            data               : 'usersInWorkGroup.userlist',
            enableColumnResize : true,
			multiSelect        : false,
            selectedItems      : $scope.getUserInWorkGroupSelectedItems,
            columnDefs      : [{
            	field       : 'attUid',
            	displayName : 'User ID'
            }, {
            	field       : 'firstName', 
            	displayName : 'First Name'
            }, {
            	field       : 'lastName', 
            	displayName : 'Last Name'
            }, {
            	field       : 'tn',
            	displayName : 'Telephone'
            }],
            afterSelectionChange : function ( row, event ) {
				if ( $scope.getUserInWorkGroupSelectedItems.length > 0 ) {
					var attUid  = $scope.getUserInWorkGroupSelectedItems[0].attUid;
					var promise = UamJsonService.getUser( attUid );
					promise.then( function( data ) {
						//$log.debug("User Info =>  " + JSON.stringify(data, null, '\t'));						
						$scope.getUserInfo = data;
					});
				} 
			}
        };
        
        // ng-grid under Administrators tab
        $scope.adminDataOptions = {
			data               : 'groupAffiliateOptions.selectedItems[0].administrators',
			enableColumnResize : true,
			columnDefs      : [{
				field       : 'attUid',
				displayName : 'User ID'
			}, {
				field       : 'firstName', 
				displayName : 'First Name'
			}, {
				field       : 'lastName', 
				displayName : 'Last Name'
			}, {
				field       : 'tn', 
				displayName : 'Telephone'
			}]
        };  
        
        // ng-grid in addGroup modal
        $scope.addGroupOptions = {
			data               : 'getLoginUserInfo',
			enableColumnResize : true,
			selectedItems      : $scope.addGroupSelectedItems,
			columnDefs      : [{
				field       : 'attUid', 
				displayName : 'User ID'
			}, {
				field       : 'firstName', 
				displayName : 'First Name'
			}, {
				field       : 'lastName', 
				displayName : 'Last Name'
		    }]
		};      
        
        // ng-grid in modify modal
        $scope.modifyGroupOptions = {
			data               : 'groupAffiliateOptions.selectedItems[0].administrators',
			enableColumnResize : true,
			selectedItems      : $scope.modifyGroupSelectedItems, 
			columnDefs      : [{
				field       : 'attUid',
				displayName : 'User ID'
			}, {
				field       : 'firstName', 
				displayName : 'First Name'
			}, {
				field       : 'lastName', 
				displayName : 'Last Name'
			}]
        };
       
        // ng-grid in addAdmin modal
        $scope.addAdminOptions = {
			data 		       : 'listAllUsersInfo.userlist',
			enableColumnResize : true,
			filterOptions      : $scope.addAdminFilter,
			selectedItems      : $scope.addAdminSelectedItems,
			columnDefs      : [{
				field       : 'attUid', 
				displayName : 'User ID', 
				width       : '23%'
			}, {
				field       : 'firstName', 
				displayName : 'First Name', 
				width       : '35%'
			}, {field       : 'lastName', 
				displayName : 'Last Name', 
				width       : '35%'
			}]
		};
                     			
        // loading data for login user info
        $scope.populateLoginUserInfo = function () {      	
        	$scope.usingAddGroupModal    	    = true;
			$scope.originalLoginUserInfo        = [];
			$scope.saveNewWorkGroup.inputName   = "";
			$scope.saveNewWorkGroup.description = "";
        	populatePicklistValues();
        	var getData = [];
			var promise = UamJsonService.getUser( $rootScope.attUid );
			promise.then( function( data ) {
				//$log.debug("User Info =>  " + JSON.stringify(data, null, '\t') );
				getData.push( data );
				$scope.getLoginUserInfo = getData;			
			});
			angular.copy( $scope.getLoginUserInfo, $scope.originalLoginUserInfo );
        };
        
        $scope.saveNewWorkGroup = function () { 
        	var postObject = marshalNewWorkGroupRequest();
        	if( $scope.duplicateGroupName === false ) {
	            var promise = UamJsonService.addWorkGroup( postObject );               									
	     	    promise.then( function( data ) {    		   
	     	    	$log.debug( "Save New Group => " + JSON.stringify( data, null, '\t') );
	     	    	populateManageGroupsData();
	     	    });
	     	    clearSelectedItems( $scope.addGroupSelectedItems );
        	}
        };
        
        $scope.saveModifiedWorkGroup = function () { 	       	
        	var postObject = marshalModifiedAndRemoveWorkGroupRequest();
            var promise    = UamJsonService.updateWorkGroup( postObject );               					
     	    promise.then( function( data ) {    		   
     	    	//$log.debug( "Modify Work Group => " + JSON.stringify( data, null, '\t' ) ); 
     	    	populateManageGroupsData();
     	    });    	    
     	    clearSelectedItems( $scope.addGroupSelectedItems );
        };
                      
        $scope.populateAllUsersInfo = function () {
        	var promise = UamJsonService.listAllUsers();       					   
     	    promise.then(function( data ) {     		   
     	    	//$log.debug( "List All Users =>  " + JSON.stringify( data, null, '\t' ) );    	     	    	
     	    	$scope.listAllUsersInfo = data;
     	    	clearSelectedItems( $scope.addAdminSelectedItems );
     	    	$scope.originalAdminFilter = {};
     	    	angular.copy( $scope.addAdminFilter, $scope.originalAdminFilter );
     	    });    	    
        };
        
        $scope.deleteWorkGroup = function () {
			var postObject = marshalModifiedAndRemoveWorkGroupRequest();	
			var promise    = UamJsonService.removeWorkGroupFromUAM( postObject );
			$scope.getAllWorkGroups.workGrouplist.splice( $scope.getAllWorkGroups.workGrouplist.indexOf( $scope.groupAffiliateSelectedItems[0] ), 1 );
			promise.then( function( data ) {
				//$log.debug( "delete Work Group => " + JSON.stringify( data, null, '\t') );
				populateManageGroupsData();
			});
		};
			
		$scope.removeUserInWorkGroup = function () {			 	
			var postObject = marshalRemoveUserInWorkGroup();
			$scope.usersInWorkGroup.userlist.splice( $scope.usersInWorkGroup.userlist.indexOf( $scope.getUserInWorkGroupSelectedItems[0] ), 1 );
			var promise = UamJsonService.removerMemberFromGroupFromUAM( postObject );			
			promise.then( function( data ) {	
				//$log.debug( "removerMemberFromGroupFromUAM => " + JSON.stringify( data, null, '\t' ) );								
			});	           
		};
		
		$scope.removePermissionFromGroup = function ( itemsToBeRemoved ) {
			var postObject = {
				workGroup: {			
					name           : $scope.groupAffiliateSelectedItems[0].name,
					profile        : $scope.groupAffiliateSelectedItems[0].profile,
					uid            : $scope.groupAffiliateSelectedItems[0].uid,
					permissions    : $scope.groupAffiliateSelectedItems[0].permissions,
					opertion       : $scope.groupAffiliateSelectedItems[0].opertion,
					id             : $scope.groupAffiliateSelectedItems[0].id, 		       
					description    : $scope.groupAffiliateSelectedItems[0].description,
					authSource     : $scope.groupAffiliateSelectedItems[0].authSource,				
					createdBy      : $scope.groupAffiliateSelectedItems[0].createdBy,
					customerCode   : $scope.groupAffiliateSelectedItems[0].customerCode,
					permissionDTOs : $scope.groupAffiliateSelectedItems[0].permissionDTOs,
					affiliate      : $scope.groupAffiliateSelectedItems[0].affiliate,
					administrators : $scope.groupAffiliateSelectedItems[0].administrators	
				},
					
				permission: {
					name        : itemsToBeRemoved[0].name,
					id          : itemsToBeRemoved[0].id, 		       
					description : itemsToBeRemoved[0].description,					
					createdBy   : itemsToBeRemoved[0].createdBy 
				}																					
		    };    	
			
			var promise = UamJsonService.removePermissionFromGroup( postObject );			
			promise.then( function( data ) {	
				$log.debug( "removePermissionFromGroup => " + JSON.stringify( data, null, '\t' ) );	
			});
			return promise;		
		};
		
		$scope.addPermissionToGroup = function ( itemsToBeAdded ) {
			var postObject = {
				workGroup: {			
					name           : $scope.groupAffiliateSelectedItems[0].name,
					profile        : $scope.groupAffiliateSelectedItems[0].profile,
					uid            : $scope.groupAffiliateSelectedItems[0].uid,
					permissions    : $scope.groupAffiliateSelectedItems[0].permissions,
					opertion       : $scope.groupAffiliateSelectedItems[0].opertion,
					id             : $scope.groupAffiliateSelectedItems[0].id, 		       
					description    : $scope.groupAffiliateSelectedItems[0].description,
					authSource     : $scope.groupAffiliateSelectedItems[0].authSource,				
					createdBy      : $scope.groupAffiliateSelectedItems[0].createdBy,
					customerCode   : $scope.groupAffiliateSelectedItems[0].customerCode,
					permissionDTOs : $scope.groupAffiliateSelectedItems[0].permissionDTOs,
					affiliate      : $scope.groupAffiliateSelectedItems[0].affiliate,
					administrators : $scope.groupAffiliateSelectedItems[0].administrators
				},
				
				permission: {
					name        : itemsToBeAdded[0].name,
					id          : itemsToBeAdded[0].id, 		       
					description : itemsToBeAdded[0].description,					
					createdBy   : itemsToBeAdded[0].createdBy 
				}
		    };    
			var promise = UamJsonService.addPermissionToGroup( postObject );			
			promise.then( function( data ) {	
				$log.debug( "addPermissionToGroup => " + JSON.stringify( data, null, '\t' ) );							
			});	
			return promise;
		};
		
		$scope.addAdminToGroup = function () {			
			if ( $scope.listAllUsersInfo !== undefined || $scope.listAllUsersInfo !== null ) {					
				if ( $scope.usingAddGroupModal === true ) {
					addAdminToWorkGroup( $scope.getLoginUserInfo , $scope.addAdminSelectedItems );
					$scope.addAdminFilter.filterText = $scope.originalAdminFilter.filterText;
				} 
				else {
					addAdminToWorkGroup( $scope.groupAffiliateOptions.selectedItems[0].administrators , $scope.addAdminSelectedItems );
					$scope.addAdminFilter.filterText = $scope.originalAdminFilter.filterText;
				}				
			} 			
		};
				
		$scope.removeAdminFromGroup = function () {
			if ( $scope.usingAddGroupModal === true ) {
				removeAdminsFromGroup( $scope.getLoginUserInfo, $scope.addGroupSelectedItems );
			} 
			else {
				removeAdminsFromGroup( $scope.groupAffiliateOptions.selectedItems[0].administrators,  $scope.modifyGroupSelectedItems );
			}
		};
		
		$scope.clearAddGroupModal = function () {			
			clearSelectedItems( $scope.addGroupSelectedItems );
			clearSelectedItems( $scope.addAdminSelectedItems );
			$scope.getLoginUserInfo           = $scope.originalLoginUserInfo;
			$scope.saveNewWorkGroup.affiliate = $scope.saveNewWorkGroupAffiliateList[0];
			$scope.usingAddGroupModal         = false;
		};
		
		$scope.clearModifiedGroupModal = function () {
			clearSelectedItems( $scope.modifyGroupSelectedItems );
			clearSelectedItems( $scope.addAdminSelectedItems );
			$scope.groupAffiliateOptions.selectedItems[0].name           = $scope.originalAdminData.name;
			$scope.groupAffiliateOptions.selectedItems[0].description    = $scope.originalAdminData.description;
			$scope.groupAffiliateOptions.selectedItems[0].administrators = $scope.originalAdminData.administrators;								
		};
		
		$scope.clearAddAdminModal = function () {
			clearSelectedItems( $scope.addAdminSelectedItems );
			$scope.addAdminFilter.filterText = $scope.originalAdminFilter.filterText;
		};
		
		$scope.setupModifyModal = function () {			
			 $scope.originalAdminData = [];
			 angular.copy( $scope.groupAffiliateOptions.selectedItems[0] , $scope.originalAdminData );
		};
						
		function populateUsersInfoInWorkGroup () {		
			var workGroupId = $scope.groupAffiliateSelectedItems[0].id;					
			var promise     = UamJsonService.getUsersInWorkGroup( workGroupId );
			$scope.isLoading = true;
			$scope.userInfoInWorkGroupPromise = promise.then( function ( data ) {
				//$log.debug( "List usersInWorkGroup => " + JSON.stringify( data, null, '\t' ) );
				$scope.usersInWorkGroup = data;
				$scope.isLoading = false;
		    });
		}
		
		function populatePermissionsListData () { 			
			var promise = UamJsonService.listAllPermissions();				 
	 	    promise.then( function( data ) { 		   
	 	    	//$log.debug( "List All Permissions =>  " + JSON.stringify( data, null, '\t') );
	 	    	$scope.listAllPermissions = data.pList;
		     	if ( $scope.groupAffiliateSelectedItems[0].permissions !== null  ) {
		     		if ( $scope.groupAffiliateSelectedItems[0].affiliate === 'TELCO' ) {
		     			$scope.listAllPermissions = data.affiliateTelcoList;
		     			filterPermissionsListData( $scope.listAllPermissions );
		     		}
		     		else if ( $scope.groupAffiliateSelectedItems[0].affiliate === 'MOBILITY' ) {
		     			$scope.listAllPermissions = data.affiliateMobilityList;
		     			filterPermissionsListData( $scope.listAllPermissions );
		     		}
		     		else  {
		     			$scope.listAllPermissions = data.affiliateAdminList;
		     			filterPermissionsListData( $scope.listAllPermissions );
		     		}	
		     	} 		 	    
	    	});		
		}
			
		function filterPermissionsListData ( ngGridData ) {
			var i, j;
			if ( $scope.getGroupPermissionsList.permissionlist !== null || $scope.getGroupPermissionsList.permissionlist !== undefined ) {
				for ( i = 0; i < $scope.getGroupPermissionsList.permissionlist.length; i ++ ) {
				    for ( j = 0; j < ngGridData.length; j ++ ) {
				        if ( $scope.getGroupPermissionsList.permissionlist[i].name === ngGridData[j].name ) {
				        	ngGridData.splice( j ,1 );
				        }
				    }
				}
			}
		};
	    
		function marshalNewWorkGroupRequest () {
			// for testing only ...
			var postObject = {		
				name           : $scope.saveNewWorkGroup.inputName,
				profile        : $scope.saveNewWorkGroup.profile,
				uid            : $scope.saveNewWorkGroup.uid,
				permissions    : $scope.saveNewWorkGroup.permissions,
				opertion       : $scope.saveNewWorkGroup.opertion,
				id             : $scope.saveNewWorkGroup.id, 		       
				description    : $scope.saveNewWorkGroup.description,
				authSource     : $scope.saveNewWorkGroup.authSource,				
				createdBy      : $scope.saveNewWorkGroup.createdBy,
				customerCode   : $scope.saveNewWorkGroup.customerCode,
				permissionDTOs : $scope.saveNewWorkGroup.permissionDTOs,
				affiliate	   : $scope.saveNewWorkGroup.affiliate.name.toUpperCase(),
				administrators : $scope.getLoginUserInfo 		   
	        };   	
	    	return postObject;       
	    }
	    
	    function marshalModifiedAndRemoveWorkGroupRequest () {
	    	// for testing only ...
	    	var postObject = { 		   
				name           : $scope.groupAffiliateSelectedItems[0].name,
				profile        : $scope.groupAffiliateSelectedItems[0].profile,
				uid            : $scope.groupAffiliateSelectedItems[0].uid,
				permissions    : $scope.groupAffiliateSelectedItems[0].permissions,
				opertion       : $scope.groupAffiliateSelectedItems[0].opertion,
				id             : $scope.groupAffiliateSelectedItems[0].id, 		       
				description    : $scope.groupAffiliateSelectedItems[0].description,
				authSource     : $scope.groupAffiliateSelectedItems[0].authSource,				
				createdBy      : $scope.groupAffiliateSelectedItems[0].createdBy,
				customerCode   : $scope.groupAffiliateSelectedItems[0].customerCode,
				permissionDTOs : $scope.groupAffiliateSelectedItems[0].permissionDTOs,
				affiliate      : $scope.groupAffiliateSelectedItems[0].affiliate,
				administrators : $scope.groupAffiliateSelectedItems[0].administrators		   
	        };	
	    	return postObject;       
	    }
	    
	    function marshalRemoveUserInWorkGroup () {
	    	// for testing only ...
	    	var postObject = {
				attUid         : $scope.getUserInfo.attUid,
				firstName      : $scope.getUserInfo.firstName,
				middleName     : $scope.getUserInfo.middleName,
				lastName       : $scope.getUserInfo.lastName,
				email          : $scope.getUserInfo.email,
				tn             : $scope.getUserInfo.tn,
				id             : $scope.getUserInfo.id,
				createdBy      : $scope.getUserInfo.createdBy,
				manager        : $scope.getUserInfo.manager,
				siloStatus     : $scope.getUserInfo.siloStatus,
				location       : $scope.getUserInfo.location,			
				workGroup      : $scope.groupAffiliateSelectedItems,
				permissions    : $scope.getUserInfo.permissions,
				permissionList : $scope.getUserInfo.permissionList,			
				acnaList       : $scope.getUserInfo.acnaList,
				regionList     : $scope.getUserInfo.regionList,
				enableUniOrt   : $scope.getUserInfo.enableUniOrt,
				enableCnlOrt   : $scope.getUserInfo.enableCnlOrt,
				extUserGroup   : $scope.getUserInfo.extUserGroup,
				adminOfGroup   : $scope.getUserInfo.adminOfGroup,
	    	};
	    	return postObject;
	    } 
		   
		function populatePicklistValues () {	
			$scope.saveNewWorkGroupAffiliateList = [ { name : "" }, { name : "Telco"}, { name : "Mobilty" }, { name : "Admin" } ];			
			$scope.saveNewWorkGroup.affiliate    = $scope.saveNewWorkGroupAffiliateList[0];	
		}
		
		function addAdminToWorkGroup ( ngGridData , ngGridSelectedItems ) {
			var i, j, k;						
			for ( i = ngGridData.length - 1; i >= 0 ; i -- ) {
			    for ( j = 0; j < ngGridSelectedItems.length; j ++ ) {
			        if ( ngGridData[i].attUid === ngGridSelectedItems[j].attUid ) {
			        	ngGridSelectedItems.splice( j ,1 );			        	
			        };
			    };
			}			
			for ( k = 0; k < ngGridSelectedItems.length; k ++ ) {
				ngGridData.push( ngGridSelectedItems[k] );
			}
		}
		   
	    function clearSelectedItems ( ngGridSelectedItems ) {
	    		ngGridSelectedItems.splice( 0 );
	    }
	    	
		function removeAdminsFromGroup ( ngGridData, ngGridSelectedItems ) {
			var i;
			for ( i = 0; i < ngGridSelectedItems.length; i ++ ) {
				ngGridData.splice( ngGridData.indexOf( ngGridSelectedItems[i] ), 1 );
			}
			clearSelectedItems( ngGridSelectedItems );
		}
				
	}//end setupScopeVariablesAndMethods();	
		
	// loading data for all work groups
	function populateManageGroupsData () {
		$scope.isLoading = true;		
        var promise = UamJsonService.listAllWorkGroups();          
 	    $scope.manageGroupsPromise = promise.then( function( data ) {     		   
    	    //$log.debug( "List ALL Work Groups => " + JSON.stringify( data, null, '\t' ) );
 	    	$scope.getAllWorkGroups = data;
 	    	$scope.isLoading        = false; 
 	    });
    }
				
}]);