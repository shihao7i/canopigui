describe('Testing Directive: modalDialog', function(){
    var scope, compile, elem;
    
    beforeEach(module('canopi.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    function compileDirective(html) {
        elem = angular.element(html);
        
        compile(elem)(scope);
        
        scope.$digest();
    }
    
    it('Should display a modal dialog', function() {
       var htmlToTest =  '<modal-dialog></modal-dialog>';
       
       compileDirective(htmlToTest);       
    });        
});