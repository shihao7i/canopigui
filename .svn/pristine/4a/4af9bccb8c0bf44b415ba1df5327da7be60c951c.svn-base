describe('Testing Maxmedia notificationPopover directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
    beforeEach(function() {
        scope.messageList = [
            "Message 1",
            "Message 2",
            "Message 3",
            "Message 4"
        ];
    });
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should have invoked popover function', function (){
       
        var htmlToTest = '<div notification-popover notification-text="Right Notification Popover" title="System Messages" placement="right" message-list="messageList"></div>';
     
        complileDirective(htmlToTest);
 
        spyOn(angular.element.fn, 'popover').andCallThrough();
        
        // trigger a button click to popover
        elem.find('span.icon-ICON_USER').click();

        expect(angular.element.fn.popover).toHaveBeenCalled();
   
    });
    

});

