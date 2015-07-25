/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:
      
   <div checkbox id="checkbox4" value="CheckBox 4"  state="vm.isChecked"></div>
     
   [Example of the model data set in the controller]:
   
   vm.isChecked = false;   // initialized to unchecked state
     
 *  
 */

(function() {
    'use strict';

    angular.module('maxmedia.directive')
           .directive('checkbox', checkbox);

    checkbox.$inject = ['$log'];    

    function checkbox($log) {
         var directive = {
            restrict: 'EA',
            scope: {
                id: '@',
                value: '@',
                isChecked: "=state"
            },
            template :  '<div class="checkbox-group">' +
                        '  <label for="{{vm.id}}" class="checkbox-container" ng-class="{active: vm.isChecked}" >' +
                        '    <input name="{{vm.id}}" type="checkbox" class="checkbox-input sr-only" value="{{vm.value}}">' +
                        '    <span class="checkbox-button" ng-click="vm.toggleMe()"></span>' +
                        '    <span class="checkbox-text">{{vm.value}}</span>' + 
                        '  </label>' +
                        '</div',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };
	
        return directive;
        
        ////
    }
    
            
    function controller() {

        var vm = this;

        vm.toggleMe = function () {
            vm.isChecked = !vm.isChecked;  
        };
    }
    
})();
