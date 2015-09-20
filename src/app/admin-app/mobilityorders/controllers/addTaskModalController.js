(function() {
  'use strict';

  angular
    .module('admin.app')
    .controller('AddTaskModalController', addTaskModalController);

  addTaskModalController.$inject = [
    '$scope',
    'UiGridUtilService',
    'data',
    '$modalInstance'
  ];

  function addTaskModalController(
    $scope,
    UiGridUtilService,
    data,
    $modalInstance
  ) {
    var vm = this;

    vm.gridOptionsAddTaskSelectTable = setupGridOptions();

    // ========================================================
    // Use Function Declarations to hide implementation details
    // and keep the bindable members up top
    // ========================================================

    vm.add = add;

    init();

    function init() {
      populateColumDefsAndDataForUiGrid();
    }

    function add() {
      //vm.selectedRowData = vm.gridApiAddTask.selection.getSelectedRows()[0];
      $modalInstance.close(vm.selectedRowAddTask);
    }

    function rowSelectionChangedAddTask(row) {
      vm.selectedRowAddTask = row.isSelected ? row.entity : false;
    }

    function setupGridOptions() {
      return {
        enableRowSelection: true,
        multiSelect: false,
        enableSorting: false,
        rowHeight: 45,
        enableColumnMenus: false,
        enableGridMenu: true,
        onRegisterApi: function(gridApi) {
          vm.gridApiAddTask = gridApi;
          // Register Events
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedAddTask
          );
        }
      };
    }

    function populateColumDefsAndDataForUiGrid() {
      var tableData = data;

      vm.gridOptionsAddTaskSelectTable.data = UiGridUtilService.extractTableCellValues(
        tableData
      );
      var colDefs = UiGridUtilService.extractColumnDefs(tableData);
      colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetadata);
      vm.gridOptionsAddTaskSelectTable.columnDefs = colDefs;
    }
  }
})();
