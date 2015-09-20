(function() {
  'use strict';

  angular
    .module('canopi.service')
    .factory('OrderSearchJsonService', orderSearchJsonService);

  orderSearchJsonService.$inject = [
    '$q',
    '$http',
    '$log',
    'Cache',
    'CanopiGuiConstants'
  ];

  function orderSearchJsonService($q, $http, $log, Cache, CanopiGuiConstants) {
    //var controllerName = MOCK_DATA_FLAG ? 'uammock' : 'uam';
    var controllerName = 'uam'; // make UAM call to get live data

    var baseUrl = '/canopigui/rest/' + controllerName;

    var service = {
      getUser: getUser,
      getAllUserNames: getAllUserNames,
      addUser: addUser,
      deleteUser: deleteUser,
      getPermissions: getPermissions,
      addWorkGroup: addWorkGroup,
      listAllWorkGroups: listAllWorkGroups,
      listAllPermissions: listAllPermissions,
      getUsersInWorkGroup: getUsersInWorkGroup,
      listAllUsers: listAllUsers,
      getUserFromWebPhone: getUserFromWebPhone,
      removeWorkGroupFromUAM: removeWorkGroupFromUAM,
      addMemberToGroupFromUAM: addMemberToGroupFromUAM,
      removerMemberFromGroupFromUAM: removerMemberFromGroupFromUAM,
      addPermission: addPermission,
      deletePermission: deletePermission,
      updateWorkGroup: updateWorkGroup,
      addPermissionToGroup: addPermissionToGroup,
      removePermissionFromGroup: removePermissionFromGroup,
      getPermissionsFromUser: getPermissionsFromUser,
      getUamHistory: getUamHistory,
      getUserPermissions: getUserPermissions,
      addPermissionToUser: addPermissionToUser,
      getUserByPermissionName: getUserByPermissionName,
      removePermissionFromUser: removePermissionFromUser,
      addAcnaPermissions: addAcnaPermissions,
      removeAcnaPermissions: removeAcnaPermissions
    };

    return service;

    /////////

    function getUser(attUid) {
      var deferred = $q.defer();
      $http.get(baseUrl + '/user/get/' + attUid).success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function getAllUserNames() {
      var deferred = $q.defer();
      $http.get(baseUrl + '/allUserNames/get').success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function addUser(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/user/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function deleteUser(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/user/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function getPermissions(workGroup) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/permissions/get/' + workGroup)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addWorkGroup(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/workGroup/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function listAllWorkGroups() {
      var deferred = $q.defer();
      $http.get(baseUrl + '/workGroups/get').success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function listAllPermissions() {
      var deferred = $q.defer();
      $http.get(baseUrl + '/permissions/get').success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function getUsersInWorkGroup(workGroupId) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/usersInWorkGroup/get/' + workGroupId)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function listAllUsers() {
      var deferred = $q.defer();
      $http.get(baseUrl + '/users/get').success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function getUserFromWebPhone(attUid) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/userInfo/get/' + attUid)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function removeWorkGroupFromUAM(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/workGroup/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addMemberToGroupFromUAM(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/groupMember/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function removerMemberFromGroupFromUAM(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/groupMember/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addPermission(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permission/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function deletePermission(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permission/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function updateWorkGroup(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/workGroup/update', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addPermissionToGroup(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissionInGroup/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function removePermissionFromGroup(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissionInGroup/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function getPermissionsFromUser(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissionsFromUser/get', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function getUamHistory(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/uamHistory/get', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function getUserPermissions(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissions/get', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addPermissionToUser(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissionForUser/add', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function getUserByPermissionName(permissionName) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/uamUsers/get/' + permissionName)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function removePermissionFromUser(postObject) {
      var deferred = $q.defer();
      $http
        .post(baseUrl + '/permissionForUser/delete', JSON.stringify(postObject))
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function addAcnaPermissions(attUid) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/acnaPermissions/add/' + attUid)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function removeAcnaPermissions(attUid) {
      var deferred = $q.defer();
      $http
        .get(baseUrl + '/acnaPermissions/delete/' + attUid)
        .success(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }
  }
})();
