angular.module('canopi.app').controller('NewDeviceSwapController', [
  '$scope',
  '$log',
  '$location',
  '$rootScope',
  '$state',
  'CommonUtilJsonService',
  'OrderSearchJsonService',
  'Cache',
  '$filter',
  function(
    $scope,
    $log,
    $location,
    $rootScope,
    $state,
    CommonUtilJsonService,
    OrderSearchJsonService,
    Cache,
    $filter
  ) {
    'use strict';

    init();

    function init() {
      initializeScopeVariables();

      setupScopeMethods();

      //populatePicklistValues();
    }

    function initializeScopeVariables() {
      $scope.name = 'NewDeviceSwap';
      $scope.isChecked = false;

      //	        $scope.radioList = [ {id: 'radio1', value: 'Regular UNI Site A', isSelected: false},
      //	                             {id: 'radio2', value: 'MPA Shared UNI Site A', isSelected: false}];
      //	    	$scope.radioList2 = [ {id: 'radio1', value: 'Regular UNI Site Z', isSelected: false},
      //		                             {id: 'radio2', value: 'MPA Shared UNI Site Z', isSelected: false}];
      //$scope.isLoading = false;  // set activity indicator to false

      //$scope.picklistNotReady = true;   // picklist values not loaded yet

      clearNewDeviceSwapScopeVariables();
      //	        $scope.tableData = {
      //	        		loadTrigger:0,
      //	        		tableDefinition:{},
      //	        };

      //$scope.tableRecords = 0;

      $scope.resultsets = {
        sourceDevice: {
          searchRequestErrorMsg: null,
          isCriteriaCollapsed: false,
          resultData: { tableDefinition: {} }
        },
        targetDevice: {
          searchRequestErrorMsg: null,
          isCriteriaCollapsed: false,
          resultData: { tableDefinition: {} }
        }
      };

      $scope.resultData = {
        tableRows: {
          rowMetaData: {
            columnList: [
              {
                hyperlink: true,
                id: 'techorderId',
                displayName: 'Service/Facility'
              },
              { hyperlink: false, id: 'suppNo', displayName: 'Port Name' }
            ]
          },

          rowValueList: [
            { cellValues: [''] },
            { cellValues: [''] },
            { cellValues: [''] }
          ]
        }
      };

      $scope.resultData2 = {
        tableRows: {
          rowMetaData: {
            columnList: [
              { hyperlink: true, id: 'techorderId', displayName: 'Port Name' },
              { hyperlink: true, id: 'techorderId', displayName: 'SFP' },
              {
                hyperlink: false,
                id: 'suppNo',
                displayName: 'Service/Facility'
              }
            ]
          },

          rowValueList: [
            { cellValues: [''] },
            { cellValues: [''] },
            { cellValues: [''] }
          ]
        }
      };

      processSearchResult($scope.resultData, 'sourceDevice');
      processSearchResult($scope.resultData2, 'targetDevice');
    }

    function setupScopeMethods() {
      $scope.clear = function() {
        clearNewDeviceSwapScopeVariables();
      };
    }

    function clearNewDeviceSwapScopeVariables() {
      $scope.newDeviceSwap = {
        deviceCLLI: ''
      };
      $scope.isChecked = false;
    }

    function processSearchResult(responseData, tableType) {
      //tableType will either be 'USRP', 'CR' or 'SR'
      var tableData = $scope.resultsets[tableType];
      tableData.resultData.tableDefinition = {};
      tableData.resultData.loadTrigger = 0;
      tableData.resultData.tableDefinition = responseData.tableRows;
      ++tableData.resultData.loadTrigger; //fires off table generation upon digest
    }
  }
]);
