/* This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:
   
   <div radiobutton-group radioList="radiolist"></div>
     
   [Example of the model data set in the controller]:
   
   $scope.radiolist = [ {id: 'radio1', value: 'Radio Button 1', isSelected: false},
                        {id: 'radio2', value: 'Radio Button 2', isSelected: false},
                        {id: 'radio3', value: 'Radio Button 3', isSelected: false}];
     
 *  
 */


angular.module('maxmedia.directive').directive('radiobuttonGroup', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',	
		scope: {
			radiolist: "="
		},
		
		template : '<div class="radio-group" ng-repeat="radio in radiolist track by $index">' +
                   '  <label for="{{radio.id}}" class="radio-container"  ng-class="{active: radio.isSelected}">' +
                   '    <input name="{{radio.id}}" type="radio" class="radio-input sr-only" value="{{radio.value}}" checked="{{radio.isSelected}}">' +
                   '    <span class="radio-button" ng-click="toggleMe($index)"></span>' +
                   '    <span class="radio-text">{{radio.value}}</span>' + 
                   '  </label>' +
                   '</div>',
		
		
	    link: function (scope, element, attrs) {
	    	
	    	scope.toggleMe = function (index) {
	    		
                        //Deselect all radio buttons selections
                        for (var i = 0; i < scope.radiolist.length; i++) {
                            scope.radiolist[i].isSelected = false;  
                        }        
                        
                        //Select the radio button selected
                        scope.radiolist[index].isSelected = !scope.radiolist[index].isSelected;  

		    };
		}
	};
}]);

