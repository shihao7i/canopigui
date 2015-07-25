/**
 * This directive is used to show the alert messages on top of the screen (right below the main menu bar) 
 * 
 * The display of the message boxes uses Bootstrap css
 * 
   The following $http interceptor is configured in app.js.   
   HttpInterceptorService is for generic error handling for the entire application.  
   It captures the runtime and application errors for all the $http calls made from GUI FE and 
   pushes the messages for display via MessagesService 
  
   angular.module('canopi.service').config(['$httpProvider', function($httpProvider) {
       $httpProvider.interceptors.push('HttpInterceptorService');
   }]);

   DI: HttpInterceptorService<-MessagesService
  
   DI: alertMessages directive<-MessagesService<-HelperUtilService
  
   [Example of the directive usage in html]:
   
    <div class="alertMessagesContainer" alert-messages> </div>

    Note: Add the following class to your stylesheet; there is a class in Angular 1.4 that prevents the alerts from displaying

    .alertMessagesContainer .customAlerts {
      display: block !important;
    }
 *  
 */


(function() {
    'use strict';
    
    angular.module('canopi.directive')
           .directive('alertMessages', alertMessages);

    alertMessages.$inject = ['$log', '$compile'];    

    function alertMessages($log, $compile) {
        var directive = {
            restrict: 'EA',
            controller: controller,
            controllerAs: 'vm',
            link: link
        };
	
	return directive;
        
        ////
   
        function link( scope, element, attrs, ctrl ) {
            
            scope.$watch(

                function() {
                    //watch the value in service changes
                    return ctrl.hasMessage();
                },
                function() {

                    var template = '<div ng-show="vm.hasMessage()" class="customAlerts" ng-class="msg.type" ng-repeat="msg in vm.getMessages()">' +
                       '<span><i ng-class="msg.icon"></i>&nbsp;&nbsp;</span>' +
                       '<span>{{msg.message}}</span>' +
                       '<button type="button" class="close" ng-click="vm.checkMessgeList(); vm.removeMessage($index);"><span aria-hidden="true"><i class="fa fa-times"></i></span><span class="sr-only">Close</span></button>' +
                       '</div>';
        

                    //ctrl.messageList = ctrl.getMessages();
                    //ctrl.hasMessage = ctrl.messageList !== undefined && ctrl.messageList !== null && ctrl.messageList.length > 0;

                    $(".alertMessagesContainer").empty();
                    //if(ctrl.messageList) {
                        var appendTemplate = $compile(template)(scope);
                        element.append(appendTemplate);

                    //}
            
                }
            );
        }
    }
    
    controller.$inject = ['MessagesService']     
          
    function controller(MessagesService) {
        var vm = this;

        vm.hasMessage = function() {
            return (vm.getMessages().length > 0);
        };

        vm.getMessages = function() {
            return MessagesService.getMessages();
        };

        vm.removeMessage = function(idx) {
            MessagesService.removeMessage(idx);
        };

        vm.checkMessgeList = function() {
            MessagesService.checkMessgeList();
        };
    }        
    
})();

