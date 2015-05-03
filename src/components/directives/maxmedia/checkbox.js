/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:
      
   <div checkbox id="checkbox4" value="CheckBox 4"  state="isChecked"></div>
     
   [Example of the model data set in the controller]:
   
   $scope.isChecked = false;   // initialized to unchecked state
     
 *  
 */


angular.module('maxmedia.directive').directive('checkbox', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',
		scope: {
			id: '@',
			value: '@',
			isChecked: "=state"
		},
		
		template : '<div class="checkbox-group">' +
		           '  <label for="{{id}}" class="checkbox-container" ng-class="{active: isChecked}" >' +
		           '    <input name="{{id}}" type="checkbox" class="checkbox-input sr-only" value="{{value}}">' +
                   '    <span class="checkbox-button" ng-click="toggleMe()"></span>' +
                   '    <span class="checkbox-text">{{value}}</span>' + 
                   '  </label>' +
                   '</div',
	               
	    link: function (scope, element, attrs) {

	    	scope.toggleMe = function () {
	    		scope.isChecked = !scope.isChecked;  
		    };
		}
	};
}]);

