/**
 * This directive is used to display user message on the GUI screen.
 * 
 * The display of the message box uses Bootstrap css
 *  
   [Example of the directive usage in html]:
   
   <div user-message message="The message to be displayed goes here" type="warning"></div>
 *  
 */

(function() {
    'use strict';
  
    angular.module('canopi.directive')
           .directive('userMessage', userMessage);


    function userMessage() {
        var directive = {
            restrict: 'EA',
            scope: {
                message: "@",
                type: "@"
            },  
            template: '<div ng-show="vm.showMessage" ng-class="messageType" ng-init="vm.showMessage=true"' +
              '<span><i ng-class="messageIcon"></i>&nbsp;&nbsp;</span>' +
              '<span>{{vm.message}}</span>' +
              '<button type="button" class="close" ng-click="vm.showMessage=false"><span aria-hidden="true"><i class="fa fa-times"></i></span><span class="sr-only">Close</span></button>' +
              '</div>',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
        };
	
        return directive;
        
        ////
        
    }
	
        
    controller.$inject = ['HelperUtilService'];
    
    function controller(HelperUtilService) {
        var vm = this;

        var messageObj = HelperUtilService.getMessageAndType(vm.message, vm.type);

        vm.messageIcon = messageObj.icon;
        vm.messageType = messageObj.type;  
    }
    
})();

