/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
 * 
   [Example of the directive usage in html]:
   
   <div checkbox-group checkboxes="vm.checkboxList"></div>
     
   [Example of the model data set in the controller]:
   
   vm.checkboxList =  [ {id: 'checkbox1', value: 'Checkbox 1', isChecked: false},
                        {id: 'checkbox2', value: 'Checkbox 2', isChecked: false},
                        {id: 'checkbox3', value: 'Checkbox 3', isChecked: false}];
     
 *  
 */

(function() {
  'use strict';

  angular
    .module('maxmedia.directive')
    .directive('checkboxGroup', checkboxGroup);

  checkboxGroup.$inject = ['$log'];

  function checkboxGroup($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        checkboxes: '='
      },
      template:
        '<div class="checkbox-group" ng-repeat="checkbox in ::vm.checkboxes track by $index">' +
        '  <label for="{{checkbox.id}}" class="checkbox-container" ng-class="{active: checkbox.isChecked}" >' +
        '    <input name="{{checkbox.id}}" type="checkbox" class="checkbox-input sr-only" value="{{checkbox.value}}" checked="{{checkbox.isChecked}}">' +
        '    <span class="checkbox-button" ng-click="vm.toggleMe($index)"></span>' +
        '    <span class="checkbox-text">{{checkbox.value}}</span>' +
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

    vm.toggleMe = function(index) {
      vm.checkboxes[index].isChecked = !vm.checkboxes[index].isChecked;

      //$log.debug("[index " + index + "] isChecked => " + vm.checkboxes[index].isChecked);
    };
  }
})();
