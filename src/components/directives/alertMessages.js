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

angular.module('canopi.directive').directive('alertMessages', ['MessagesService', '$log', '$compile', function (MessagesService, $log, $compile) {
	'use strict';

	//testing commit
	return {
		
        restrict: 'EA',

        controller: ['$scope',function($scope) {
        	$scope.removeMessage = function(idx) {
                MessagesService.removeMessage(idx);
        	};
        }],          
      
		link: function ( scope, element, attrs ) {
		
			scope.$watch(

                function() {
                    //watch the value in service changes
                    return MessagesService.getMessages();
                },

                function()  {

                    var templateInfo = '<div ng-show="hasMessage" class="customAlerts" ng-class="msg.type" ng-repeat="msg in messageList">' +
                                       '<span><i ng-class="msg.icon""></i>&nbsp;&nbsp;</span>' +
                                       '<span>{{msg.message}}</span>' +
                                       '<button type="button" class="close" ng-click="removeMessage($index)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +

                                       '</div>';

                    scope.messageList = MessagesService.getMessages();
                
                    scope.hasMessage = scope.messageList !== undefined && scope.messageList !== null && scope.messageList.length > 0;
                    
                    $(".alertMessagesContainer").empty();
                    if(scope.messageList.length > 0) {
                        var appendTemplate = $compile(templateInfo)(scope);
                        element.append(appendTemplate);
                    }

                   // $log.info("link........... $scope.hasMessage = " + scope.hasMEssage);
                   // $log.info("link........... $scope.messageList = " + angular.toJson(scope.messageList));
                }
            );

		}
	};
}]);