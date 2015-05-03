angular.module('admin.service').service('AdminJsonService', ['$q', '$http', '$log', 'AdminGuiConstants', 
                              function ($q, $http,$log, AdminGuiConstants) {
	
    'use strict';
	
    var contextRoot = "";
 
    // running E2E test from Eclipe
    if (AdminGuiConstants.END_TO_END_REST_CALL) {
        contextRoot = '/canopigui/';
    }
    else { // running from NetBeans
        contextRoot = '/gui-canopi-js/src/';
    }

    var baseUrl = '';
    
    // =======================================================
    // Restful service for Server Info display in About Dialog 
    // =======================================================
        
    this.getAdminGuiServerInfo = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/adminmain/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'serverinfo.json').success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise; 
    };
	
    // ===============================================
    // Restful services for Lookup & Pick Lists screen  
    // ===============================================
    
    /**
     * Gets the the lookuptypes
     *
     * @param lookupType
     * @param options Optional parameters to configure the request
     * @returns {*} Promise
     */
    this.getLookupType = function (lookupType, options) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/lookupadmin/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + lookupType + '.json').success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    };
        
                                  
    // ===============================================
    // Restful services for Rule Administration screen                             
    // ===============================================  
       
    /**
     * Gets the the rule categories
     *
     * @param categoryType
     * @param options Optional parameters to configure the request
     * @returns {*} Promise
     */
    this.getRuleCategory = function (categoryType, options) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/ruleadmin/response/'; 
        
        var deferred = $q.defer();
        $http.get(baseUrl + categoryType + '.json').success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    };
    
                                  
    // ===============================================
    // Restful services for Workorder Templates screen                             
    // ===============================================
    
    this.getWoTemplateColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'wo-template-column-defs.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    
    
    this.getUDAColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'uda-column-defs.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    
    
    
    this.getLinksColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'links-column-defs.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    
        
    this.getPOTypes = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'get-potypes-response.json').success(function (response) {
             deferred.resolve(response.data);
        });

        return deferred.promise; 
    };

	
	
    this.getWOTypes = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'get-wotypes-response.json').success(function (response) {
             deferred.resolve(response.data);
        });
   
        return deferred.promise; 
    };
        
	
    this.getPOSearchResults = function (poTypeList) {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'order-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };



    this.getWOSearchResults = function (woTypeList) {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'wo-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };



    this.getWOSearchResults = function (woType) {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'wo-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };



    this.getWODetails = function (woType) {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'wo-details-response.json').success(function (response) {
            
            var woDetails = response.data;
            
            var woDetails = 
                    {
                        tasklist: {},
                        uda: {},
                        links: {}
                    };
            
            for (var i=0; i < response.data.length; i++) {
                
                switch (response.data[i].tableName) {
                    case 'Task List': 
                        woDetails.tasklist = response.data[i].tableRows;
                        break;  
                    case 'UDA': 
                        woDetails.uda = response.data[i].tableRows;
                        break;
                    case 'Links': 
                        woDetails.links = response.data[i].tableRows;
                        break; 
                }
 
            }

            deferred.resolve(woDetails);
        });

        return deferred.promise; 
    };
            
            
           
                                  
    // ===================================================================
    // Restful services for Tasks on Tasks and Workorder Templates screens                             
    // ===================================================================

    this.getTaskListColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'tasklist-column-defs.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    

    /* Gets the the tasktypes
     *
     * @param taskType
     * @param options Optional parameters to configure the request
     * @returns {*} Promise
     */
    this.getTaskType = function (taskType, options) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  
        
        var deferred = $q.defer();
        $http.get(baseUrl + taskType + '.json').success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    };


    this.getSearchResults = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  

        var deferred = $q.defer();
        $http.get(baseUrl + 'results.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };

    this.getTasks = function (workorderType) {

        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  
        
        if (!workorderType) workorderType = '';

        var deferred = $q.defer();
        $http.get(baseUrl + workorderType + 'tasklist.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };   

    this.getAllTasks = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  
        
        var deferred = $q.defer();
        $http.get(baseUrl  + 'task-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };   
    
    
    this.getSubTasks = function (workorderType) {

        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  
        
        if (!workorderType) workorderType = '';

        var deferred = $q.defer();
        $http.get(baseUrl + workorderType + 'subtasklist.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };   
    
    
    
    this.getTaskCodeNameList = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';  
        
        var deferred = $q.defer();
//      Temporarily switching to tasklist.json until the new service is available as per iRise mockup
//        $http.get(baseUrl + 'taskcodenamelist.json').success(function (response) {
//             deferred.resolve(response);
//        });
        $http.get(baseUrl + 'taskcodenamelist.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    }; 
    
    
    // =====================================================
    // Restful services for Admin GUI Activity Search screen                             
    // =====================================================
    
    this.getActivityTypes = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/utility/response/';  
        
        var deferred = $q.defer();
        $http.get(baseUrl  + 'activitytypepicklist.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };   


    this.getActivitySearchResults = function () {

        baseUrl = contextRoot + 'app/admin-app/mock/utility/response/';  
        
        var deferred = $q.defer();
        $http.get(baseUrl  + 'activity-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };   
    

}]);