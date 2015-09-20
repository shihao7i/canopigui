angular.module('canopi.app').controller('TechnicalOrderSearchController', [
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

      populatePicklistValues();
    }

    function initializeScopeVariables() {
      $scope.name = 'TechnicalOrderSearch';

      $scope.isLoading = false; // set activity indicator to false

      $scope.picklistNotReady = true; // picklist values not loaded yet

      //Angular UI Datepicker setup
      $scope.datepickers = {
        dueStartDateDatepicker: false,
        dueEndDateDatepicker: false,
        createdStartDateDatepicker: false,
        createdEndDateDatepicker: false,
        lastUpdatedStartDateDatepicker: false,
        lastUpdatedEndDateDatepicker: false,
        provStatusStartDateDatepicker: false,
        provStatusEndDateDatepicker: false
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        showWeeks: 'false'
      };

      $scope.formats = [
        'dd-MMMM-yyyy',
        'yyyy/MM/dd',
        'dd.MM.yyyy',
        'shortDate'
      ];
      $scope.format = $scope.formats[3];

      //Angular UI Pagination setup
      $scope.maxSize = 5;
      $scope.transclude = { bigCurrentPage: 0 };
      $scope.enablePagination = false;

      // init value for DataTables
      $scope.tableData = {
        loadTrigger: 0,
        tableDefinition: {}
      };

      $scope.tableRecords = 0;

      $scope.accordionOpen = {
        table: true,
        search: true
      };

      clearTOSearchScopeVariables();
    }

    function setupScopeMethods() {
      $scope.gridEventHandler = function(eventId, data) {
        $log.debug(
          'gridEventHandler: eventId=' +
            eventId +
            ', data=' +
            angular.toJson(data)
        );
      };

      $scope.toSearch = function() {
        $scope.isLoading = true; // set activity indicator to false

        var currentPage = 0;
        var postObject = marshalTOSearchRequest(currentPage);
        var promise = OrderSearchJsonService.getTechnicalOrderSummary(
          postObject
        );

        promise.then(function(data) {
          $log.debug('TO Summary => ' + JSON.stringify(data, null, '\t'));
          $scope.tableRecords = data.pageInfo.totalRecords;
          $scope.totalItems = data.pageInfo.totalRecords / 10;
          $scope.currenRecordsReturned = data.serviceOrderList.length;

          $scope.enablePagination = true;
          processSearchResult(data);

          $scope.isLoading = false; // set activity indicator to false
        });
      };

      $scope.pageChanged = function() {
        $scope.isLoading = true; // set activity indicator to false

        var currentPage = $scope.transclude.currentPage - 1; //need to subtract since BE call starts from page 0
        var postObject = marshalTOSearchRequest(currentPage);
        var promise = OrderSearchJsonService.getTechnicalOrderSummary(
          postObject
        );

        promise.then(function(data) {
          $log.debug('TO Summary => ' + JSON.stringify(data, null, '\t'));
          $scope.tableRecords = data.pageInfo.totalRecords;
          $scope.totalItems = data.pageInfo.totalRecords / 10;
          $scope.currenRecordsReturned = data.serviceOrderList.length;

          $scope.enablePagination = true;

          processSearchResult(data);

          $scope.isLoading = false; // set activity indicator to false
        });
      };

      $scope.toSearch.dueStartDate = '';
      $scope.toSearch.dueEndDate = '';
      $scope.toSearch.createdStartDate = '';
      $scope.toSearch.createdEndDate = '';
      $scope.toSearch.lastUpdatedStartDate = '';
      $scope.toSearch.lastUpdatedEndDate = '';
      $scope.toSearch.provStatusStartDate = '';
      $scope.toSearch.provStatusEndDate = '';

      $scope.open = function($event, selectedDatepicker) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepickers[selectedDatepicker] = true;
      };

      $scope.clear = function() {
        clearTOSearchScopeVariables();
        setPicklistsToDefaultValues();
      };
    }

    function marshalTOSearchRequest(currentPageNumber) {
      // for testing only ...
      var postObject = {
        orderType: $scope.toSearch.orderType.name,
        orderAction: $scope.toSearch.orderAction.name,
        orderStatus: $scope.toSearch.orderStatus.name,
        provisioningStatus: $scope.toSearch.provisioningStatus.name,
        technicalOrderId: $scope.toSearch.technicalOrderId,
        serviceId: $scope.toSearch.serviceId,
        serviceOrderNumber: $scope.toSearch.serviceOrderNumber,
        pageInfo: {
          currentPage: currentPageNumber.toString(),
          itemsPerPage: '100'
        },
        dslUsoNum: $scope.toSearch.dslUsoNum,
        telcoCircuitId: $scope.toSearch.telcoCircuitId,
        customerCircuitReference: $scope.toSearch.customerCircuitReference,
        projectOrderId: $scope.toSearch.projectOrderId,
        currentStep: $scope.toSearch.currentStep,
        customerName: $scope.toSearch.customerName,
        tirksCloNum: $scope.toSearch.tirksCloNum,
        lagName: $scope.toSearch.lagName,
        projectCustomerCode: $scope.toSearch.customerCode,
        ban: $scope.toSearch.ban,
        acna: $scope.toSearch.acna,
        createdBy: $scope.toSearch.createdBy,
        dueDateFrom: $scope.toSearch.dueStartDate,
        dueDateTo: $scope.toSearch.dueEndDate,
        createdOnFrom: $scope.toSearch.createdStartDate,
        createdOnTo: $scope.toSearch.createdEndDate,
        lastUpdatedFrom: $scope.toSearch.lastUpdatedStartDate,
        lastUpdatedTo: $scope.toSearch.lastUpdatedEndDate,
        provStatusDateFrom: $scope.toSearch.provStatusStartDate,
        provStatusDateTo: $scope.toSearch.provStatusEndDate,
        lastUpdatedBy: $scope.toSearch.lastUpdatedBy,
        projectCustomerSVID: $scope.toSearch.svid,
        customerCircuitId: $scope.toSearch.customerCktId,
        asr: $scope.toSearch.dslAsrNum,
        //nteClliA: $scope.toSearch.nteClli,
        //nteClliZ: $scope.toSearch.nteClli,
        //lagIdA: $scope.toSearch.lagId,
        //lagIdZ: $scope.toSearch.lagId,
        //uniCircuitIdA: $scope.toSearch.uniCircuitId,
        //uniCircuitIdZ: $scope.toSearch.uniCircuitId,
        //searchAZSide;
        //searchLagByLagId:
        //searchINLTechByLagId:
        //searchINLTechByLagName;
        //searchEVCbyNteClli;
        //searchLagByInlClo;
        //orderIndicator;
        //serviceType;

        rtpIndicator: $scope.toSearch.rtpIndicator.name,
        complexMacdIndicator: $scope.toSearch.complexMacd.name
      };

      return postObject;
    }

    function clearTOSearchScopeVariables() {
      $scope.toSearch = {
        technicalOrderId: '',
        serviceId: '',
        serviceOrderNumber: '',
        dslUsoNum: '',
        telcoCircuitId: '',
        nteClli: '',
        customerCircuitReference: '',
        projectOrderId: '',
        currentStep: '',

        customerName: '',
        customerCode: '',
        svid: '',
        ban: '',
        acna: '',
        tirksCloNum: '',
        customerCktId: '',
        lagName: '',

        dueStartDate: '',
        dueEndDate: '',
        createdStartDate: '',
        createdEndDate: '',
        lastUpdatedStartDate: '',
        lastUpdatedEndDate: '',
        provStatusStartDate: '',
        provStatusEndDate: '',

        createdBy: '',
        lastUpdatedBy: '',
        dslAsrNum: '',
        lagId: '',
        uniCircuitId: '',

        orderType: {},
        orderAction: {},
        orderStatus: {},
        provisioningStatus: {},
        rtpIndicator: {},
        complexMacd: {}
      };
    }

    function setPicklistsToDefaultValues() {
      // set default picklist selection
      $scope.toSearch.orderType = $scope.toOrderTypeList[0];
      $scope.toSearch.orderAction = $scope.toOrderActionList[0];
      $scope.toSearch.orderStatus = $scope.toOrderStatusList[0];
      $scope.toSearch.provisioningStatus = $scope.toProvisioningStatusList[0];
      $scope.toSearch.rtpIndicator = $scope.toRTPIndicatorList[0];
      $scope.toSearch.complexMacd = $scope.toComplexMACDList[0];
    }

    function processSearchResult(responseData) {
      $scope.tableData.tableDefinition = responseData.tableRows;

      ++$scope.tableData.loadTrigger; //fires off table generation upon digest
    }

    function populatePicklistValues() {
      // picklists for the CANOPI GUI are loaded in app.js
      $rootScope.$watch('picklists', function() {
        //This will fire AFTER this controller has initiated and $state.parms is finally set correctly
        if ($rootScope.picklists !== undefined) {
          $scope.toOrderTypeList = $rootScope.picklists.toOrderTypeList;
          $scope.toOrderActionList = $rootScope.picklists.toOrderActionList;
          $scope.toOrderStatusList = $rootScope.picklists.toOrderStatusList;
          $scope.toProvisioningStatusList =
            $rootScope.picklists.toProvisioningStatusList;
          $scope.toRTPIndicatorList = $rootScope.picklists.toRTPIndicatorList;
          $scope.toComplexMACDList = $rootScope.picklists.toComplexMACDList;

          $scope.picklistNotReady = false;

          setPicklistsToDefaultValues();
        }
      });
    }
  }
]);
