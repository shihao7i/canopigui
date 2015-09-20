angular.module('canopi.app').controller('NewINLCNLLAGPOController', [
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
      $scope.name = 'NewInlCNLLAGPO';
      $scope.isChecked = false;

      //$scope.isLoading = false;  // set activity indicator to false

      //$scope.picklistNotReady = true;   // picklist values not loaded yet

      //Angular UI Datepicker setup
      $scope.datepickers = {
        dueDatepicker: false
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = [
        'dd-MMMM-yyyy',
        'yyyy/MM/dd',
        'dd.MM.yyyy',
        'shortDate'
      ];
      $scope.format = $scope.formats[3];

      clearINLCNLLAGPOScopeVariables();

      // init value for DataTables

      //    	$scope.tableData = {
      //            loadTrigger: 0,
      //            tableDefinition:{},
      //        };
      //
      //
      //    	$scope.accordionOpen = {
      //			table: true,
      //		    search: true
      //    	};
    }

    function setupScopeMethods() {
      //Called from the results table when the user clicked on a cell that needs an external controller
      //action.
      //eventId indicates the event being fired
      //data is an object containing event specific properties
      //        $scope.gridEventHandler = function(eventId, data)
      //        {
      //             $log.debug("gridEventHandler: eventId=" + eventId + ", data=" + angular.toJson(data));
      //
      //        };

      $scope.newINLCNLLAGPO = function() {
        //$scope.isLoading = true;  // set activity indicator to false
        //var currentPageNumber = 0;
        //var postObject = marshalPOSearchRequest(currentPageNumber);
        // promise = OrderSearchJsonService.getProjectOrderSummary(postObject);
        //     	    promise.then(function(data) {
        //
        //     	    	$log.debug("PO Summary => " + JSON.stringify(data, null, '\t'));
        //
        //                processSearchResult(data);
        //
        //                $scope.isLoading = false;  // set activity indicator to false
        //     	    });
      };

      $scope.newINLCNLLAGPO.dueDate = new Date();

      $scope.open = function($event, selectedDatepicker) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepickers[selectedDatepicker] = true;
      };

      $scope.clear = function() {
        clearINLCNLLAGPOScopeVariables();

        //setPicklistsToDefaultValues();
      };
    }

    function clearINLCNLLAGPOScopeVariables() {
      $scope.newINLCNLLAGPO = {
        deviceCLLIA: '',
        deviceNameA: '',
        ptniiNameA: '',
        lagIDA: '',
        deviceCLLIZ: '',
        deviceTypeZ: '',
        deviceNameZ: '',
        ptniiNameZ: '',

        lagIDZ: '',
        dueDate: '',

        facilityType: {},
        collectorCircuit: {},
        numberINL: {},

        //Link1
        portALink1: '',
        portZLink1: '',
        bankALink1: '',
        bankZLink1: '',
        transceiverALink1: '',
        transceiverZLink1: '',
        ATALink1: '',
        reserveProjectLink1: '',
        systemPrefixLink1: '',
        systemSuffixLink1: '',
        pdacLink1: '',
        subPathLink1: '',
        coordinationNo1Link1: '',
        coordinationNo2Link1: '',
        userLink1: '',
        divisionRevenueGroupLink1: '',
        divisionRevenueTypeLink1: '',
        workGroupLink1: '',
        dvLink1: '',
        fmtLink1: ''
      };
      $scope.isChecked = false;
    }
  }
]);
