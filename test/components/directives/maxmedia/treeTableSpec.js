describe('Testing Maxmedia treeTable directive', function() {
    
    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));
    
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        compile = $compile;
    }));
    
    
     beforeEach(function() {
         
        // turn off animation for testing
        jasmine.Clock.useMock();
        angular.element.fx.off = true;
   
   
        scope.columnDefinition = {
                   tableRows: {
                        rowMetaData:
                            { columnList:   [{hyperlink:false,	id:"cardName",	      displayName:"Card Name"},
                                            {hyperlink:false,	id:"parentCardName",  displayName:"Parent Card Name"},
                                            {hyperlink:false,	id:"port",	      displayName:"Port"},
                                            {hyperlink:false,	id:"portStatus",      displayName:"Port Status"},
                                            {hyperlink:false,	id:"portRole",	      displayName:"Port Role"}] 
                            },

                        rowValueList:     
                                [{id: 0,
                                  cellValues:["AT_SFP_SM-A.1","SM2GE_SM-A","1","In Service",""],
                                  children: [{cellValues:["A.1.1 child","A.1.1 child","A.1.1","A.1.1","A.1.1"]},
                                             {cellValues:["A.1.2 child","A.1.2 child","A.1.2","A.1.2","A.1.2"]} ]},

                                 {id: 1,
                                  cellValues:["AT_SFP_SM-A.2","SM2GE_SM-A","2","In Service",""],
                                  children: [{cellValues:["A.2.1 child","A.2.1 child","A.2.1","A.2.1","A.2.1"]},
                                             {cellValues:["A.2.2 child","A.2.2 child","A.2.2","A.2.2","A.2.2"]} ]},

                                 {id: 2,
                                  cellValues:["AT_SFP_SM-B.1","SM2GE_SM-B","1","In Service",""],
                                  children: [] },

                                 {id: 3,
                                  cellValues:["AT_SFP_SM-B.2","SM2GE_SM-B","2","In Service",""],
                                  children: [{cellValues:["B.2.1 child","B.2.1 child","B.2.1","B.2.1","B.2.1"]}]}]

                       },
                       errorStaus: "Success",
                       errorMessage: "",
                       errorCode: "0"
        };
    });
    
    
    function complileDirective(html) {
  
        elem = angular.element(html);
        
        //compile the directive and run the compiled view
        compile(elem)(scope);
        
        //call digest on the scope!
        scope.$digest();
    }
    


  it('Should toggle active/inactive state while clicking on the reset button', inject(function ($timeout){
       
        var htmlToTest = '<div tree-table column-definition="columnDefinition"></div>';
     
        complileDirective(htmlToTest);
        
        expect(elem.find('th.tree-table-nav-reset').hasClass('active')).toBe(false);
    
        // trigger a button click to expand the tree table
        elem.find('th.tree-table-nav-reset').click();
        
        // add same delay duration as the fadeOut animation takes 0.3 sec
        $timeout(function() {
            expect(elem.find('.tree-table-nav-reset').hasClass('active')).toBe(true);
            expect(elem.find('treeTable .tree-table-content').hasClass('active')).toBe(true);
            expect(elem.find('treeTable .tree-table-nav').hasClass('active')).toBe(true);
        }, 300);
                
        // trigger a button click to collapse the tree table        
        elem.find('th.tree-table-nav-reset').click();
    
        $timeout(function() {
            expect(elem.find('.tree-table-nav-reset').hasClass('active')).toBe(false);
            expect(elem.find('treeTable .tree-table-content').hasClass('active')).toBe(false);
            expect(elem.find('treeTable .tree-table-nav').hasClass('active')).toBe(false);
        }, 300);
       
    }));
    
    
    it('Should toggle active/inactive state while clicking on the tree table nav button', inject(function ($timeout){
       
        var htmlToTest = '<div tree-table column-definition="columnDefinition"></div>';
     
        complileDirective(htmlToTest);
 
        expect(elem.find('#tree-table-content-0').hasClass('active')).toBe(false);
    
        // trigger a button click to expand tree table display
        elem.find('.tree-table-nav').click();
        
        // add same delay duration as the fadeOut animation takes 0.3 sec
        $timeout(function() {
            expect(elem.find('.tree-table-nav').hasClass('active')).toBe(true);
        }, 300);
                
        // trigger a button click to collapse tree table display        
        elem.find('#tree-table-content-0').click();
    
        $timeout(function() {
            expect(elem.find('.tree-table-nav').hasClass('active')).toBe(false);
        }, 300);


    }));
    

});

