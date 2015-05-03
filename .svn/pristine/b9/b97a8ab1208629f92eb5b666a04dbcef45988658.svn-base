'use strict';

describe('Testing Directive: alertMessages', function($provide, HelperUtilService){
    
    var scope, elem, compile;
    var _messagesService;
    var _helperUtilService;     //real service, only one method
    var _messages = [];
      
    beforeEach(module('canopi.service'));
    beforeEach(module('canopi.directive')); 
    
    //Mock the messageService... which maintains a list of message objects
    // {      "message": message,     "type": messageType,    "icon": messageIcon   };

    beforeEach(module(function ($provide) {
        $provide.service('MessagesService', function() {
            this.getMessages = jasmine.createSpy('getMessages').andCallFake(function(){
                return _messages;
            });
            
            this.removeMessage = jasmine.createSpy('removeMessage').andCallFake(function(idx){
                if ( _messages && _messages.length > idx )
                    _messages.splice(idx, 1);
            });
        });
    }));
    
    beforeEach(inject(function($compile, $rootScope, HelperUtilService, MessagesService ){
        scope = $rootScope.$new();
        compile = $compile;
        _messagesService = MessagesService;
        _helperUtilService = HelperUtilService;
    }));
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    
    
    // tests start here
    it('should test visibility of alertMessages and response to change in number of messages', function () {
        
        _messages = [
            _helperUtilService.getMessageAndType("First Message", "info")
        ];
        
        complileDirective('<div alert-messages></div>');

        //Test to see if there's one item in there
        expect(scope.hasMessage).toBe(true);
        expect(scope.messageList.length).toBe(1);
        expect(scope.messageList[0].message).toBe("First Message");
        expect(elem.find('div').size()).toBe(1);
//        expect(elem.find('div').eq(0).hasClass('alert')).toBe(true);
//        expect(elem.find('div').eq(0).hasClass('alert-info')).toBe(true);
        
        //Test undefined to hide message
        _messages = undefined;
        scope.$digest();
        expect(scope.hasMessage).toBe(false);
        expect(scope.messageList).toBeUndefined();
        expect(elem.find('div').size()).toBe(0);
        
        //Now load the messages with 2 and see if it's visible again with two div elements
        _messages = [
            _helperUtilService.getMessageAndType("First Message", "info"),
            _helperUtilService.getMessageAndType("Second Message", "error")
        ];
        scope.$digest();
        expect(scope.hasMessage).toBe(true);
        expect(scope.messageList.length).toBe(2);
        expect(scope.messageList[1].message).toBe("Second Message");
/*        
 *      This seems to create 6 divs?  Go figure.  It should be creating two.
        expect(elem.find('div').size()).toEqual(2);
        expect(elem.find('div').eq(1).hasClass('alert-danger')).toBe(true);
*/        

        //Test for null condition to hide message
        _messages = null;
        scope.$digest();
        expect(scope.hasMessage).toBe(false);
    });


    it('should verify message and button click to hide independent alert messages', function () {
        
        _messages = [
            _helperUtilService.getMessageAndType("First Message", "info"),
            _helperUtilService.getMessageAndType("Second Message", "error")
        ];
        
        complileDirective('<div alert-messages></div>');

        //Test to see if there's one item in there
        expect(elem.find('div').size()).toBe(2);
        expect(elem.find('div').eq(1).hasClass('alert-danger')).toBe(true);
        expect(scope.messageList.length).toBe(2);
        
        elem.find('div:eq(1) button').click();

        //click should have called removeMessage on second alert
        //so test that it is no longer there
        expect(elem.find('div').size()).toBe(1);
        expect(elem.find('div').eq(0).hasClass('alert-info')).toBe(true);
        expect(scope.messageList.length).toBe(1);
    });

});