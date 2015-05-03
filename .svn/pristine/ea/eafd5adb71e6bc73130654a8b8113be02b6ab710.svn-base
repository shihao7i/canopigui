'use strict';
 
describe('Testing AboutController using Spy', function(){
    var scope, _httpBackend, _CommonUtilJsonService;
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(module('canopi.app'));
    
        //load the mock module thus overriding the $state service
    beforeEach(module('stateMock'));

    
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, $httpBackend,CommonUtilJsonService ){

        _httpBackend = $httpBackend;
        _CommonUtilJsonService = CommonUtilJsonService;
        
        //Jasmine spec runner was returning ‘Error: Unexpected request: GET ... No more request expected.’ 
        // Stub out the rest calls made in canopi.app module's run block
        _httpBackend.expectGET('/canopigui/rest/common/user/get/pb154j').respond([]);
        _httpBackend.expectGET('/canopigui/rest/common/picklists/get').respond([]);
 
        //create an empty scope
        scope = $rootScope.$new();
        
        spyOn(_CommonUtilJsonService, 'getServerInfo').andCallThrough();
        
        //declare the controller and inject our empty scope
        $controller('AboutController', {$scope: scope, CommonUtilJsonService: _CommonUtilJsonService});
        
    }));
    
    // tests start here

    it('should make getServerInfo call', inject(function ($rootScope){

        expect(_CommonUtilJsonService.getServerInfo).toHaveBeenCalled();
       
    }));

});
