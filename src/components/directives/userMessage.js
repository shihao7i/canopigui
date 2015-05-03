/**
 * This directive is used to display user message on the GUI screen.
 * 
 * The display of the message box uses Bootstrap css
 *  
   [Example of the directive usage in html]:
   
   <div user-message message="The message to be displayed goes here" type="warning"></div>
 *  
 */

angular.module('canopi.directive').directive('userMessage', ['HelperUtilService', '$log', function (HelperUtilService, $log) {
	'use strict';

	return {
		
        restrict: 'EA',

     	scope: {
			message: "@",
			type: "@"
		},
      
		template: '<div ng-show="showMessage" ng-class="messageType" ng-init="showMessage=true"' +
                  '<span><i ng-class="messageIcon"></i>&nbsp;&nbsp;</span>' +
                  '<span>{{message}}</span>' +
                  '<button type="button" class="close" ng-click="showMessage=false"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                  '</div>',
		
		link: function ( scope, element, attrs ) {
			
            var messageObj = HelperUtilService.getMessageAndType(attrs.message, attrs.type);
            
            scope.messageIcon = messageObj.icon;
            scope.messageType = messageObj.type;

		}
	};
}]);
