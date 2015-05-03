describe('Testing Maxmedia dialogBoxWithOptionalLaunchButton directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
    beforeEach(function() {
        scope.dialogContent = "Lorem ipsum: dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    });
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


    it('Should only show the Dialog Box - the launch button is created outside the directive', inject(function ($rootScope){
       
        var htmlToTest ='<button class="btn btn-blue" data-toggle="modal" data-target="#myModal">' +
                        'Launch Modal</button>' +
                        '<div dialog-box-with-optional-launch-button dialog-id="myModal" title="Label Name" content="dialogContent" action-button-label="Save" callback="save()"></div>';

        complileDirective(htmlToTest);

        // trigger a button click to show the dialog box
        elem.find('button').click();
        
        $rootScope.$digest();
        
        expect(elem.find('strong').text()).toEqual(scope.dialogContent);

    }));
    
    
});


