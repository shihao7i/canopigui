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
        $http.get(baseUrl + 'wo-template-column-defs-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    
    
    this.getUDAColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'uda-column-defs-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };
    
    
    
    this.getLinksColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'links-column-defs-response.json').success(function (response) {
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



    this.getWOSearchResults = function (woType) {

        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'wo-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    };


    //make separate Restful calls to retrieve the data for child tables
    //and pass the aggregate object back
    this.getWODetails = function (woType) {

        var deferred = $q.defer();

        var woDetails = 
            {
                tasklist: {},
                uda: {},
                links: {}
            };
            
            
        var tasklist = this.getTaskListForWO(woType);
        var uda = this.getUDAForWO(woType);
        var links = this.getLinksForWO(woType);
   
        $q.all([tasklist, uda, links]).then(function(results){
            woDetails.tasklist = results[0].tableRows;
            woDetails.uda = results[1].tableRows;
            woDetails.links = results[2].tableRows;

            deferred.resolve(woDetails);    
        });
        
        return deferred.promise; 
    };
    
    
    //make separate Restful calls to retrieve the column definitions for child tables
    //and pass the aggregate object back
    this.getColumnDefinitionsForWOChildTables = function () {

        var deferred = $q.defer();

        var woDetails = 
            {
                tasklist: {},
                uda: {},
                links: {}
            };
            
            
        var tasklist = this.getTaskListColumnDefs();
        var uda = this.getUDAColumnDefs();
        var links = this.getLinksColumnDefs();
   
        $q.all([tasklist, uda, links]).then(function(results){
            woDetails.tasklist = results[0].tableRows;
            woDetails.uda = results[1].tableRows;
            woDetails.links = results[2].tableRows;

            deferred.resolve(woDetails);    
        });
        
        return deferred.promise; 
    };
    
    
    
    this.getTaskListForWO = function (woType) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
                
        var deferred = $q.defer();
        $http.get(baseUrl + 'tasklist-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    }
    
    
    
    this.getUDAForWO = function (woType) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'uda-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    }
    
    
    
    this.getLinksForWO = function (woType) {
        
        baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';
        
        var deferred = $q.defer();
        $http.get(baseUrl + 'links-search-response.json').success(function (response) {
             deferred.resolve(response);
        });

        return deferred.promise; 
    }
    

                                  
    // ===================================================================
    // Restful services for Tasks on Tasks and Workorder Templates screens                             
    // ===================================================================

    this.getTaskListColumnDefs = function () {
        
        baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

        var deferred = $q.defer();
        $http.get(baseUrl + 'tasklist-column-defs-response.json').success(function (response) {
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

        $http.get(baseUrl + 'task-code-name-lookup-response.json').success(function (response) {
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