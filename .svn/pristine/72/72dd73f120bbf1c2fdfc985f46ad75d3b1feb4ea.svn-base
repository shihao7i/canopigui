'use strict';

describe('Testing ProjectOrderSearchController', function(){
    
    var scope, _httpBackend, _OrderSearchJsonService, _CommonUtilJsonService, ctrl, $timeout;
    var orderSearchMock;
    
    //mock Application to allow us to inject our own dependencies
    beforeEach(module('canopi.app'));
    beforeEach(module('canopi.service'));

        //load the mock module thus overriding the $state service
    beforeEach(module('stateMock'));
    //http://angular-tips.com/blog/2014/06/introduction-to-unit-test-controllers/
    beforeEach(function(){
        
        orderSearchMock = {};
        module('canopi.app', function($provide) {
            $provide.value('OrderSearchJsonService', orderSearchMock);
        });
        
        inject(function($q) {
            //http://stackoverflow.com/questions/17370427/loading-a-mock-json-file-within-karmaangularjs-test
            jasmine.getJSONFixtures().fixturesPath = 'base/src/app/canopi-app/mock/telco/orders/';
            orderSearchMock.data = getJSONFixture('poSearchResponse.json');
            orderSearchMock.getProjectOrderSummary = function(){               
                var defer = $q.defer();
                defer.resolve(this.data);
                console.log(this.data);
                return defer.promise;
            };
        });
    });
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $q, _$timeout_, _OrderSearchJsonService_){

        //create an empty scope
        scope = $rootScope.$new();   
        
        _httpBackend = $httpBackend;
        _OrderSearchJsonService = _OrderSearchJsonService_;
        //Jasmine spec runner was returning ‘Error: Unexpected request: GET ... No more request expected.’ 
        // Stub out the rest calls made in canopi.app module's run block
        _httpBackend.expectGET('/canopigui/rest/common/user/get/pb154j').respond([]);
        _httpBackend.expectGET('/canopigui/rest/common/picklists/get').respond({
            poOrderTypeList:[{name:'UNI'}, {name: 'EVC'}, {name:'INL'}],
            poOrderActionList: [{name:'New'}, {name:'Update'}],
            poOrderStatusList:[{name:'Test1'}, {name:'Update'}],    
            decompModeList:[{name:'Test1'}, {name:'Update'}], 
            poRTPIndicatorList:[{name:'Test1'}, {name:'Update'}], 
            poComplexMACDList:[{name:'Test1'}, {name:'Update'}]
        });
                
        // assign $timeout to a scoped variable so we can use 
        // $timeout.flush() later. 
        $timeout = _$timeout_;
      
        //declare the controller and inject our empty scope
        ctrl= $controller('ProjectOrderSearchController as projectordersearch', {
            $scope: scope,
            _OrderSearchJsonService:_OrderSearchJsonService
        });
        scope.$digest();
    }));
    
    // tests start here

    it('should have the correct initial state', inject(function ($rootScope){
   
        //$rootScope.$digest();
        
        console.log(scope.projectordersearch.name);
 
        expect(scope.projectordersearch.name).toEqual('ProjectOrderSearch');
        expect(scope.projectordersearch.isLoading).toEqual(false);
        expect(scope.projectordersearch.picklistNotReady).toEqual(false);
        expect(scope.projectordersearch.displayDataTables).toEqual(false);
        //Date Picker
        expect(scope.projectordersearch.datepickers.dueStartDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.datepickers.dueEndDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.datepickers.dueEndDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.datepickers.createdEndDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.datepickers.lastUpdatedStartDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.datepickers.lastUpdatedEndDateDatepicker).toEqual(false);
        expect(scope.projectordersearch.dateOptions.formatYear).toMatch('yy');
        expect(scope.projectordersearch.dateOptions.startingDay).toBe(1);
        expect(scope.projectordersearch.dateOptions.showWeeks).toMatch("false");
        expect(scope.projectordersearch.formats.length).toBe(4);
        expect(scope.projectordersearch.formats).toContain('dd-MMMM-yyyy');
        expect(scope.projectordersearch.formats).toContain('yyyy/MM/dd');
        expect(scope.projectordersearch.formats).toContain('dd.MM.yyyy');
        expect(scope.projectordersearch.formats).toContain('shortDate');
        expect(scope.projectordersearch.format).toMatch(scope.projectordersearch.formats[3]);
        //Angular UI Pagination Setup
        expect(scope.projectordersearch.maxSize).toBe(5);
        expect(scope.projectordersearch.transclude.bigCurrentPage).toBe(0);
        expect(scope.projectordersearch.enablePagination).toEqual(false);
        //Table Records
        expect(scope.projectordersearch.tableData.loadTrigger).toBe(0);
        expect(scope.projectordersearch.tableData.tableDefinition).toEqual({});
        expect(scope.projectordersearch.tableRecords).toBe(0);
        //Accordion
        expect(scope.projectordersearch.accordionOpen.search).toEqual(true);
        expect(scope.projectordersearch.accordionOpen.table).toEqual(false);
    }));
    
    it('should set datepickers to empty first', inject(function($rootScope){
        
        //$rootScope.$digest();        
        expect(scope.projectordersearch.poSearch.dueStartDate).toEqual('');
        expect(scope.projectordersearch.poSearch.dueEndDate).toEqual('');
        expect(scope.projectordersearch.poSearch.createdStartDate).toEqual('');
        expect(scope.projectordersearch.poSearch.createdEndDate).toEqual('');
        expect(scope.projectordersearch.poSearch.lastUpdatedStartDate).toEqual('');
        expect(scope.projectordersearch.poSearch.lastUpdatedEndDate).toEqual('');
    }));
    
    it('should clear all search fields initally', inject(function($rootScope){
        //$rootScope.$digest();
        expect(scope.projectordersearch.poSearch.projectOrderId).toBeUndefined();
        //scope.clearPOSearchScopeVariables();
        //expect(scope.poSearch.projectOrderId).toEqual('');        
    }));
    
    it('should run grid event handler', inject(function($rootScope){
        //$rootScope.$digest();
        expect(scope.projectordersearch.eventId).toBeUndefined();
        expect(scope.projectordersearch.data).toBeUndefined();
        scope.projectordersearch.gridEventHandler(scope.projectordersearch.eventId, scope.projectordersearch.data);
        

    }));
        
    it('should call poSearch', function (){
        // just make the call
        _httpBackend.flush();
        scope.projectordersearch.poSearch();     

        // call $timeout.flush() to flush the unresolved dependency from our
        // someServiceMock.
        $timeout.flush();
        
        // assert that it set $scope.fizz
        //expect(scope.fizz).toEqual('weee');    
    });
    
    it('should run clear method', inject(function($rootScope){
        //$rootScope.$digest();     

        //expect(scope.projectordersearch.poSearch.projectOrderId).toBeUndefined();
        //expect(scope.projectordersearch.poSearch.orderType).toBeUndefined();
        //scope.poSearch.orderType = scope.poOrderTypeList[0];
        _httpBackend.flush();
        scope.projectordersearch.clear();
        //scope.poOrderTypeList = ['UNI', 'EVC'];
        expect(scope.projectordersearch.poSearch.projectOrderId).toEqual('');
        //expect(scope.poSearch.orderType).toEqual('UNI');
    }));
    
    //Mock service to get the picklists
    it('should run open method', inject(function($rootScope){
        //_httpBackend.flush();
        event = jasmine.createSpyObj('event',['preventDefault', 'stopPropagation']);
        var selectedDatepicker = scope.projectordersearch.datepickers.dueStartDateDatepicker;
        scope.projectordersearch.open(event, selectedDatepicker);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(scope.projectordersearch.datepickers[selectedDatepicker]).toBeTruthy();
    }));
    

});

