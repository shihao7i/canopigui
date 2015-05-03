describe('Testing Maxmedia checkboxGroup directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
    beforeEach(function() {
        scope.checkboxList =  [ {id: 'checkbox1', value: 'Checkbox 1', isChecked: false},
                                {id: 'checkbox2', value: 'Checkbox 2', isChecked: false},
                                {id: 'checkbox3', value: 'Checkbox 3', isChecked: false}];
    });
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should have all the checkboxes unchecked with the initialized values', function (){
       
        var htmlToTest ='<div checkbox-group checkboxes="checkboxList"></div>';
 
        complileDirective(htmlToTest);

       // elem.isolateScope().toggleMe(0);
        
      // expect(elem('input')[0].attr('value').val()).toEqual('Checkbox 1');
        expect(elem.find('input').eq(0).attr('value')).toEqual('Checkbox 1');
        expect(elem.find('input').eq(1).attr('value')).toEqual('Checkbox 2');
        expect(elem.find('input').eq(2).attr('value')).toEqual('Checkbox 3');
       
        expect(elem.find('label').eq(0).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);
    });
    
    
    it('Should have first checkbox state toggled twice - first checked and then unchecked', inject(function ($rootScope){
       
        var htmlToTest ='<div checkbox-group checkboxes="checkboxList"></div>';
 
        complileDirective(htmlToTest);

        elem.isolateScope().toggleMe(0);
        
        $rootScope.$digest();
       
        expect(elem.find('label').eq(0).hasClass('active')).toBe(true);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);
        
        elem.isolateScope().toggleMe(0);
        
        $rootScope.$digest();
       
        expect(elem.find('label').eq(0).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);
        
    }));
    
});


