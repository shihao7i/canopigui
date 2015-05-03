angular.module('canopi.service').service('CommonUtilJsonService', ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants', 
                              function ($q, $http, $log, Cache, CanopiGuiConstants) {
	
	'use strict';

	//var controllerName = MOCK_DATA_FLAG ? 'commonmock' : 'common';
	var controllerName = 'common';   

    var baseUrl = '/canopigui/rest/' + controllerName;
	
	this.getUser = function (attUid) {

		var user = Cache.get('loggedinuser');
		
		var deferred = $q.defer();
		
		if (!user) {
		
	        $http({
                    method: 'GET',
                    url: baseUrl + '/user/get/' + attUid
                }).
                success(function (response) {
	        	 
	        	// populate user object
	            user = {
		    	    attUid: 	response.attUid,
		    	    firstName: 	response.firstName,
		    	    lastName: 	response.lastName,
		    	    email: 	response.email,
		    	    tn: 	response.tn	
			    };
	            
	            Cache.put('loggedinuser', user);

	            $log.debug("retrieve user data from BE");
	        	  
	            deferred.resolve(user);
	              
	        }).
                error(function () {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    deferred.reject();
                });
	 	} else {
                    deferred.resolve(user);
                    $log.info("retrieve user data from Cache");
		}    
        
         return deferred.promise; 
	};

	
	this.getServerInfo = function () {

		 var deferred = $q.defer();
         $http.get(baseUrl + '/serverInfo/get').success(function (response) {
             deferred.resolve(response);
         });
       
         return deferred.promise; 
	};
	
	
	
	this.getPicklistValues = function () {

		 var deferred = $q.defer();
         $http.get(baseUrl + '/picklists/get').success(function (response) {
             deferred.resolve(response);
         });
       
         return deferred.promise; 
	};
		

}]);