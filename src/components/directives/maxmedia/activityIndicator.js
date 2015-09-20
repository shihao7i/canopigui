/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia 
 * 
 * isLoading is a boolean (true or false) value.   
 * 
 * set this value in the controller code before the BE call is made:
 * vm.isLoading = true 
 * 
 * set this value in the controller code after the data is retrieved from the BE:
 * vm.isLoading = false
 *
 * 
   [Examples of the directive usage in html]:
   
   <div activity-indicator="vm.isLoading"></div>       <= will use default message 
   
                     or
   
   <div activity-indicator="vm.isLoading" message="Making WebService Call...Please Wait"></div>   <= will use the message specified in the message attribute 

 *  
 */

(function() {
  'use strict';

  angular
    .module('maxmedia.directive')
    .directive('activityIndicator', activityIndicator);

  activityIndicator.$inject = ['$log'];

  function activityIndicator($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        activityIndicator: '=',
        message: '@?'
      },
      template:
        '<div ng-show="vm.activityIndicator" class="activity-indicator">' +
        '<div class="loader"></div>' +
        '<span>{{vm.message}}</span>' +
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

    vm.message =
      !!vm.message && vm.message.length > 0
        ? vm.message
        : 'Loading...Please Wait';
  }
})();
