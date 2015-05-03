angular.module('canopi.app').controller('ManageUsersAdminController', ['$scope', '$log', '$location', '$rootScope', '$state', 'UamJsonService', 'Cache', '$filter', '$http', 'ModalService',
                                                                function ($scope, $log, $location, $rootScope, $state, UamJsonService, Cache, $filter, $http, ModalService) {

	'use strict';

	init();

	function init() {

		setupScopeValuesAndMethods();

		populateUserinfoGriddata();

	}  

	function setupScopeValuesAndMethods() {

		$('#userInformationModal a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});

		$scope.mainTableSelection = [];
		$scope.groupListSelections = [];
		$scope.disabled = true;
		$scope.removeFromListdisabled = true;
		$scope.addUserdisabled = true;
		$scope.toggleSave = true;
		$scope.isLoading = false;

		$scope.userInfoData = {workGroup: null};
		$scope.groupGridData = {workGrouplist: null};

		$scope.filterOptions = {
				filterText: ''
		};

		// User info Grid(main)

		$scope.gridOptions = { 
				data: 'gridData.userlist',

				columnDefs: [
				             {
				            	 field: 'attUid',
				            	 displayName: 'User ID'
				             },
				             {
				            	 field: 'firstName',
				            	 displayName:'First Name'
				             },
				             {
				            	 field: 'lastName',
				            	 displayName: 'Last Name'
				             }],
				             enableColumnResize: true,
				             enableRowSelection: true,
				             multiSelect: false,
				             filterOptions: $scope.filterOptions,
				             selectedItems: $scope.mainTableSelection, 
				             keepLastSelected: false,
				             afterSelectionChange: function() {

				            	 $scope.isLoading = true;

				            	 //Group List grid data
				            	 var promise = UamJsonService.listAllWorkGroups();

				            	 $scope.groupDataPromise = promise.then(function(data){

				            		 $log.debug("List Groups => " + JSON.stringify(data, null, '\t'));	
				            		 $scope.groupGridData = data;

				            		 if ($scope.mainTableSelection.length == 0){

				            			 $scope.disabled = true;
				            			 
				            			 $scope.clearUserinfoForm();
				            		 }
				            		 else if ($scope.mainTableSelection.length > 0) {

				            			 $scope.disabled = false;

				            			 var attUid = $scope.mainTableSelection[0].attUid;

				            			 //User Group List grid data
				            			 var promise = UamJsonService.getUser(attUid);

				            			 promise.then(function(data){
				            				 $log.debug("User Info => " + JSON.stringify(data, null, '\t'));	
				            				 $scope.userInfoData = data;

				            				 var userGroupList = $scope.userInfoData.workGroup;
				            				 var groupList = $scope.groupGridData.workGrouplist;

				            				 if((userGroupList.length > 0) && (groupList.length > 0)){

				            					 for(var i=0; i < userGroupList.length; i++){

				            						 for(var j=0; j < groupList.length; j++){

				            							 if(userGroupList[i].name == groupList[j].name){

				            								 groupList.splice(j, 1);
				            							 }
				            						 }
				            					 }
				            				 }
				            			 });
				            		 }

				            		 $scope.isLoading = false;
				            	 });

				             }	

		};

		//User Group List and Group List Grids

		var templateWithTooltip = '<div class="ngCellText"><a tooltip="{{row.entity.description}}" tooltip-append-to-body="true" tooltip-placement="left" ng-cell-text>{{row.getProperty(col.field)}}</a></div>';


		$scope.columnDefns = [
		                      {
		                    	  field: 'name',
		                    	  displayName: 'Name',
		                    	  cellTemplate: templateWithTooltip,
		                    	  cellClass: 'nowrap',
		                    	  width: "60%"
		                      },
		                      {
		                    	  field: 'affiliate',
		                    	  displayName:'Affiliate',
		                    	  cellClass: 'nowrap',
		                    	  width: "40%"	  
		                      }
		                      ];

		$scope.leftRightgridOptions = {
				enableColumnResize: true,
				enableRowSelection: true,
				multiSelect: true
		};

		// WorkGroups Grid for Add Group Modal

		$scope.groupGridOptions = { 
				data: 'groupGridDatagrpAdd.workGrouplist',
				columnDefs: [
				             {
				            	 field: 'name',
				            	 displayName: 'Group Name',
				            	 width: "70%"
				             },
				             {
				            	 field: 'affiliate',
				            	 displayName:'Affiliate',
				            	 width: "30%"
				             }],
				             enableColumnResize: true,
				             enableRowSelection: true,
				             multiSelect: true,
				             selectedItems: $scope.groupListSelections
		};
	}

	$scope.showerrorDeleteUser = function() {
		ModalService.showModal({
			templateUrl: 'errorDeleteUsermodal.html',
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
		});
	};

	$scope.showsuccess = function() {
		ModalService.showModal({
			templateUrl: 'deleteUserSuccessMsgModal.html',
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
		});
	};

	$scope.showsuccessAddUser = function() {
		ModalService.showModal({
			templateUrl: 'addUserSuccessMsgModal.html',
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
		});
	};

	$scope.showerrorAddUser = function() {
		ModalService.showModal({
			templateUrl: 'existingUserErrorMsgModal.html',
			controller: "ModalController"
		}).then(function(modal) {
			modal.element.modal();
		});
	};

	//User info Grid Data

	function populateUserinfoGriddata() {

		$scope.isLoading = true;

		var promise = UamJsonService.listAllUsers();

		$scope.allUsersPromise = promise.then(function(data){

			$log.debug("List Users => " + JSON.stringify(data, null, '\t'));	
			$scope.gridData = data;

			$scope.isLoading = false;
		});  
	};

	//Add User GroupList Grid Data

	$scope.groupList = function(){

		$scope.isLoading = true;

		document.getElementById("addList").options.length = 0;

		clearSelectedItems($scope.groupListSelections);

		var promise = UamJsonService.listAllWorkGroups();

		$scope.allWorkGroupspromise = promise.then(function(data){
			$log.debug("List Groups => " + JSON.stringify(data, null, '\t'));	
			$scope.groupGridDatagrpAdd = data;

			$scope.isLoading = false;
		});
	};

	// Clear Add User GroupList Grid selected items

	function clearSelectedItems ( ngGridSelectedItems ) {
		ngGridSelectedItems.splice( 0 );
	}

	//User search for Add User Modal	

	$scope.userSearch = function() {

		var attUid = document.getElementById("uid").value;

		$scope.isLoading = true;

		var promise = UamJsonService.getUserFromWebPhone(attUid);

		promise.then(function(data) {
			$log.debug("User Search Info => " + JSON.stringify(data, null, '\t'));	
			$scope.uInfoData = data;

			$scope.isLoading = false;
		});

		$scope.addUserdisabled = false;
	};

	//Add groups to SelectList

	$scope.addToListbox = function() {

		if ($scope.groupListSelections.length > 0) { 

			for(var i=0; i < $scope.groupListSelections.length; i++){

				var x = document.getElementById("addList");

				var option = document.createElement("option");

				option.text = $scope.groupListSelections[i].name;

				x.add(option);
			}
		}  

		$scope.toggleSave = false;

		$scope.removeFromListdisabled = false;

	};	

	//Remove from SelectList  

	$scope.removeFromListbox = function() {

		var x = document.getElementById("addList");

		for(var i=0; i < $scope.groupListSelections.length; i++){

			if($scope.groupListSelections[i].name == x.value){

				$scope.groupListSelections.splice(i, 1);
			}
		}

		x.remove(x.selectedIndex);

		if(document.getElementById("addList").options.length == 0){

			$scope.removeFromListdisabled = true;

			$scope.toggleSave = true;
		}

	};

	$scope.disableButtons = function() {

		$scope.removeFromListdisabled = true;

		$scope.toggleSave = true;

		$scope.addUserdisabled = true;

		clearSelectedItems($scope.groupListSelections);
	};

	//Begin Delete User

	$scope.userDeleteCheck = function() {

		if($scope.userInfoData.workGroup.length == 0){

			$scope.isLoading = true;

			var postObject = marshaluserDeleteCheckRequest();

			var promise = UamJsonService.deleteUser(postObject.attUid);

			promise.then(function(data) {
				$log.debug("User Summary => " + JSON.stringify(data, null, '\t'));
				$scope.deleteUser = data;	

				$scope.isLoading = false;
			});

			angular.forEach($scope.mainTableSelection, function(value, key){

				var gridList = $scope.gridData.userlist;

				for(var i=0; i < gridList.length; i++){

					if(equals(gridList[i],value)){

						gridList.splice(i, 1);
					}
				}

				$scope.mainTableSelection.splice(key, 1);
			});

			$scope.clearUserinfoForm();

			$scope.showsuccess();

			$scope.disabled = true;
		}
		else{

			$scope.showerrorDeleteUser();
		}
	};


	function marshaluserDeleteCheckRequest() {

		var postObject = {
				attUid: $scope.userInfoData
		};

		return postObject;        
	}

	$scope.userDeleteCancel = function() {

		if($scope.userInfoData.workGroup.length != 0){

			$scope.showerrorDeleteUser();
		}
	};

	$scope.clearUserinfoForm = function(){

		$scope.userInfoData = {

				attUid: '',
				firstName: '',
				lastName: '',
				email: '',
				tn: '',
				location: '',
				siloStatus: ''
		};

	};

	//End Delete User	

	//Begin Add User	

	$scope.userAdd = function() {

		$scope.isLoading = true;

		var flag = 1;

		var postObject = marshaluserAddRequest();

		var userIdData = $scope.gridData.userlist;

		for(var i = 0; i < userIdData.length; i++){

			if(userIdData[i].attUid.toLowerCase() == document.getElementById("uid").value){

				flag = 0;
				break;
			}
		}   

		if(flag == 1){ 

			var promise = UamJsonService.addUser(postObject);

			promise.then(function(data) {
				$log.debug("User Summary => " + JSON.stringify(data, null, '\t'));
				$scope.addUser = data;

				populateUserinfoGriddata();

				$scope.isLoading = false;
			});

			document.getElementById("uid").value = '';

			$scope.showsuccessAddUser();

			$scope.clearUsersearchForm();

		}
		else{

			$scope.showerrorAddUser();

		}

	};

	function marshaluserAddRequest() {

		var postObject = {

				attUid: document.getElementById("uid").value.toLowerCase(),

				workGroup: $scope.groupListSelections
		};

		return postObject;        
	}

	$scope.clearUsersearchForm = function(){

		document.getElementById("uid").value = '';

		$scope.uInfoData = {

				firstName: '',
				lastName: '',
				email: '',
				tn: '',
				location: '',
				siloStatus: ''
		};

		document.getElementById("addList").options.length = 0;
		$scope.addUserdisabled = true;
		$scope.removeFromListdisabled = true;
	};

	//End Add User	

	// Remove User from WorkGroup

	$scope.deleteItems = function(itemsToBeRemoved) {

		$scope.isLoading = true;

		var postObject = {

				attUid: $scope.userInfoData.attUid,
				firstName: $scope.userInfoData.firstName,
				middleName: $scope.userInfoData.middleName,
				lastName:$scope.userInfoData.lastName,
				email: $scope.userInfoData.email,
				tn: $scope.userInfoData.tn,
				id: $scope.userInfoData.id,
				workGroup: itemsToBeRemoved,
				permissions: [],
				permissionList: [],
				regionList: []
		};

		var promise = UamJsonService.removerMemberFromGroupFromUAM(postObject);

		promise.then(function(data) {
			$log.debug("Remove Summary => " + JSON.stringify(data, null, '\t'));
			$scope.removerMember = data;	

			$scope.isLoading = false;
		});

		return promise;
	};

	// Add WorkGroup to User

	$scope.addItems = function(itemsToBeAdded) {

		$scope.isLoading = true;

		var postObject = {

				attUid: $scope.userInfoData.attUid,
				firstName: $scope.userInfoData.firstName,
				middleName: $scope.userInfoData.middleName,
				lastName:$scope.userInfoData.lastName,
				email: $scope.userInfoData.email,
				tn: $scope.userInfoData.tn,
				id: $scope.userInfoData.id,
				workGroup: itemsToBeAdded,
				permissions: [],
				permissionList: [],
				regionList: []
		};

		var promise = UamJsonService.addMemberToGroupFromUAM(postObject);

		promise.then(function(data) {
			$log.debug("Add Summary => " + JSON.stringify(data, null, '\t'));
			$scope.addMember = data;	

			$scope.isLoading = false;
		});

		return promise;
	};

	function equals(obj1, obj2){

		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}
}]);