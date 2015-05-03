angular.module('canopi.service').service('CommonUtilJsonService', ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants', 
                              function ($q, $http, $log, Cache, CanopiGuiConstants) {
	
	'use strict';

	//var controllerName = MOCK_DATA_FLAG ? 'commonmock' : 'common';
	var controllerName = 'common';  
        
        var baseUrl = '';

        // running E2E test from Eclipe
        if (CanopiGuiConstants.END_TO_END_REST_CALL) {
            baseUrl = '/canopigui/rest/' + controllerName;
        }
        else { // running from NetBeans
            baseUrl = 'http://d5ibp1m1.snt.bst.bls.com:4030/canopigui/rest/' + controllerName;
        }

        
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
            var fullUrl = '';

            if (CanopiGuiConstants.END_TO_END_REST_CALL) {
                fullUrl = baseUrl + '/serverInfo/get';
            }
            else { // running from NetBeans
                fullUrl = '/gui-canopi-js/src/app/admin-app/mock/adminmain/response/serverinfo.json';
            }
        
            $http.get(fullUrl).success(function (response) {
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