(function() {
  'use strict';

  angular
    .module('canopi.directive')
    .controller('AdminMainController', adminMainController);

  adminMainController.$inject = [
    '$rootScope',
    '$log',
    '$q',
    'CommonUtilJsonService'
  ];

  function adminMainController($rootScope, $log, $q, CommonUtilJsonService) {
    var vm = this;

    //        vm.serverTimeStamp = serverInfo.serverTimeStamp;
    //        vm.serverVersion = serverInfo.serverVersion;
    //        vm.currentDate = serverInfo.currentDate;
    //
    //        $rootScope.userFirstName = userInfo.firstName;
    //        $rootScope.userFullName = userInfo.firstName + ' ' + userInfo.lastName;
    //

    CommonUtilJsonService.getServerInfo().then(function(serverInfo) {
      vm.serverTimeStamp = serverInfo.serverTimeStamp;
      vm.serverVersion = serverInfo.serverVersion;
      vm.currentDate = serverInfo.currentDate;
    });

    $rootScope.attUid = 'pb154j';

    if (localStorage && localStorage.attuid) {
      $rootScope.attUid = localStorage.attuid;
    }

    $rootScope.userFirstName = 'Paul';
    $rootScope.userFullName = 'Paul Beresuita';
  }
})();
