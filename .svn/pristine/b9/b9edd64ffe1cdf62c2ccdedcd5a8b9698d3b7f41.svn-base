/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia 
 * 
 * isLoading is a boolean (true or false) value.   
 * 
 * set this value in the controller code before the BE call is made:
 * $scope.isLoading = true 
 * 
 * set this value in the controller code after the data is retrieved from the BE:
 * $scope.isLoading = false
 *
 * 
   [Examples of the directive usage in html]:
   
   <div activity-indicator="isLoading"></div>       <= will use default message 
   
                     or
   
   <div activity-indicator="isLoading" message="Making WebService Call...Please Wait"></div>   <= will use the message specified in the message attribute 

 *  
 */


angular.module('maxmedia.directive').directive('activityIndicator', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',
  		scope: {
			activityIndicator: "="
		},
		template : '<div ng-show="activityIndicator" class="activity-indicator">' +
		           '<div class="loader"></div>' +
		           '<span>{{message}}</span>' +
		           '</div>',
	               
	    link: function (scope, element, attrs) {

	    	scope.message = (attrs.message !== undefined && attrs.message.length > 0) ? attrs.message : 'Loading...Please Wait';

		}
	};
}]);