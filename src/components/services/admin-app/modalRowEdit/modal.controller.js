(function() {
  'use strict';

  angular
    .module('admin.service')
    .controller('ModalRowEditServiceController', modalRowEditServiceController);

  modalRowEditServiceController.$inject = ['columnDefs', 'data'];

  function modalRowEditServiceController(columnDefs, data) {
    var vm = this;
    vm.isNew = _.isNull(data) || !data ? true : false;

    vm.columnDefs = columnDefs;
    vm.data = data;
  }
})();
