angular.module('canopi.service').factory('HttpInterceptorService', ['$q', '$log', 'MessagesService',
                              function ($q, $log, MessagesService) {
	
	'use strict';

	 return {
		 // On request success
		 request: function (config) {
		    // $log.info("[request => " + angular.toJson(config)); // Contains the data about the request before it is sent.

		     // Return the config or wrap it in a promise if blank.
		     return config || $q.when(config);
		 },
		 
		 // On request failure
		 requestError: function (rejection) {
		     $log.info("[request failure => " + angular.toJson(rejection)); // Contains the data about the error on the request.
	
		     // Return the promise rejection.
		     return $q.reject(rejection);
		 },
		 
		 response: function(response) {
			 
			// $log.info("[response => " + angular.toJson(responsErrorMessageService.addMessage("Test", "error");

             // Return the response or promise.
			 return response || $q.when(response);
         },
         
         // On response failure
         responseError: function (rejection) {
	        // $log.info("[response failure => rejection " + angular.toJson(rejection)); // Contains the data about the error.
	         $log.info("[response failure => status " + rejection.status);
	         $log.info("[response failure => headers " + angular.toJson(rejection.config.headers));
	         $log.info("[response failure => url " + angular.toJson(rejection.config.url));

             MessagesService.addMessage('Server Error ' + rejection.status + ' at ' + rejection.config.url, "error");

	         // Return the promise rejection.
	         return $q.reject(rejection);
         }
         
	 };
 	
}]);
