(function() {
    'use strict';
    
    angular.module('canopi.service')
           .factory('HttpInterceptorService', httpInterceptorService);

    httpInterceptorService.$inject = ['$q', '$log', 'MessagesService'];    

    function httpInterceptorService($q, $log, MessagesService) {
        
       var service = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
  
        };
        
        return service;
        
        ///////
        
        // On request success
        function request(config) {
           // $log.info("[request => " + angular.toJson(config)); // Contains the data about the request before it is sent.

            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        }

        // On request failure
        function requestError(rejection) {
            //$log.info("[request failure => " + angular.toJson(rejection)); // Contains the data about the error on the request.

            $log.info("[request failure => status " + rejection.status);
            $log.info("[request failure => headers " + angular.toJson(rejection.config.headers));
            $log.info("[request failure => url " + angular.toJson(rejection.config.url));

            MessagesService.addMessage('Request Error ' + rejection.status + ' at ' + rejection.config.url, "error");

            // Return the promise rejection.
            return $q.reject(rejection);
        }

        function response(response) {
            
            if(!!response.data){
                if((!!response.data.returnCode) && (response.data.returnCode !== "0")) {
                    var errMsg = response.data.returnMessage !== undefined ? response.data.returnMessage : "Unexpected Response";
                    MessagesService.addMessage('Server Error: ' + errMsg, "error");
                    
                    $log.debug("response => " + angular.toJson(response.data));
           
                    return $q.reject(response);
                } else {
                    return response || $q.when(response);
                }
            }

            // $log.info("[response => " + angular.toJson(responsErrorMessageService.addMessage("Test", "error");

            // Return the response or promise.
            return response || $q.when(response);
        }
        
        // On response failure
        function responseError(rejection) {
            // $log.info("[response failure => rejection " + angular.toJson(rejection)); // Contains the data about the error.
            $log.info("[response failure => status " + rejection.status);
            $log.info("[response failure => headers " + angular.toJson(rejection.config.headers));
            $log.info("[response failure => url " + angular.toJson(rejection.config.url));

            MessagesService.addMessage('Server Error ' + rejection.status + ' at ' + rejection.config.url, "error");

            // Return the promise rejection.
            return $q.reject(rejection);
         }
        
    }
    
})();

