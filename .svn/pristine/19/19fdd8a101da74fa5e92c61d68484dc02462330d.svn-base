describe('Testing Directive: bootstrapDatepicker', function(){
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
    
    it('Should update the date with the passed in date from ngModel', function() {
       var htmlToTest =  '<input ng-model="selectedDate" bootstrap-datepicker/>';
       
       compileDirective(htmlToTest);
    });
    
    it('Should throw an error if ng-model not present', function() {
        var htmlToTest =  '<input bootstrap-datepicker/>';
       
       compileDirective(htmlToTest);
    });
        
        
});