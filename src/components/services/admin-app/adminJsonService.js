(function() {
  'use strict';

  angular.module('admin.service').factory('AdminJsonService', adminJsonService);

  adminJsonService.$inject = [
    '$rootScope',
    '$q',
    '$http',
    '$interval',
    '$location',
    '$log',
    'AdminGuiConstants',
    'UiGridUtilService'
  ];

  function adminJsonService(
    $rootScope,
    $q,
    $http,
    $interval,
    $location,
    $log,
    AdminGuiConstants,
    UiGridUtilService
  ) {
    var baseUrl = '';

    // user short name
    var mock = AdminGuiConstants.MOCK_DATA_FLAG;

    // get the restful URL context root based on the configuration set in constants.js
    // Note: Due to the hoisting rule in function expression - use IIFE to set the contextRoot value
    //       before the value is used in all the functions (otherwise, contextRoot value is undefined)

    var contextRoot = (function() {
      var contextRoot = '';

      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        if (AdminGuiConstants.MOCK_DATA_FLAG) {
          contextRoot = '/canopigui/';
        } else {
          contextRoot =
            'http://' +
            $location.host() +
            ':' +
            $location.port() +
            '/admin/resources/';
        }
      } else {
        if (AdminGuiConstants.MOCK_DATA_FLAG) {
          contextRoot = '/gui-canopi-js/src/';
        } else {
          // Note: the host name and port number for the test environment is set in constants.js
          //For example:   http://d5ibp1m1.snt.bst.bls.com:4030/admin//resources/table/COLM_WO_DESCRIPTION
          contextRoot =
            'http://' +
            AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
            '/admin/resources/';
        }
      }

      return contextRoot;
    })();

    var service = {
      getLookupTypeConfig: getLookupTypeConfig,
      getLookupType: getLookupType,
      updateLookupType: updateLookupType,
      getRuleCategoryConfig: getRuleCategoryConfig,
      getRuleCategory: getRuleCategory,
      updateRuleCategory: updateRuleCategory,
      getWoTemplateColumnDefs: getWoTemplateColumnDefs,
      getUDAColumnDefs: getUDAColumnDefs,
      getLinksColumnDefs: getLinksColumnDefs,
      getMockPOTypes: getMockPOTypes,
      getMockWOTypes: getMockWOTypes,
      getWOTypes: getWOTypes,
      getPOSearchResults: getPOSearchResults,
      getWOSearchResults: getWOSearchResults,
      getWODetails: getWODetails,
      getColumnDefinitionsForWOChildTables: getColumnDefinitionsForWOChildTables,
      getTaskListForWO: getTaskListForWO,
      getUDAForWO: getUDAForWO,
      getLinksForWO: getLinksForWO,
      getTaskListColumnDefs: getTaskListColumnDefs,
      getTaskType: getTaskType,
      getTasks: getTasks,
      getAllTasks: getAllTasks,
      getSubTasks: getSubTasks,
      getTaskCodeNameList: getTaskCodeNameList,
      getActivityTypes: getActivityTypes,
      getActivitySearchResults: getActivitySearchResults,
      getTaskPriorityConfig: getTaskPriorityConfig,
      updateTaskPriority: updateTaskPriority
    };

    return service;

    //////////

    //========================================================
    // Enable the real COLM calls for the available operations
    //========================================================

    function isCOMLCallForLookupTypeSupported(lookupType) {
      var supported = false;

      //            if (lookupType.code === 'COLM_JEOPARDY_REFERENCE' ||
      //                lookupType.code === 'CANOPI_CARRIER_NAME' ||
      //                lookupType.code === 'COLM_BACKHAUL_PRODUCT') {
      //                supported = true;
      //            }
      //
      return supported;
    }

    function isCOMLCallForRuleCategorySupported(ruleCategory) {
      var supported = false;

      //            if (ruleCategory.code === 'COLM_WO_DESCRIPTION' ||
      //                ruleCategory.code === 'AI_QUEUE_CONTROL' ||
      //                ruleCategory.code === 'AI_ATTR_CONTROL') {
      //                supported = true;
      //            }

      return supported;
    }

    function isCOMLCallForTaskPrioritySupported(taskPrority) {
      var supported = false;

      return supported;
    }

    // ===============================================
    // Restful services for Lookup & Pick Lists screen
    // ===============================================

    function getLookupTypeConfig() {
      baseUrl = contextRoot + 'app/admin-app/meta/lookupadmin/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'lookuptype-config.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    /**
     * Gets the the lookuptypes
     *
     * @param lookupType
     * @param options Optional parameters to configure the request
     * @returns {*} Promise
     */
    function getLookupType(lookupType, options) {
      // call COLM restful service for the operations which are available
      if (isCOMLCallForLookupTypeSupported(lookupType)) {
        return getLookupTypeFromCOLM(lookupType);
      }

      baseUrl = contextRoot + 'app/admin-app/mock/lookupadmin/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + lookupType.value + '.json')
        .success(function(response) {
          var convertedData = UiGridUtilService.convertCellValueFromCodeToTitleForDropdownType(
            response
          );
          deferred.resolve(convertedData);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getLookupTypeFromCOLM(lookupType, options) {
      // comment this out for local testing
      //baseUrl = contextRoot + lookupType.urlSuffix;

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/' +
          lookupType.urlSuffix;
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/' +
          lookupType.urlSuffix;
      }

      $log.debug('baseUrl ' + baseUrl);

      var deferred = $q.defer();
      $http
        .get(baseUrl)
        .success(function(response) {
          var convertedData = UiGridUtilService.convertCellValueFromCodeToTitleForDropdownType(
            response
          );
          deferred.resolve(convertedData);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function buildPostRequestObject(rowEntity, columnDefs) {
      var rowEntityWithoutHashKey = _.omit(rowEntity, '$$hashKey');

      // convert title value to code value before sending postObject to COLM
      var convertedRowEntity = UiGridUtilService.convertCellValueFromTitleToCodeForDropdownType(
        rowEntityWithoutHashKey,
        columnDefs
      );

      if (convertedRowEntity['id'].indexOf('GUI_') === 0) {
        convertedRowEntity['id'] = '';
      }

      //$log.debug("convertedRowEntity => " + angular.toJson(convertedRowEntity));

      var postObject = {
        attuid: $rootScope.attUid,
        key: {},
        data: [convertedRowEntity]
      };

      return postObject;
    }

    function getTaskPriorityConfig() {
      baseUrl = contextRoot + 'app/admin-app/meta/mobilityorders/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'taskpriority-config.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    //This function is mainly for Task List table
    //
    //@param gridData {Array} ui-grid's gridOptions.data (all the rows in table)
    //@param columnDefs {Array} ui-grid's gridOptions.columnDefs
    //@param deletedIds (Array) a list of ids for the rows to be deleted
    function buildPostRequestObjectForBulkOperation(
      gridData,
      columnDefs,
      deletedIds
    ) {
      var rowEntityWithoutHashKey;
      var convertedRowEntity;

      var rowEntries = [];

      for (var i = 0; i < gridData.length; i++) {
        //$log.debug("gridData: " + angular.toJson(gridData[i]));

        rowEntityWithoutHashKey = _.omit(gridData[i], '$$hashKey');

        // convert title value to code value before sending postObject to COLM
        convertedRowEntity = UiGridUtilService.convertCellValueFromTitleToCodeForDropdownType(
          rowEntityWithoutHashKey,
          columnDefs
        );

        if (convertedRowEntity['id'].indexOf('GUI_') === 0) {
          convertedRowEntity['id'] = '';
        }

        //$log.debug("convertedRowEntity => " + angular.toJson(convertedRowEntity));

        rowEntries.push(convertedRowEntity);
      }

      var postObject = {
        attuid: $rootScope.attUid,
        key: {},
        data: rowEntries,
        delete: deletedIds
      };

      return postObject;
    }

    function updateLookupType(lookupType, rowEntity, columnDefs) {
      if (!!lookupType.valuesToCopy) {
        UiGridUtilService.copyValuesToHiddenFields(
          rowEntity,
          lookupType.valuesToCopy
        );
      }

      // call COLM restful service for the operations which are available
      if (isCOMLCallForLookupTypeSupported(lookupType)) {
        var postObject = buildPostRequestObject(rowEntity, columnDefs);
        return updateLookupTypeInCOLM(lookupType, postObject);
      }

      // For testing - fake a delay of 1 second whilst the save occurs
      var deferred = $q.defer();

      $interval(
        function() {
          deferred.resolve();
        },
        1000,
        1
      );

      return deferred.promise;
    }

    function updateLookupTypeInCOLM(lookupType, postObject) {
      // comment this out for local testing
      //baseUrl = contextRoot + lookupType.urlSuffix;

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/' +
          lookupType.urlSuffix;
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/' +
          lookupType.urlSuffix;
      }

      $log.debug('baseUrl ' + baseUrl);
      $log.debug('postObject ' + JSON.stringify(postObject));

      var deferred = $q.defer();
      $http
        .post(baseUrl, JSON.stringify(postObject))
        .success(function(response) {
          $log.debug('response => ' + angular.toJson(response));

          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    // ===============================================
    // Restful services for Rule Administration screen
    // ===============================================

    function getRuleCategoryConfig() {
      baseUrl = contextRoot + 'app/admin-app/meta/ruleadmin/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'rulecategory-config.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    /**
     * Gets the the rule categories
     *
     * @param ruleCategory
     * @param options Optional parameters to configure the request
     * @returns {*} Promise
     */
    function getRuleCategory(ruleCategory, options) {
      // call COLM restful service for the operations which are available
      if (isCOMLCallForRuleCategorySupported(ruleCategory)) {
        return getRuleCategoryFromCOLM(ruleCategory, options);
      }

      baseUrl =
        contextRoot +
        'app/admin-app/mock/ruleadmin/response/' +
        ruleCategory.value +
        '.json';

      var deferred = $q.defer();
      $http
        .get(baseUrl)
        .success(function(response) {
          var convertedData = UiGridUtilService.convertCellValueFromCodeToTitleForDropdownType(
            response
          );
          deferred.resolve(convertedData);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getRuleCategoryFromCOLM(ruleCategory, options) {
      // comment this out for local testing
      //baseUrl = contextRoot + ruleCategory.urlSuffix;

      var queryString = '';

      // For Task Queue - options.code will contain the work order type value
      // example for the resulting url:  http://i7ibp1m1.snt.bst.bls.com:4030/admin/resources/table/AI_QUEUE_CONTROL?order_type=AddBaselineNtc2of2SS7Sigtran
      if (!!ruleCategory.urlQueryStringPrefix) {
        queryString = ruleCategory.urlQueryStringPrefix + options.code;
      }

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/' +
          ruleCategory.urlSuffix +
          queryString;
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/' +
          ruleCategory.urlSuffix +
          queryString;
      }

      $log.debug('baseUrl ' + baseUrl);

      var deferred = $q.defer();
      $http
        .get(baseUrl)
        .success(function(response) {
          var convertedData = UiGridUtilService.convertCellValueFromCodeToTitleForDropdownType(
            response
          );
          deferred.resolve(convertedData);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function updateRuleCategory(ruleCategory, rowEntity, columnDefs) {
      if (!!ruleCategory.valuesToCopy) {
        UiGridUtilService.copyValuesToHiddenFields(
          rowEntity,
          ruleCategory.valuesToCopy
        );
      }

      // call COLM restful service for the operations which are available
      if (isCOMLCallForRuleCategorySupported(ruleCategory)) {
        var postObject = buildPostRequestObject(rowEntity, columnDefs);
        return updateRuleCategoryInCOLM(ruleCategory, postObject);
      }

      // For testing - fake a delay of 1 second whilst the save occurs
      var deferred = $q.defer();

      $interval(
        function() {
          deferred.resolve();
        },
        1000,
        1
      );

      return deferred.promise;
    }

    function updateRuleCategoryInCOLM(ruleCategory, postObject) {
      // comment this out for local testing
      //baseUrl = contextRoot + lookupType.urlSuffix;

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/' +
          ruleCategory.urlSuffix;
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/' +
          ruleCategory.urlSuffix;
      }

      $log.debug('baseUrl ' + baseUrl);
      $log.debug('postObject ' + JSON.stringify(postObject));

      var deferred = $q.defer();
      $http
        .post(baseUrl, JSON.stringify(postObject))
        .success(function(response) {
          $log.debug('response => ' + angular.toJson(response));

          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    // ===============================================
    // Restful services for Workorder Templates screen
    // ===============================================

    function getWoTemplateColumnDefs() {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'wo-template-column-defs-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getUDAColumnDefs() {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'uda-column-defs-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getLinksColumnDefs() {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'links-column-defs-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getMockPOTypes() {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'get-potypes-response.json')
        .success(function(response) {
          deferred.resolve(response.data);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getMockWOTypes() {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'get-wotypes-response.json')
        .success(function(response) {
          deferred.resolve(response.data);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getWOTypes() {
      //get WO Types from mock data
      //baseUrl = contextRoot + 'app/admin-app/meta/mobilityorders/wopicklist.json';

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/choicelist/OrderType';
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/choicelist/OrderType';
      }

      $log.debug('baseUrl ' + baseUrl);

      var deferred = $q.defer();
      $http
        .get(baseUrl)
        .success(function(response) {
          deferred.resolve(response.data);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getPOSearchResults(poTypeList) {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'order-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getWOSearchResults(woType) {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'wo-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    //make separate Restful calls to retrieve the data for child tables
    //and pass the aggregate object back
    function getWODetails(woType) {
      var deferred = $q.defer();

      var woDetails = {
        tasklist: {},
        uda: {},
        links: {}
      };

      var tasklist = this.getTaskListForWO(woType);
      var uda = this.getUDAForWO(woType);
      var links = this.getLinksForWO(woType);

      $q.all([tasklist, uda, links]).then(function(results) {
        woDetails.tasklist = results[0];
        woDetails.uda = results[1];
        woDetails.links = results[2];

        deferred.resolve(woDetails);
      });

      return deferred.promise;
    }

    //make separate Restful calls to retrieve the column definitions for child tables
    //and pass the aggregate object back
    function getColumnDefinitionsForWOChildTables() {
      var deferred = $q.defer();

      var woDetails = {
        tasklist: {},
        uda: {},
        links: {}
      };

      var tasklist = this.getTaskListColumnDefs();
      var uda = this.getUDAColumnDefs();
      var links = this.getLinksColumnDefs();

      $q.all([tasklist, uda, links]).then(function(results) {
        woDetails.tasklist = results[0];
        woDetails.uda = results[1];
        woDetails.links = results[2];

        deferred.resolve(woDetails);
      });

      return deferred.promise;
    }

    function getTaskListForWO(woType) {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'tasklist-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getUDAForWO(woType) {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'uda-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getLinksForWO(woType) {
      baseUrl = contextRoot + 'app/admin-app/mock/mobilityorders/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'links-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    // ===================================================================
    // Restful services for Tasks on Tasks and Workorder Templates screens
    // ===================================================================

    function getTaskListColumnDefs() {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'tasklist-column-defs-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function updateTaskPriority(
      taskPriority,
      gridData,
      columnDefs,
      deletedIds
    ) {
      // call COLM restful service for the operations which are available
      if (isCOMLCallForTaskPrioritySupported(taskPrority)) {
        var postObject = buildPostRequestObject(
          gridData,
          columnDefs,
          deletedIds
        );
        return updateTaskPriorityInCOLM(taskPriority, postObject);
      }

      // For testing - fake a delay of 1 second whilst the save occurs
      var deferred = $q.defer();

      $interval(
        function() {
          deferred.resolve();
        },
        1000,
        1
      );

      return deferred.promise;
    }

    function updateTaskPriorityInCOLM(taskPriority, postObject) {
      // comment this out for local testing
      //baseUrl = contextRoot + lookupType.urlSuffix;

      // hard-code for testing
      if (AdminGuiConstants.END_TO_END_REST_CALL) {
        baseUrl =
          'http://' +
          $location.host() +
          ':' +
          $location.port() +
          '/admin/resources/' +
          taskPriority.urlSuffix;
      } else {
        baseUrl =
          'http://' +
          AdminGuiConstants.HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS +
          '/admin/resources/' +
          taskPriority.urlSuffix;
      }

      $log.debug('baseUrl ' + baseUrl);
      $log.debug('postObject ' + JSON.stringify(postObject));

      var deferred = $q.defer();
      $http
        .post(baseUrl, JSON.stringify(postObject))
        .success(function(response) {
          $log.debug('response => ' + angular.toJson(response));

          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    /* Gets the the tasktypes
         *
         * @param taskType
         * @param options Optional parameters to configure the request
         * @returns {*} Promise
         */
    function getTaskType(taskType, options) {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + taskType + '.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getTasks(workorderType) {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      if (!workorderType) workorderType = '';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'tasklist.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getAllTasks() {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'task-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getSubTasks(workorderType) {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      if (!workorderType) workorderType = '';

      var deferred = $q.defer();
      $http
        .get(baseUrl + workorderType + 'subtasklist.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getTaskCodeNameList() {
      baseUrl = contextRoot + 'app/admin-app/mock/tasks/response/';

      var deferred = $q.defer();

      $http
        .get(baseUrl + 'task-code-name-lookup-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    // =====================================================
    // Restful services for Admin GUI Activity Search screen
    // =====================================================

    function getActivityTypes() {
      baseUrl = contextRoot + 'app/admin-app/meta/utility/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'activitytypepicklist.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }

    function getActivitySearchResults() {
      baseUrl = contextRoot + 'app/admin-app/mock/utility/response/';

      var deferred = $q.defer();
      $http
        .get(baseUrl + 'activity-search-response.json')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject('http error');
        });

      return deferred.promise;
    }
  }
})();
