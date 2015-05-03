'use strict';

describe('Testing LookupSearchJsonService', function(){
    
    var _service, _httpBackend, _http, _cache;
    var restUrl = '/canopigui/rest/lookupSearch/searchCustomers';
    var successData = {};
    var responseData = {};
    var successCallback;
    var errorCallback;
    
    beforeEach(module('canopi.service')); 
       
    //mock Application to allow us to inject our own dependencies
    beforeEach(inject(function ($injector, $http, $httpBackend, Cache) {
        _http = $http;
        _httpBackend = $httpBackend;
        _service = $injector.get('LookupSearchJsonService');
        _cache = Cache;
        successCallback = jasmine.createSpy('success');
        errorCallback = jasmine.createSpy('error');
        spyOn(_http, 'get').andCallThrough();
        responseData ={
            
        };
    
    }));
    
    // makes sure all expected requests are made by the time the test ends
    afterEach(function () {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

//    it('should initialize some variables', function () {
//        expect(_service.controllerName).toEqual('lookupSearch');
//    });

    
});
