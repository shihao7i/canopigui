'use strict';
 
describe('Testing DashboardController', function(){
    var scope; 
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(module('canopi.app'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(inject(function($rootScope, $controller){

        //create an empty scope
        scope = $rootScope.$new();
        
        //declare the controller and inject our empty scope
        $controller('DashboardController', {$scope: scope});
        
    }));
    
    // tests start here

    it('should show name "Dashboard"', function(){
        expect(scope.name).toEqual('Dashboard');
    });

});