(function() {
    'use strict';
    
    angular.module('canopi.service')
           .factory('CommonUtilJsonService', commonUtilJsonService);
	
    commonUtilJsonService.$inject = ['$q', '$http', '$log', 'Cache', 'CanopiGuiConstants'];    
        
    function commonUtilJsonService($q, $http, $log, Cache, CanopiGuiConstants) {
        
        //var controllerName = MOCK_DATA_FLAG ? 'commonmock' : 'common';
	var controllerName = 'common';  
        
        //==========================================================================================
        //TODO:  Need to modify the logic below when we resume the CANOPI GUI migration work ...
        //==========================================================================================
        // get the restful URL context root based on the configuration set in constants.js
        // Note: Due to the hoisting rule in function expression - use IIFE to set the baseUrl value
        //       before the value is used in all the functions (otherwise, baseUrl value is undefined)
     
        var baseUrl = (function() {  
            
            var baseUrl = '';
            
            if (CanopiGuiConstants.END_TO_END_REST_CALL) {  
                baseUrl = '/canopigui/rest/' + controllerName;
            }
            else {
                //if (CanopiGuiConstants.MOCK_DATA_FLAG) {
                //    baseUrl = '/gui-canopi-js/src/';
                //} 
                //else { // Note: the host name and port number for the test environment is set in constants.js
                    //For example:   http://d5ibp1m1.snt.bst.bls.com:4030/canopigui/rest/common/serverInfo/get'
                    baseUrl = 'http://' + CanopiGuiConstants.HOSTNAME_PORT_SETTING_FROM_NETBEANS + '/canopigui/rest/' + controllerName;
                //}
            }

            return baseUrl;
            
        })();


        var service = {
            getUser: getUser,
            getServerInfo: getServerInfo,
            isAdminGuiAuthorizedUser: isAdminGuiAuthorizedUser,
            getPicklistValues: getPicklistValues
    
        };
        
        return service;


        function getUser(attUid) {

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
                            attUid:    response.attUid,
                            firstName: response.firstName,
                            lastName:  response.lastName,
                            email:     response.email,
                            tn:        response.tn	
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

	
        
	function getServerInfo() {

            var deferred = $q.defer();
            var fullUrl = '';

            // Temporary overwrite for Admin GUI 
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
	
	
	//BooleanWrapper isAdminGuiAuthorizedUser(@PathVariable("attUid") String attUid)
	
	function isAdminGuiAuthorizedUser(attUid) {

            var deferred = $q.defer();
            var fullUrl = '';

            // Temporary overwrite for Admin GUI 
            if (CanopiGuiConstants.END_TO_END_REST_CALL) {
                fullUrl = baseUrl + '/adminusercheck/' + attUid;
            }
            else { // running from NetBeans
                fullUrl = '/gui-canopi-js/src/app/admin-app/mock/adminmain/response/admin-user-check-response.json';
            }

            $http.get(fullUrl).success(function (response) {
                deferred.resolve(response.statusFlag);
            });

            return deferred.promise; 
	};
	
	
	
	function getPicklistValues() {

            var deferred = $q.defer();
            $http.get(baseUrl + '/picklists/get').success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise; 
        };
		
                
    }
})();

