'use strict';

angular.module('admin.service').controller('ModalRowEditServiceController', ['columnDefs', 'data', function (columnDefs, data) {
    var vm = this;
    vm.isNew = _.isNull(data)|| !data ? true : false;

    vm.columnDefs = columnDefs;
    vm.data = data;
}]);