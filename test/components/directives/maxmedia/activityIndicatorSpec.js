describe('Testing Maxmedia activityIndicator directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should have activityIndicator with true value', function (){
       
       var htmlToTest ='<div activity-indicator="isLoading"></div>';
   
       scope.isLoading = true;
       complileDirective(htmlToTest);
        
       expect(elem.attr('message')).toBe(undefined);
       expect(elem.isolateScope().message).toBe('Loading...Please Wait');
       expect(elem.find('div').eq(1).attr('class')).toBe('loader');

    });
    
    
    it('Should have activityIndicator with true value and message passed', function (){
       
       var htmlToTest ='<div activity-indicator="isLoading" message="Making WebService Call...Please Wait"></div>';
   
       scope.isLoading = true;
       complileDirective(htmlToTest);
        
       //expect(elem.attr('message')).toBe('Making WebService Call...Please Wait');
       expect(elem.isolateScope().message).toBe(elem.attr('message'));
       expect(elem.find('div').eq(1).attr('class')).toBe('loader');

    });
    
});

