/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:
   
   <div checkbox-group checkboxes="checkboxList"></div>
     
   [Example of the model data set in the controller]:
   
   $scope.checkboxList = [ {id: 'checkbox1', value: 'Checkbox 1', isChecked: false},
                           {id: 'checkbox2', value: 'Checkbox 2', isChecked: false},
                           {id: 'checkbox3', value: 'Checkbox 3', isChecked: false}];
     
 *  
 */


angular.module('maxmedia.directive').directive('checkboxGroup', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',	
		scope: {
			checkboxes: "="
		},
		template :  '<div class="checkbox-group" ng-repeat="checkbox in checkboxes track by $index">' +
		            '  <label for="{{checkbox.id}}" class="checkbox-container" ng-class="{active: checkbox.isChecked}" >' +
		            '    <input name="{{checkbox.id}}" type="checkbox" class="checkbox-input sr-only" value="{{checkbox.value}}" checked="{{checkbox.isChecked}}">' +
                            '    <span class="checkbox-button" ng-click="toggleMe($index)"></span>' +
                            '    <span class="checkbox-text">{{checkbox.value}}</span>' + 
                            '  </label>' +
		            '</div>',
	               
	    link: function (scope, element, attrs) {
	    
	    	scope.toggleMe = function (index) {
	    		scope.checkboxes[index].isChecked = !scope.checkboxes[index].isChecked;  
	
	    	//	$log.debug("[index " + index + "] isChecked => " + scope.checkboxes[index].isChecked);
		    };
		}
	};
}]);

