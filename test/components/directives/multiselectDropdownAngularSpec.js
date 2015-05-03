describe('Testing Directive: ngDropdownMultiselect', function(){
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
    
    it('should initialize the directive', function(){
        var htmlToTest =  '<div ng-dropdown-multiselect="true" options="example1data" selected-model="example1model"/>';
        //scope.example1data = [];
        scope.example1data = [{id: 1, label: "UNI"}, {id: 2, label: "EVC"}, {id: 3, label: "CNL"}, {id: 4, label:"DeviceSwap"}, {id:5, label:"ALL"}];
        scope.example1model=[];
        
        
        compileDirective(htmlToTest);
        //console.log("elem.text: " + elem.text());
        expect(elem.text()).toContain("UNI");
        //console.log("htmlToTest: " + elem.isolateScope());
        //expect(htmlToTest).toBeDefined();
        //console.log("scope: " + scope.example1data);
        //expect(elem.scope().example1data).toContain
        
    });
    
    it('should enable extraSettings', function(){
        var htmlToTest2 =  '<div ng-dropdown-multiselect="true" options="example2data" selected-model="example2model" extra-settings="example2settings"/>';
        scope.example2data = [{id: 1, label: "UNI"}, {id: 2, label: "EVC"}, {id: 3, label: "CNL"}, {id: 4, label:"DeviceSwap"}, {id:5, label:"ALL"}];
        scope.example2model=[];
        scope.example2settings={displayProp:'id'};
        
        compileDirective(htmlToTest2);
        
        //console.log("elem.text: "+elem.text());
        expect(elem.text()).not.toContain("UNI");
        //expect(htmlToTest2).toBeDefined();
        //console.log("scope: " + scope.example2data);
        //console.log(elem.scope());
        //expect(elem.scope().getButtonText()).toContain('1');
    });
    
//    it('should enable groupBy', function(){
//        
//    });
    
    //http://stackoverflow.com/questions/13406491/how-to-test-behavior-in-the-link-function-of-a-directive
    it('should react to user click selection', function(){
        var htmlToTest3 =  '<div ng-dropdown-multiselect="true" options="example3data" selected-model="example3model"/>';
        scope.example3data = [{id: 1, label: "UNI"}, {id: 2, label: "EVC"}, {id: 3, label: "CNL"}, {id: 4, label:"DeviceSwap"}, {id:5, label:"ALL"}];
        scope.example3model=[];
        
        compileDirective(htmlToTest3);
        //scope.checkboxClick({id:1});
        //expect(scope.selectedModel).toBe({id: 1, label: "UNI"});
    });
    
});


