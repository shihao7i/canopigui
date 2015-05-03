describe('Testing Maxmedia radioButtonGroup directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    beforeEach(function() {
        scope.radiolist = [ {id: 'radio1', value: 'Radio Button 1', isSelected: false},
                            {id: 'radio2', value: 'Radio Button 2', isSelected: false},
                            {id: 'radio3', value: 'Radio Button 3', isSelected: false}];
    });
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should have all radio buttons unselected', function (){
       
        var htmlToTest = '<div radiobutton-group radioList="radiolist"></div>';
       
        complileDirective(htmlToTest);
       
        expect(elem.find('label').eq(0).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);

        expect(elem.isolateScope().radiolist[0].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[1].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[2].isSelected).toBe(false);

    });
    
    it('Should have first radio buttons selected', inject(function ($rootScope){
        var htmlToTest = '<div radiobutton-group radioList="radiolist"></div>';
        
        complileDirective(htmlToTest);
        
        elem.isolateScope().toggleMe(0);         
        
        $rootScope.$digest();
        
        expect(elem.find('label').eq(0).hasClass('active')).toBe(true);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);
        
        expect(elem.isolateScope().radiolist[0].isSelected).toBe(true);
        expect(elem.isolateScope().radiolist[1].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[2].isSelected).toBe(false);
    }));

    it('Should have second radio buttons selected', inject(function ($rootScope){
        var htmlToTest = '<div radiobutton-group radioList="radiolist"></div>';
        
        complileDirective(htmlToTest);
        
        elem.isolateScope().toggleMe(1);         
        
        $rootScope.$digest();
        
        expect(elem.find('label').eq(0).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(true);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(false);
        
        expect(elem.isolateScope().radiolist[0].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[1].isSelected).toBe(true);
        expect(elem.isolateScope().radiolist[2].isSelected).toBe(false);
        
    }));
    
    it('Should have third radio buttons selected',  inject(function ($rootScope){
        var htmlToTest = '<div radiobutton-group radioList="radiolist"></div>';
        
        complileDirective(htmlToTest);
        
        elem.isolateScope().toggleMe(2);         
        
        $rootScope.$digest();
        
        expect(elem.find('label').eq(0).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(1).hasClass('active')).toBe(false);
        expect(elem.find('label').eq(2).hasClass('active')).toBe(true);
        
        expect(elem.isolateScope().radiolist[0].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[1].isSelected).toBe(false);
        expect(elem.isolateScope().radiolist[2].isSelected).toBe(true);
        
    }));
});

