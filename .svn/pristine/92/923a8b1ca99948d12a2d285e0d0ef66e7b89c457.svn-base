'use strict';

describe('Testing CommonUtilJsonService', function(){
    
    var _httpService, _httpBackend, _http,promise, _cache;
    var restUrl = '/canopigui/rest/common/user/get/pb154j';
    var successData = {};
    var responseData = {};
    var successCallback;
    var errorCallback;
    
    beforeEach(module('canopi.service')); 
       
    //mock Application to allow us to inject our own dependencies
    beforeEach(inject(function ($injector, $http, $httpBackend, Cache) {
        _http = $http;
        _httpBackend = $httpBackend;
        _httpService = $injector.get('CommonUtilJsonService');
        _cache = Cache;
        successCallback = jasmine.createSpy('success');
        errorCallback = jasmine.createSpy('error');
        spyOn(_http, 'get').andCallThrough();

        responseData = {
            attUid:     'pb154j',
            firstName:  'PAUL',		
            lastName:   'BERESUITA',
            email:      'pb154j@att.com',	
            tn:         '404-986-1111'
        };
        successData = {
            attUid:     'pb154j',
            firstName:  'PAUL',		
            lastName:   'BERESUITA',
            email:      'pb154j@att.com',	
            tn:         '404-986-1111'
        };
    }));
    
    // makes sure all expected requests are made by the time the test ends
    afterEach(function () {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });
    
    // tests start here
    // Testing the success getUser('pb154j'); function
    it('should make an ajax call to /canopigui/rest/common/user/get/', function () {        
        _httpBackend.expectGET(restUrl).respond(200, responseData);
        promise = _httpService.getUser('pb154j');
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(successCallback).toHaveBeenCalledWith(successData);
        expect(errorCallback).not.toHaveBeenCalled();
    });
    
    // Testing the success getUser('pb154j'); function
    it('should make an ajax call to /canopigui/rest/common/user/get/', function () {  
        spyOn(_cache, 'get').andCallFake(function() {
            return successData;
        });
        promise = _httpService.getUser('pb154j');
        expect(promise.$$state.value).toEqual(successData);
        
    });
    
    // Testing the error getUser('pb154j'); function
    it('tests get failure to make an ajax call to /canopigui/rest/common/user/get/', function () {
        _httpBackend.whenGET(restUrl).respond(500, "errorData");
        promise = _httpService.getUser('pb154j');
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
    });
    
    // Testing the success getServerInfo(); function
    it('should make an ajax call to /canopigui/rest/common/serverInfo/get', function () {        
        _httpBackend.expectGET('/canopigui/rest/common/serverInfo/get').respond(200, successData);
        promise = _httpService.getServerInfo();
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(successCallback).toHaveBeenCalledWith(successData);
        //expect(errorCallback).not.toHaveBeenCalled();
    });
    
    // Testing the success getPicklistValues(); function
    it('should make an ajax call to /canopigui/rest/common/picklists/get', function () {        
        _httpBackend.expectGET('/canopigui/rest/common/picklists/get').respond(200, successData);
        promise = _httpService.getPicklistValues();
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(successCallback).toHaveBeenCalledWith(successData);
        //expect(errorCallback).not.toHaveBeenCalled();
    });

});