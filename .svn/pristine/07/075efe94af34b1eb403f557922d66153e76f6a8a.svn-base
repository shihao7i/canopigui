'use strict';
 
describe('Testing AboutController', function(){
    var scope, _httpBackend;
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(module('canopi.app'));
    
        //load the mock module thus overriding the $state service
    beforeEach(module('stateMock'));

    
    beforeEach(module(function($provide) {
   
        $provide.decorator('CommonUtilJsonService', function($delegate, $q) {

            $delegate.getServerInfo = function() {
                return $q.when({
                    serverTimeStamp: '01/05/2015 01:24:24',
                    serverVersion: '1502.0.0.116179',
                    currentDate: 'Mon Jan 05 11:23:35 EST 2015'
                });
            };

            return $delegate;
        });

    }));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller, $httpBackend){

        _httpBackend = $httpBackend;
        
        //Jasmine spec runner was returning ‘Error: Unexpected request: GET ... No more request expected.’ 
        // Stub out the rest calls made in canopi.app module's run block
        _httpBackend.expectGET('/canopigui/rest/common/user/get/pb154j').respond([]);
        _httpBackend.expectGET('/canopigui/rest/common/picklists/get').respond([]);
 
        //create an empty scope
        scope = $rootScope.$new();
        
        //declare the controller and inject our empty scope
        $controller('AboutController', {$scope: scope});
        
    }));
    
    // tests start here

    it('should make getServerInfo call', inject(function ($rootScope){
   
        $rootScope.$digest();
 
        expect(scope.serverTimeStamp).toEqual('01/05/2015 01:24:24');
        expect(scope.serverVersion).toEqual('1502.0.0.116179');
        expect(scope.currentDate).toEqual('Mon Jan 05 11:23:35 EST 2015');
       
    }));

});