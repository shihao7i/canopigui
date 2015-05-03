'use strict';

describe('Testing OrderSearchJsonService', function(){
    
    var _service, _httpBackend, _http, _cache;
    
    beforeEach(module('canopi.service')); 
       
    //mock Application to allow us to inject our own dependencies
    beforeEach(inject(function ($injector, $http, $httpBackend, Cache) {
        _httpBackend = $httpBackend;
        _service = $injector.get('OrderSearchJsonService');
    }));
    
    // makes sure all expected requests are made by the time the test ends
    afterEach(function () {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

    it('should make an ajax call to /canopigui/rest/orderSearch/poSearch', function () {
        _service.getProjectOrderSummary({});

        _httpBackend.expectPOST('/canopigui/rest/orderSearch/poSearch').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to /canopigui/rest/orderSearch/toSearch', function () {
        _service.getTechnicalOrderSummary({});

        _httpBackend.expectPOST('/canopigui/rest/orderSearch/toSearch').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to /canopigui/rest/orderSearch/relatedPoSearch', function () {
        _service.getRelatedProjectOrders({});

        _httpBackend.expectPOST('/canopigui/rest/orderSearch/relatedPoSearch').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to /canopigui/rest/orderSearch/relatedToSearch', function () {
        _service.getRelatedTechnicalOrders({});

        _httpBackend.expectPOST('/canopigui/rest/orderSearch/relatedToSearch').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to /canopigui/rest/orderSearch/searchROByDeviceClli', function () {
        _service.searchRelatedOrdersByDeviceClli({});

        _httpBackend.expectPOST('/canopigui/rest/orderSearch/searchROByDeviceClli').respond(200, '');
        _httpBackend.flush();
    });
});
