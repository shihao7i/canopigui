describe('Testing Maxmedia checkbox directive', function() {
    
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
    


    it('Should have checkbox with state equal to true(checked) and active class', function (){
       
        var htmlToTest = '<div checkbox id="checkbox4" value="CheckBox 4"  state="isChecked"></div>';
       
        scope.isChecked = true;
        complileDirective(htmlToTest);
        
        var labelElement = elem.find('label').eq(0).attr('class');
        expect(labelElement).toBe('checkbox-container active');
        expect(elem.isolateScope().isChecked).toBe(true);

    });
    
    it('Should have checkbox with state equal to false(unchecked) and active class not present', function (){
       
        var htmlToTest = '<div checkbox id="checkbox4" value="CheckBox 4"  state="isChecked"></div>';
       
        scope.isChecked = false;
        complileDirective(htmlToTest);
        
        var labelElement = elem.find('label').eq(0).attr('class');
        expect(labelElement).toBe('checkbox-container');
        expect(elem.isolateScope().isChecked).toBe(false);
    
    });
        
    it('Should have checkbox with state equal to true(checked) when clicking checkbox from deactive state', inject(function ($rootScope){
       
        var htmlToTest = '<div checkbox id="checkbox4" value="CheckBox 4"  state="isChecked"></div>';
       
        scope.isChecked = true;
        
        complileDirective(htmlToTest);
        
        elem.isolateScope().toggleMe();
        
        $rootScope.$digest();

        var labelElement = elem.find('label').eq(0).attr('class');
        expect(labelElement).toBe('checkbox-container');
        expect(elem.isolateScope().isChecked).toBe(false);
    
    }));
    
    it('Should have checkbox with state equal to false(unchecked) when clicking checkbox from active state', inject(function ($rootScope){
       
        var htmlToTest = '<div checkbox id="checkbox4" value="CheckBox 4"  state="isChecked"></div>';
       
        scope.isChecked = false;
        
        complileDirective(htmlToTest);
        
        elem.isolateScope().toggleMe();
        
        $rootScope.$digest();

        var labelElement = elem.find('label').eq(0).attr('class');
        expect(labelElement).toBe('checkbox-container active');
        expect(elem.isolateScope().isChecked).toBe(true);
    
    }));
    
});

