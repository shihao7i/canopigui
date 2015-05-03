'use strict';

describe('Testing Directive: draggable', function(){
    
    var scope,compile,elem,$document;
      
    beforeEach(module('drag'));
    
    
    beforeEach(inject(function($compile, $rootScope, _$document_){
        scope = $rootScope.$new();
        compile = $compile;
        $document = _$document_;
    }));
    
    function complileDirective(html) {
  
    elem = angular.element(html);
        
    //compile the directive and run the compiled view
    compile(elem)(scope);
        
    //call digest on the scope!
    scope.$digest();
    }
    
    it('Should have draggable mouse down', function (){
        
       
       var htmlToTest =  '<draggable></draggable>';
       
       complileDirective(htmlToTest); 
   //    expect(elem.html()).toContain("move");
       var htmlToTest1 =  '<draggable style=\*position:fixed;cursor:move;\">moveup</draggable>';
       complileDirective(htmlToTest1); 
       
        function setupDirective() {
            spyOn($document, 'on').andCallThrough();
            elem = angular.element('<div draggable></div>');
            compile(elem)(scope);
            scope.$apply();
        }


    describe('Setting up the template', function () {
        it('Should call mousemove', function () {
            setupDirective();
            //$document.triggerHandler('mousemove'); //TODO: figure out how to trigger this with a which or keycode
            //elem.triggerHandler('mousedown');
   
              var mouseEvent = $.Event('mousedown');
              mouseEvent.keyCode = $.ui.keyCode.mousedown;
              elem.on('mousedown').trigger(mouseEvent); 
              
         
              var mouseEvent1 = $.Event('mousemove');
              mouseEvent1.keyCode = $.ui.keyCode.mousemove;
              elem.on('mousemove').trigger(mouseEvent1); 
              
              
              var mouseEvent2 = $.Event('mouseup');
              mouseEvent2.keyCode = $.ui.keyCode.mousedown;
              elem.on('mouseup').trigger(mouseEvent2); 
         
      
              expect($document.on).toHaveBeenCalled(); //should be calledWith(parameters)
            //TODO: Figure out how to test 2 events at once and how to pass things into document
        
        });
    });



      
       
 /*      var mouseEvent1 = $.Event('mousedown');
        mouseEvent1.screenY =4;
        mouseEvent1.screenX =5;
       mouseEvent1.keyCode = $.ui.keyCode.mousedown;
       elem.on('mousedown').trigger(mouseEvent1);*/
       
  //     mouseEvent1.screenY =4;
   //     mouseEvent1.screenX =5;
   
  //      expect(mouseEvent1.screenY).toBe(4);
    //    expect(mouseEvent1.screenX).toBe(5);
    //    var temp = mouseEvent1.mousemove();
       
       
 /*     var mouseEvent = $.Event('mousedown.mousemove');
       mouseEvent.keyCode = $.ui.keyCode.mousemove;  
       mouseEvent.screenY =4;
        mouseEvent.screenX =5;
        elem.trigger(mouseEvent);
   //    elem.on('mousedown').mousemove().trigger(mouseEvent);
  //      mouseEvent.screenY =4;
  //      mouseEvent.screenX =5;
        expect(mouseEvent.screenY).toBe(4);
        expect(mouseEvent.screenX).toBe(5);
        
        */
     
        



       
      //  elem.on('mouseup').mousemove;
       // elem.on('mousedown');
        
 /*       var htmlToTest1 = '<div>draggable div</div>'
        complileDirective(htmlToTest1); 
        elem.screenX =1;
        elem.x =3;
  */      
 //       var mouseEvent = $.Event('mousedown');
//        mouseEvent.screenX =1;
//        mouseEvent.y =3;
      //  expect(elem.startX).toBe(1);
//        mouseEvent.screenX =1;
 //       mouseEvent.x =3;
  //      mouseEvent.y =3;
   //     elem.on('mousedown').trigger(mouseEvent);
    
         
        
       //  expect(elem.on('mouseup').value()).toBe("mouseup");
        //         expect(elem.on('mousedown').document("mouseup").value()).toBe('mouseup');
 /*       mouseEvent.keyCode = $.ui.keyCode.mousemove;  
        elem.on('mousemove').trigger(mouseEvent);
        
        elem.startX =1;
        elem.startY =3;
        elem.triggerHandler('mousedown');
     */   
  /*      var mouseEvent0 = $.Event('mousemove');

        elem.on('mousemove').trigger(mouseEvent0);
        
        elem.mousedown();
        elem.mousemove();
        
        elem.mouseup();
    */    
        
       // var htmlToTest2 = '<span draggable>Drag ME</span>'
       // complileDirective(htmlToTest2); 

/*        elem.on().mousemove;
        elem.on().mousemove.screenY =1;
        expect(elem.on().mousemove.screenY).toBe(1);
      //  expect(scope.y).toBe(1);
      
      expect(elem.on("mousedown")).toBeDefined();
      expect(elem.mousemove()).toBeDefined();
      expect(elem.mouseup()).toBeDefined();
 */     
      //below 4 lines increase coverage for mousedown
   /* var mouseEvent1 = $.Event('mousedown');
    mouseEvent1.screenY =1;
    mouseEvent1.screenX =3;

    elem.on('mousedown').trigger(mouseEvent1);
    mouseEvent1.screenY =1;
    mouseEvent1.screenX =3;

    expect(mouseEvent1.screenY).toBe(4);
    expect(mouseEvent1.screenX).toBe(3);
    */ 
      //
      
   /*  
                   var mouseEvent2 = $.Event('mousemove');
                          mouseEvent2.screenY =4;
                    mouseEvent2.screenX =5;

        elem.on('mousedown').mousemove().trigger(mouseEvent2);
        expect(mouseEvent2.screenY).toBe(4);
        expect(mouseEvent2.screenX).toBe(5);
        
        var mouseEvent3 = $.Event('mouseup');
        elem.on('mousedown').mouseup().trigger(mouseEvent3);*/
   //     expect(mouseEvent3.$document.unbind("mousemove")).toBe("mousemove")

    


      
       
    });
    

});