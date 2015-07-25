angular.module('canopi.app').controller('TopologyViewController', ['$scope', '$location', '$rootScope', '$state', 'Cache', '$filter',
                                       function ($scope, $location, $rootScope, $state, Cache, $filter) {
	'use strict';
	
    init();
 
    
    function init() {
 			
       setupScopeValuesAndMethods();
       
      
    
    }  
        
    
    function setupScopeValuesAndMethods() {
    	var i=0;	
    	$scope.myData = {};
    	
        $scope.myData.doClick = function(e) {
        	
        	
        	var newState = $('<div>').attr('id', 'state' + i).addClass('topologyItem');
            
            var title = $('<div>').addClass('topologyTitle').text('State ' + i);
            var connect = $('<div>').addClass('topologyConnect');
            
            newState.css({
              'top': e.pageY,
              'left': e.pageX
            });
            
            jsPlumb.makeTarget(newState, {
              anchor: 'Continuous'
            });
            
            jsPlumb.draggable(newState, {
              containment: 'parent'
            });

            jsPlumb.makeSource(connect, {
              parent: newState,
              anchor: 'Continuous'
            });

            newState.dblclick(function(e) {
              jsPlumb.detachAllConnections($(this));
              $(this).remove();
              e.stopPropagation();
            });
            
            newState.append(title);
            newState.append(connect);
            
            $('#topologyContainer').append(newState);
            
            i++;
        };
    
        $scope.name = "TopologyView";
        	
    }
}]);