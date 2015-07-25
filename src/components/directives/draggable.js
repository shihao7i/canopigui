// Draggable directive from: http://docs.angularjs.org/guide/compiler
(function() {
    'use strict';
    
    angular.module('drag', [])
           .directive('draggable', draggable);

    function draggable() {
        var directive = {
            restrict: 'EA',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };
	
        return directive;
        
        ////
    }
    
    controller.$inject = ['$document', '$element'];    
     
    function controller($document, $element) {
        var vm = this;
        
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
        
        $element.css({
            position: 'fixed',
            cursor: 'move'
        });

        $element.on('mousedown', function (event) {
            // Prevent default dragging of selected content
            // event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            $element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }

})();

