angular.module('admin.app').controller('AdminMainController', ['$rootScope', '$log', 'serverInfo',
                                       function ($rootScope, $log, serverInfo) {
    'use strict';

     var vm = this;

    init();

    function init() {

        vm.serverTimeStamp = serverInfo.serverTimeStamp;
        vm.serverVersion = serverInfo.serverVersion;
        vm.currentDate = serverInfo.currentDate;
    };

}]);
