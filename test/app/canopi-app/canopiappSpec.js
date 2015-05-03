'use strict';

describe('Testing localStorage with value set', function() {

    // emulate the attuid is set in localStorage via ATT global login 
    beforeEach(module('canopi.app', function() {
        localStorage.setItem("attuid", "yw508r");
    }));

    // clear the localStorage
    afterEach(function () {
        localStorage.clear();
    });
   
              
    it('should set $rootScope.attUd with id stored in localStorage', inject(function($rootScope){
  
        var storedId = localStorage.getItem("attuid");
        
        expect(storedId).toEqual('yw508r');
        expect($rootScope.attUid).toEqual(storedId);
    }));

}); 




describe('Testing App Run with no localStorage value set', function() {
    
    var state;

    beforeEach(module('canopi.app'));

    //load the mock module thus overriding the $state service
    beforeEach(module('stateMock'));
    
    beforeEach(module(function($provide) {
   
        $provide.decorator('CommonUtilJsonService', function($delegate, $q) {

            $delegate.getUser = function(attUid) {
                return $q.when({
                    attUid:     'pb154j',
                    firstName:  'PAUL',		
                    lastName:   'BERESUITA',
                    email:      'pb154j@att.com',	
                    tn:         '404-986-1111'
                });
            };
            
            $delegate.getPicklistValues = function() {
                return $q.when([]);
            };
            
            return $delegate;
        });

    }));


    beforeEach(inject(function ($state) {
        state = $state;

    }));

    afterEach(function () {

    });
   
   
    it('It should transition to dashboard state on initial load', function () {
        state.expectTransitionTo("dashboard");
    });


    it('should allow me to test the run() block', inject(function ($rootScope) {
       
        var userData = {
            attUid:     'pb154j',
            firstName:  'PAUL',		
            lastName:   'BERESUITA',
            email:      'pb154j@att.com',	
            tn:         '404-986-1111'
        };
      
        $rootScope.$digest();
        
        expect($rootScope.user).toEqual(userData);
        expect($rootScope.picklists).toEqual([]);

        expect($rootScope.attUid).toBe('pb154j');
        expect($rootScope.userName).toEqual('PAUL BERESUITA');
    }));
}); 



