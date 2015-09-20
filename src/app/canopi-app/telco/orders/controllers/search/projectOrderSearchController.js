angular.module('canopi.app').controller('ProjectOrderSearchController', [
  '$log',
  '$location',
  '$rootScope',
  '$state',
  'CommonUtilJsonService',
  'OrderSearchJsonService',
  'Cache',
  '$filter',
  '$timeout',
  function(
    $log,
    $location,
    $rootScope,
    $state,
    CommonUtilJsonService,
    OrderSearchJsonService,
    Cache,
    $filter,
    $timeout
  ) {
    'use strict';

    var vm = this;

    init();

    function init() {
      initializeVMVariables();

      setupVMMethods();

      populatePicklistValues();
    }

    function initializeVMVariables() {
      vm.name = 'ProjectOrderSearch';

      vm.isLoading = false; // set activity indicator to false

      vm.picklistNotReady = true; // picklist values not loaded yet

      vm.displayDataTables = false;

      //Angular UI Datepicker setup
      vm.datepickers = {
        dueStartDateDatepicker: false,
        dueEndDateDatepicker: false,
        createdStartDateDatepicker: false,
        createdEndDateDatepicker: false,
        lastUpdatedStartDateDatepicker: false,
        lastUpdatedEndDateDatepicker: false
      };

      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        showWeeks: 'false'
      };

      vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      vm.format = vm.formats[3];

      //Angular UI Pagination setup
      vm.maxSize = 5;
      vm.transclude = { bigCurrentPage: 0 };
      vm.enablePagination = false;

      //DateTables setup
      vm.tableData = {
        loadTrigger: 0,
        tableDefinition: {}
      };

      vm.tableRecords = 0;

      vm.accordionOpen = {
        search: true,
        table: false
      };

      //TESTING CONTROLLERAS
      vm.poOrderTypeList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];
      vm.poOrderActionList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];
      vm.poOrderStatusList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];
      vm.decompModeList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];
      vm.poRTPIndicatorList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];
      vm.poComplexMACDList = [
        { name: '' },
        { name: 'Rework Code' },
        { name: 'Carrier Nam' },
        { name: 'Backhual Product' },
        { name: 'Special Applications' }
      ];

      clearPOSearchVMVariables();
    }

    function setupVMMethods() {
      // Called from the results table when the user clicked on a cell that needs an external controller action.
      // eventId indicates the event being fired
      // data is an object containing event specific properties
      vm.gridEventHandler = function(eventId, data) {
        $log.debug(
          'gridEventHandler: eventId=' +
            eventId +
            ', data=' +
            angular.toJson(data)
        );
      };

      vm.poSearch = function() {
        vm.isLoading = true; // set activity indicator to false
        vm.accordionOpen.table = true; // open table accordion to show loading message

        var currentPage = vm.transclude.currentPage - 1;
        console.log(currentPage);
        //currentPage will be NaN if its not an event coming from pagination, such as click Prev or Next
        if (isNaN(currentPage)) {
          currentPage = 0;
        }

        var postObject = marshalPOSearchRequest(currentPage);
        var promise = OrderSearchJsonService.getProjectOrderSummary(postObject);

        vm.projectOrderTablePromise = promise.then(function(data) {
          $log.debug('PO Summary => ' + JSON.stringify(data, null, '\t'));

          vm.enablePagination = true;

          vm.tableRecords = data.pageInfo.totalRecords;
          vm.totalItems = data.pageInfo.totalRecords / 10;
          vm.currenRecordsReturned = data.serviceOrderList.length;

          processSearchResult(data);
          vm.displayDataTables = true;

          vm.isLoading = false; // set activity indicator to false
        });
      };

      vm.poSearch.dueStartDate = '';
      vm.poSearch.dueEndDate = '';
      vm.poSearch.createdStartDate = '';
      vm.poSearch.createdEndDate = '';
      vm.poSearch.lastUpdatedStartDate = '';
      vm.poSearch.lastUpdatedEndDate = '';

      vm.open = function($event, selectedDatepicker) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.datepickers[selectedDatepicker] = true;
      };

      vm.clear = function() {
        clearPOSearchVMVariables();

        setPicklistsToDefaultValues();
      };
    }

    function clearPOSearchVMVariables() {
      vm.poSearch = {
        projectOrderId: '',
        externalOrderId: '',
        icsc: '',
        serviceOrderNumber: '',
        currentStep: '',
        customerCircuitReference: '',
        serviceId: '',
        usoNumber: '',

        customerName: '',
        customerCode: '',
        svid: '',
        ban: '',
        acna: '',
        lagId: '',
        nteClli: '',

        dueStartDate: '',
        dueEndDate: '',
        createdStartDate: '',
        createdEndDate: '',
        lastUpdatedStartDate: '',
        lastUpdatedEndDate: '',

        createdBy: '',
        lastUpdatedBy: '',
        telcoCircuitId: '',

        orderType: {},
        orderAction: {},
        orderStatus: {},
        decompMode: {},
        rtpIndicator: {},
        complexMacd: {}
      };
    }

    function marshalPOSearchRequest(currentPageNumber) {
      // for testing only ...
      var postObject = {
        orderType: vm.poSearch.orderType.name,
        orderAction: vm.poSearch.orderAction.name,
        orderStatus: vm.poSearch.orderStatus.name,
        pageInfo: {
          currentPage: currentPageNumber.toString(),
          itemsPerPage: '100'
        },
        externalOrderId: vm.poSearch.externalOrderId,
        uso: vm.poSearch.usoNumber,
        decompMode: vm.poSearch.decompMode.name,
        currentStep: vm.poSearch.currentStep,
        icsc: vm.poSearch.icsc,
        projectOrderId: vm.poSearch.projectOrderId,
        serviceId: vm.poSearch.serviceId,
        customerName: vm.poSearch.customerName,
        projectCustomerCode: vm.poSearch.customerCode,
        ban: vm.poSearch.ban,
        acna: vm.poSearch.acna,
        createdBy: vm.poSearch.createdBy,
        dueDateFrom: vm.poSearch.dueStartDate,
        dueDateTo: vm.poSearch.dueEndDate,
        createdOnFrom: vm.poSearch.createdStartDate,
        createdOnTo: vm.poSearch.createdEndDate,
        lastUpdatedFrom: vm.poSearch.lastUpdatedStartDate,
        lastUpdatedTo: vm.poSearch.lastUpdatedEndDate,
        lastUpdatedBy: vm.poSearch.lastUpdatedBy,
        projectCustomerSVID: vm.poSearch.svid,
        customerCircuitId: vm.poSearch.telcoCircuitId,
        //nteClliA: vm.poSearch.nteClli,
        //nteClliZ: vm.poSearch.nteClli,
        //lagIdA: vm.poSearch.lagId,
        //lagIdZ: vm.poSearch.lagId,
        //searchAZSide;
        //searchLagByLagId:
        //searchINLTechByLagId:
        //searchINLTechByLagName;
        //searchEVCbyNteClli;
        //searchLagByInlClo;
        //orderIndicator;
        //serviceType;

        rtpIndicator: vm.poSearch.rtpIndicator.name,
        complexMacdIndicator: vm.poSearch.complexMacd.name,
        customerCircuitReference: vm.poSearch.customerCircuitReference
      };

      return postObject;
    }

    function processSearchResult(responseData) {
      vm.tableData.tableDefinition = responseData.tableRows;

      ++vm.tableData.loadTrigger; //fires off table generation upon digest
    }

    function setPicklistsToDefaultValues() {
      // set default picklist selection
      vm.poSearch.orderType = vm.poOrderTypeList[0];
      vm.poSearch.orderAction = vm.poOrderActionList[0];
      vm.poSearch.orderStatus = vm.poOrderStatusList[0];
      vm.poSearch.decompMode = vm.decompModeList[0];
      vm.poSearch.rtpIndicator = vm.poRTPIndicatorList[0];
      vm.poSearch.complexMacd = vm.poComplexMACDList[0];
    }

    /*need to create json file to load the picklist values
    Need to add $scope dependency or not?*/
    /*TO DO*/
    function populatePicklistValues() {
      // picklists for the CANOPI GUI are loaded in app.js
      //		$rootScope.$watch('picklists', function () {
      //
      //			//This will fire AFTER this controller has initiated and $state.parms is finally set correctly
      //			if ($rootScope.picklists !== undefined) {
      //
      //				vm.poOrderTypeList  = $rootScope.picklists.poOrderTypeList;
      //				vm.poOrderActionList  = $rootScope.picklists.poOrderActionList;
      //				vm.poOrderStatusList  = $rootScope.picklists.poOrderStatusList;
      //				vm.decompModeList  = $rootScope.picklists.decompModeList;
      //				vm.poRTPIndicatorList  = $rootScope.picklists.poRTPIndicatorList;
      //				vm.poComplexMACDList  = $rootScope.picklists.poComplexMACDList;
      //
      //				vm.picklistNotReady = false;
      //
      //				setPicklistsToDefaultValues();
      //			}
      //
      //		});
      //TESTING PURPOSES
      vm.picklistNotReady = false;
      setPicklistsToDefaultValues();
    }
  }
]);
