describe('Testing Maxmedia editField directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
    beforeEach(function() {
     
    });
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);

        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should display correct label name which matches the one passed from directive attribute', function (){
       
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..."></div>';

        complileDirective(htmlToTest);

        // directive's attribute value
	var label = elem.attr('label');       
        expect(elem.find('label').text()).toEqual(label+':');

    });
    
    
    it('Should hide help-block when isValid has true value, is null or undefined', inject(function ($rootScope){
       
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..."></div>';

        scope.isValid = undefined;
        complileDirective(htmlToTest);
        expect(elem.find('span').hasClass('ng-hide')).toBe(true);
        
        scope.isValid = true;
        $rootScope.$digest();
        expect(elem.find('span').hasClass('ng-hide')).toBe(true);
        
        scope.isValid = false;
        $rootScope.$digest();
        expect(elem.find('span').hasClass('ng-hide')).toBe(false);
  
    }));
    
    
    it('Should have match isValid value (parent scope vs isolate scope)', function(){
       
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..."></div>';

        scope.isValid = true;
        
        complileDirective(htmlToTest);
        expect(elem.isolateScope().isValid).toBe(true);

    });
    
    
    it('Should show required="required" attribute in DOM', function(){
       
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..." required="required"></div>';

        complileDirective(htmlToTest);
        expect(elem.isolateScope().required).toBe('required="required"');

    });
    
    
    it('Should show editable="false" attribute in DOM', function(){
       
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..." editable="false"></div>';

        complileDirective(htmlToTest);
        expect(elem.isolateScope().editable).toBe(false);

    });
    
    
    it('Should return validated object from callback function', inject(function ($rootScope){
 
        var htmlToTest ='<div edit-field id="name" label="User Name" state="isValid" validate="validateName(value)" placeholder="Please enter your name ..." required="required"></div>';

        complileDirective(htmlToTest);
        
        // mock controller's validateName method
        scope.validateName = function(value) {
            scope.retObj = {success: true, message: ''};
            return scope.retObj;
        }
    
        // trigger mouseleave event
        elem.find('input').triggerHandler('mouseleave');
      
        $rootScope.$digest();
        
        expect(elem.isolateScope().isValid).toBe(true);
        expect(elem.isolateScope().message).toBe('');

    }));
});
    


