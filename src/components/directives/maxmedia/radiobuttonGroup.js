/* This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:

   Assuming ControllerAs: vm
   
   <div radiobutton-group radiolist="vm.radiolist"></div>
     
   [Example of the model data set in the controller]:
   
   vm.radiolist = [ {id: 'radio1', value: 'Radio Button 1', isSelected: false},
                    {id: 'radio2', value: 'Radio Button 2', isSelected: false},
                    {id: 'radio3', value: 'Radio Button 3', isSelected: false}];
     
 *  
 */

(function() {
    'use strict';
    
    angular.module('maxmedia.directive')
           .directive('radiobuttonGroup', radiobuttonGroup);

    radiobuttonGroup.$inject = ['$log'];    

    function radiobuttonGroup($log) {
         var directive = {
            restrict: 'EA',
            scope: {
                radiolist: "="
            },
            template :  '<div class="radio-group" ng-repeat="radio in ::vm.radiolist track by $index">' +
                        '  <label for="{{radio.id}}" class="radio-container"  ng-class="{active: radio.isSelected}">' +
                        '    <input name="{{radio.id}}" type="radio" class="radio-input sr-only" value="{{radio.value}}" checked="{{radio.isSelected}}">' +
                        '    <span class="radio-button" ng-click="vm.toggleMe($index)"></span>' +
                        '    <span class="radio-text">{{radio.value}}</span>' + 
                        '  </label>' +
                        '</div>',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };
	
        return directive;
        
        ////
  
    }
    
    function controller() {
        var vm = this;

        vm.toggleMe = function (index) {

            //Deselect all radio buttons selections
            for (var i = 0; i < vm.radiolist.length; i++) {
                vm.radiolist[i].isSelected = false;  
            }        

            //Select the radio button selected
            vm.radiolist[index].isSelected = !vm.radiolist[index].isSelected;  
        };
    };

})();



