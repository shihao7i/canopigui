describe('Testing Directive: userMessage', function(){
    var scope, compile, elem;
    
    beforeEach(module('canopi.directive'));
    beforeEach(module('canopi.service'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    function compileDirective(html) {
        elem = angular.element(html);
        
        compile(elem)(scope);
        
        scope.$digest();
    }
    
    it('Should display a use rmessage', function() {
       var htmlToTest =  '<user-message message="Hello World" type="warning"/>';
       
       compileDirective(htmlToTest);
       
       expect(elem.isolateScope().message).toBe("Hello World");
       expect(elem.isolateScope().type).toBe("warning");
    });        
});