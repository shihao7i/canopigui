(function() {
  'use strict';

  angular
    .module('admin.app')
    .controller('MobilityOrdersController', mobilityOrdersController);

  mobilityOrdersController.$inject = [
    '$scope',
    '$templateCache',
    'uiGridExporterConstants',
    '$log',
    '$q',
    '$interval',
    '$modal',
    'orderPicklists',
    'taskPriorityConfig',
    'AdminJsonService',
    'UiGridUtilService',
    'MessagesService',
    'Dialog',
    '$rootScope',
    'TransitionData',
    'UiGridCommands'
  ];

  function mobilityOrdersController(
    $scope,
    $templateCache,
    uiGridExporterConstants,
    $log,
    $q,
    $interval,
    $modal,
    orderPicklists,
    taskPriorityConfig,
    AdminJsonService,
    UiGridUtilService,
    MessagesService,
    Dialog,
    $rootScope,
    TransitionData,
    UiGridCommands
  ) {
    var vm = this;

    vm.gridContextSelectedWO = {};
    vm.gridContextTaskList = {};
    vm.gridContextLinks = {};
    vm.gridContextNewLinks = {};
    vm.gridContextNewTaskList = {};
    vm.gridContextUDA = {};
    vm.gridContextNewUDA = {};
    vm.gridContextNewWOTemplate = {};

    //======================================
    // For Workorder Template Search screen
    //======================================
    // multi-selection
    vm.poTypeMultiselectPickList = orderPicklists.poTypes;
    // single-selection
    vm.woPickList = orderPicklists.woTypes;

    // meta data for Task List table
    vm.taskPriorityConfig = taskPriorityConfig;

    //$log.debug("vm.taskPriorityConfig => " + angular.toJson(vm.taskPriorityConfig));

    vm.displayOrderDetailsFlag = false;
    vm.searchAccordionOpen = true;

    //===================================
    // For New Workorder Template screen
    //===================================
    // single-selection
    vm.poPicklist = orderPicklists.poTypes;
    vm.newWOType = '';

    vm.displayNewWOTemplateTableFlag = false;
    vm.displayChildTablesForNewWOTemplateFlag = false;

    vm.NewWOSearchAccordionOpen = true;

    //=== Begin: For Workorder Template Search ===
    vm.gridOptionsSelectedWO = setupUiGridForSelectedWO();

    vm.gridOptionsAddTaskSelectTable = setupUiGridForAddTask();
    vm.gridOptionsTaskListTable = setupUiGridForTaskList();
    vm.gridOptionsUDATable = setupUiGridForUDA();
    vm.gridOptionsLinksTable = setupUiGridForLinks();

    //=== End: For Workorder Template Search ===

    //=== Begin: For New WO Template ===
    vm.gridOptionsNewWOTemplateTable = setupUiGridForNewWOTemplate();
    vm.gridOptionsNewTaskListTable = setupUiGridForNewTaskList();
    vm.gridOptionsNewUDATable = setupUiGridForNewUDA();
    vm.gridOptionsNewLinksTable = setupUiGridForNewLinks();
    vm.gridOptionsNewAddTaskSelectTable = setupUiGridForNewAddTask();
    //=== End: For New WO Template ===

    //=============================================
    vm.gridContextSelectedWO.gridOptions = vm.gridOptionsSelectedWO;
    vm.gridContextTaskList.gridOptions = vm.gridOptionsTaskListTable;
    vm.gridContextUDA.gridOptions = vm.gridOptionsUDATable;
    vm.gridContextLinks.gridOptions = vm.gridOptionsLinksTable;

    vm.gridContextNewLinks.gridOptions = vm.gridOptionsNewLinksTable;
    vm.gridContextNewTaskList.gridOptions = vm.gridOptionsNewTaskListTable;
    vm.gridContextNewUDA.gridOptions = vm.gridOptionsNewUDATable;
    vm.gridContextNewWOTemplate.gridOptions = vm.gridOptionsNewWOTemplateTable;

    //=============================================

    vm.isLoading = true;

    vm.uiGridExporterConstants = uiGridExporterConstants;

    // ========================================================
    // Use Function Declarations to hide implementation details
    // and keep the bindable members up top
    // ========================================================

    // === Existing WO Template Screen ===

    vm.wo = {};
    vm.wo.updateWO = updateWO;
    vm.wo.save = saveWO;
    vm.wo.undo = undoWO;

    vm.displayOrderDetail = displayOrderDetail;

    vm.tasklist = {};
    vm.tasklist.moveSelectedUp = moveSelectedUpForTaskList;
    vm.tasklist.moveSelectedDown = moveSelectedDownForTaskList;
    vm.tasklist.addTask = addTaskForTaskList;
    vm.tasklist.removeTask = removeTaskForTaskList;
    vm.tasklist.saveTasks = saveTasks;
    vm.tasklist.undo = undoForTaskList;
    vm.tasklist.recalcTaskSequence = recalcTaskSequenceForTaskList;
    vm.tasklist.export = exportFileForTaskList;

    vm.removedTasksForTaskList = [];

    vm.uda = {};
    vm.uda.saveUDA = saveUDA;
    vm.uda.updateUDA = updateUDA;
    vm.uda.addUDA = addUDA;
    vm.uda.discardUDA = discardUDA;
    vm.uda.export = exportFileForUDA;

    vm.links = {};
    vm.links.saveLink = saveLink;
    vm.links.updateLink = updateLink;
    vm.links.undo = undoForLinks;
    vm.links.addLink = addLink;
    vm.links.discardLink = discardLink;
    vm.links.export = exportFileForLinks;

    // === New WO Template Screen ===

    vm.displayNewLinksTable = displayNewLinksTable;

    vm.newLinks = {};
    vm.newLinks.saveLink = saveNewLink;
    vm.newLinks.updateLink = updateNewLink;
    vm.newLinks.undo = undoForNewLinks;
    vm.newLinks.addLink = addNewLink;
    vm.newLinks.discardLink = discardNewLink;
    vm.newLinks.export = exportFileForNewLinks;

    vm.displayNewUDATable = displayNewUDATable;

    vm.newUda = {};
    vm.newUda.saveUDA = saveNewUDA;
    vm.newUda.updateUDA = updateNewUDA;
    vm.newUda.undo = undoForNewUDA;
    vm.newUda.addUDA = addNewUDA;
    vm.newUda.discardUDA = discardNewUDA;
    vm.newUda.export = exportFileForNewUDA;

    vm.displayNewTaskListTable = displayNewTaskListTable;

    vm.newTasklist = {};

    vm.newTasklist.moveSelectedUp = moveSelectedUpForNewTaskList;
    vm.newTasklist.moveSelectedDown = moveSelectedDownForNewTaskList;
    vm.newTasklist.addTask = addTaskForNewTaskList;
    vm.newTasklist.removeTask = removeTaskForNewTaskList;
    vm.newTasklist.saveTasks = saveTasksForNewTaskList;
    vm.newTasklist.undo = undoForNewTaskList;
    vm.newTasklist.recalcTaskSequence = recalcTaskSequenceForNewTaskList;
    vm.newTasklist.export = exportFileForNewTaskList;

    vm.displayNewWOTemplateTable = displayNewWOTemplateTable;

    vm.newWOTemplate = {};

    vm.newWOTemplate.saveNewWOTemplate = saveNewWOTemplate;
    vm.newWOTemplate.updateNewWOTemplate = updateNewWOTemplate;
    vm.newWOTemplate.undo = undoForNewWOTemplate;
    vm.newWOTemplate.addNewWOTemplate = addNewWOTemplate;
    vm.newWOTemplate.removeNewWOTemplate = removeNewWOTemplate;
    vm.newWOTemplate.export = exportFileForNewWOTemplate;

    init();

    function init() {
      // Revert templateCache
      $templateCache.put(
        'ui-grid/selectionRowHeader',
        '<div class="ui-grid-disable-selection"><div class="ui-grid-cell-contents"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>'
      );

      // add column def to support required field indicator
      UiGridUtilService.loadTemplate('ui-grid/uiGridHeaderCell');
      UiGridCommands.registerCallbacks(updateUndoStack);

      UiGridUtilService.resetNextIdValue();
      vm.firstElementForTaskList = true;
      vm.lastElementForTaskList = true;
    }

    function populateDataForTaskListTable(tableData) {
      // Load a special header template that has href links
      UiGridUtilService.loadTemplate('ui-grid/uiGridHeaderCellSpecial');

      vm.displayOrderDetailsFlag = true;

      vm.gridOptionsTaskListTable.data = UiGridUtilService.extractTableCellValues(
        tableData
      );
      vm.gridDataTaskListCopy = angular.copy(vm.gridOptionsTaskListTable.data);
      var colDefs = UiGridUtilService.extractColumnDefs(tableData, {
        headerCellTemplate: 'ui-grid/uiGridHeaderCellSpecial',
        woType: vm.woType.title
      });

      colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetadata);
      vm.gridOptionsTaskListTable.columnDefs = colDefs;
      vm.gridOptionsTaskListTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
        colDefs
      );
      vm.gridOptionsTaskListTable.exporterCsvFilename =
        vm.woType.title + '-tasks.csv';
    }

    function populateDataForUDATable(tableData) {
      vm.gridOptionsUDATable.data = UiGridUtilService.extractTableCellValues(
        tableData
      );
      vm.gridDataUDACopy = angular.copy(vm.gridOptionsUDATable.data);
      var colDefs = UiGridUtilService.extractColumnDefs(tableData);
      colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetadata);
      vm.gridOptionsUDATable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
        colDefs
      );
      vm.gridOptionsUDATable.columnDefs = colDefs;
    }

    function populateDataForLinksTable(tableData) {
      vm.gridOptionsLinksTable.data = UiGridUtilService.extractTableCellValues(
        tableData
      );
      vm.gridDataLinksCopy = angular.copy(vm.gridOptionsLinksTable.data);
      var colDefs = UiGridUtilService.extractColumnDefs(tableData);
      colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetadata);
      vm.gridOptionsLinksTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
        colDefs
      );
      vm.gridOptionsLinksTable.columnDefs = colDefs;
    }

    function displayOrderDetail() {
      //vm.searchAccordionOpen = false;
      //vm.searchResultsOpen = false;

      buildColumnDefsAndDataForSelectedWO();

      AdminJsonService.getWODetails(vm.woType.title).then(function(woDetails) {
        if (woDetails) {
          if (woDetails.tasklist) {
            populateDataForTaskListTable(woDetails.tasklist);
          }

          if (woDetails.uda) {
            populateDataForUDATable(woDetails.uda);
          }

          if (woDetails.links) {
            populateDataForLinksTable(woDetails.links);
          }
        }
      });
    }

    function updateUndoStack() {
      // Undo configuration
      // Get updated undo stack from service when it changes for enabling/disabling undo button
      //vm.undoStackSelectedWO = UiGridCommands.getCommandStack(); // Get updated undo stack from service when it changes for enabling/disabling undo button
      vm.undoStackTaskList = UiGridCommands.getCommandStack();
      vm.undoStackNewTaskList = UiGridCommands.getCommandStack();
      vm.undoStackLinks = UiGridCommands.getCommandStack();
      vm.undoStackNewLinks = UiGridCommands.getCommandStack();
      vm.undoStackUDA = UiGridCommands.getCommandStack();
      vm.undoStackNewUDA = UiGridCommands.getCommandStack();
      vm.undoStackNewWOTemplate = UiGridCommands.getCommandStack();
    }

    // Existing WO Template

    function beginCellEditSelectedWO(rowEntity) {
      vm.gridApiSelectedWO.selection.clearSelectedRows();
      vm.gridApiSelectedWO.selection.selectRow(rowEntity);
      // Save row for undo
      vm.undoRowSelectedWO = angular.copy(rowEntity);
      vm.isEditingSelectedWO = true;

      //var index = _.indexOf(vm.gridOptionsSelectedWO, rowEntity);
      //UiGridCommands.execute('CellEdit', vm.gridContextSelectedWO, {index: index, rowEntity:rowEntity});
    }

    function setupUiGridForSelectedWO() {
      return {
        rowEditWaitInterval: -1, //disable autosave
        enableCellEditOnFocus: true,
        enableCellEdit: false,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0,
        enableColumnMenus: false,
        multiSelect: false,
        rowHeight: 45,
        onRegisterApi: function(gridApi) {
          vm.gridApiSelectedWO = gridApi;
          vm.gridContextSelectedWO.gridApi = gridApi;
          // Register Events
          gridApi.edit.on.beginCellEdit($scope, beginCellEditSelectedWO);
          //gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedWO);
        }
      };
    }

    function buildColumnDefsAndDataForSelectedWO() {
      AdminJsonService.getWOSearchResults().then(function(data) {
        var tableData = data;
        vm.gridOptionsSelectedWO.data = UiGridUtilService.extractTableCellValues(
          tableData
        );
        vm.gridOptionsSelectedWO.columnDefs = UiGridUtilService.extractColumnDefs(
          tableData
        );

        // copy the columnDefs from search results table to Selected WO row
        //NOT NECESSARY since undo is for 1 cell value but added for consistency
        vm.gridDataSelectedWOCopy = angular.copy(vm.gridOptionsSelectedWO.data);
        // find WO Description field and set it to editable
        for (var i = 0; i < vm.gridOptionsSelectedWO.columnDefs.length; i++) {
          if (vm.gridOptionsSelectedWO.columnDefs[i].id === 'woDescription') {
            vm.gridOptionsSelectedWO.columnDefs[i].enableCellEdit = true;

            UiGridUtilService.makeEditable(
              vm.gridOptionsSelectedWO.columnDefs[i]
            );
            break;
          }
        }
      });
    }

    function updateWO() {}

    function saveWO() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiSelectedWO.rowEdit.flushDirtyRows();
      });
    }

    function undoWO() {
      vm.gridOptionsSelectedWO.data[0] = vm.gridDataSelectedWOCopy[0];
    }

    // Task List

    function rowSelectionChangedAddTask(row) {
      vm.selectedRowForAddTask = row.isSelected ? row.entity : false;
    }

    function setupUiGridForAddTask() {
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

    function beginCellEditTaskList(rowEntity) {
      var index = _.indexOf(vm.gridOptionsTaskListTable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextTaskList, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function rowSelectionChangedTaskList(rowEntity) {
      var msg = 'row selected ' + rowEntity.isSelected;
      $log.log(msg);
      vm.selectedRowForTaskList = rowEntity.isSelected
        ? rowEntity.entity
        : false;
      if (vm.selectedRowForTaskList) {
        //$log.debug(vm.selectedRowForTaskList);
        //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRowForTaskList);
        vm.selectedIndexForTaskList = vm.gridOptionsTaskListTable.data.lastIndexOf(
          vm.selectedRowForTaskList
        );
        //$log.debug(vm.selectedIndexForTaskList);

        vm.previousIndexForTaskList = vm.selectedIndexForTaskList - 1;
        //$log.debug(vm.previousIndexForTaskList);

        vm.nextIndexForTaskList = vm.selectedIndexForTaskList + 1;
        //$log.debug(vm.nextIndexForTaskList);

        //These checks happen once per selected row
        //Is the selected row already the last Element? Then disable the down button
        //Is the selected row the first element in the list? Then disable the up button
        if (
          vm.nextIndexForTaskList === vm.gridOptionsTaskListTable.data.length
        ) {
          vm.lastElementForTaskList = true;
          vm.firstElementForTaskList = false;
        } else {
          vm.lastElementForTaskList = false;
        }

        if (vm.previousIndexForTaskList < 0) {
          vm.firstElementForTaskList = true;
          vm.lastElementForTaskList = false;
        } else {
          vm.firstElementForTaskList = false;
        }
      } else {
        vm.firstElementForTaskList = true;
        vm.lastElementForTaskList = true;
      }
    }

    function setupUiGridForTaskList() {
      return UiGridUtilService.createGrid({
        onRegisterApi: function(gridApi) {
          vm.gridApiTaskList = gridApi;
          vm.gridContextTaskList.gridApi = gridApi;

          gridApi.edit.on.beginCellEdit($scope, beginCellEditTaskList);
          gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef) {
            if (colDef.id === 'taskParallelToPrevious') {
              recalcTaskSequenceForTaskList();
            }
            TransitionData.setDirtyRows('yes');
          });

          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedTaskList
          );

          //saving inline edited rows
          gridApi.rowEdit.on.saveRow($scope, saveRowForTaskList);
        },
        enableSorting: false
        //                gridMenuCustomItems: [
        //                    {
        //                        title: 'Hide Empty Columns',
        //                        action: function () {
        //                            vm.toggleEmptyColumns();
        //                        }
        //                    },
        //                    {
        //                        title: 'Reset Columns',
        //                        action: function () {
        //                            vm.displayOrderDetail();
        //                        },
        //                        order: 210
        //                    }
        //                ]
      });
    }

    function checkStartForTaskList() {
      vm.previousIndexForTaskList = vm.selectedIndexForTaskList - 1;
      if (vm.previousIndexForTaskList < 0) {
        vm.firstElementForTaskList = true;
      } else {
        vm.firstElementForTaskList = false;
      }
    }

    function checkEndForTaskList() {
      vm.nextIndexForTaskList = vm.selectedIndexForTaskList + 1;
      if (vm.nextIndexForTaskList === vm.gridOptionsTaskListTable.data.length) {
        vm.lastElementForTaskList = true;
      } else {
        vm.lastElementForTaskList = false;
      }
    }

    function saveRowForTaskList(rowEntity) {
      // create a fake promise - normally you'd use the promise returned by $http or $resource
      var deferred = $q.defer();
      vm.gridApiTaskList.rowEdit.setSavePromise(rowEntity, deferred.promise);
      // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
      $interval(
        function() {
          if (rowEntity.gender === 'male') {
            deferred.reject();
          } else {
            deferred.resolve();
          }
        },
        3000,
        1
      );
    }

    function moveSelectedUpForTaskList() {
      vm.selectedIndexForTaskList = vm.gridOptionsTaskListTable.data.lastIndexOf(
        vm.selectedRowForTaskList
      );
      if (vm.previousIndexForTaskList > -1) {
        vm.previousIndexForTaskList = vm.selectedIndexForTaskList - 1;
        vm.nextIndexForTaskList = vm.selectedIndexForTaskList + 1;

        vm.previousRowDataForTaskList =
          vm.gridOptionsTaskListTable.data[vm.previousIndexForTaskList];

        vm.nextRowDataForTaskList =
          vm.gridOptionsTaskListTable.data[vm.nextIndexForTaskList];

        vm.gridOptionsTaskListTable.data[vm.previousIndexForTaskList] =
          vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList];
        vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList] =
          vm.previousRowDataForTaskList;
        vm.selectedIndexForTaskList = vm.selectedIndexForTaskList - 1;

        checkStartForTaskList();
        checkEndForTaskList();
      } else {
      }
      //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRowForTaskList);
      recalcTaskSequenceForTaskList();
      vm.gridApiTaskList.core.queueRefresh().then(function() {
        vm.gridApiTaskList.selection.selectRow(
          vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList]
        );
      });
    }

    function moveSelectedDownForTaskList() {
      vm.selectedIndexForTaskList = vm.gridOptionsTaskListTable.data.lastIndexOf(
        vm.selectedRowForTaskList
      );

      if (vm.nextIndexForTaskList !== vm.gridOptionsTaskListTable.data.length) {
        vm.previousIndexForTaskList = vm.selectedIndexForTaskList - 1;
        vm.nextIndexForTaskList = vm.selectedIndexForTaskList + 1;
        vm.previousRowDataForTaskList =
          vm.gridOptionsTaskListTable.data[vm.previousIndexForTaskList];
        vm.nextRowDataForTaskList =
          vm.gridOptionsTaskListTable.data[vm.nextIndexForTaskList];
        vm.gridOptionsTaskListTable.data[vm.nextIndexForTaskList] =
          vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList];
        vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList] =
          vm.nextRowDataForTaskList;
        vm.selectedIndexForTaskList = vm.selectedIndexForTaskList + 1;
        checkEndForTaskList();
        checkStartForTaskList();
      } else {
        //vm.nextIndex = vm.selectedIndex+1;
      }
      //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRow);
      recalcTaskSequenceForTaskList();
      vm.gridApiTaskList.core.queueRefresh().then(function() {
        vm.gridApiTaskList.selection.selectRow(
          vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList]
        );
      });
    }

    function addTaskForTaskList() {
      MessagesService.clearMessages();
      $modal
        .open({
          templateUrl: 'app/admin-app/mobilityorders/views/addTaskModal.html',
          controller: 'AddTaskModalController',
          controllerAs: 'addTask',
          size: 'lg',
          resolve: {
            data: [
              'AdminJsonService',
              function(AdminJsonService) {
                return AdminJsonService.getTasks('');
              }
            ]
          }
        })
        .result.then(function(data) {
          MessagesService.clearMessages();
          var rowData;
          var selectedRowExists = false;
          if (!(data.taskCode === 'PLAN')) {
            for (var i = 0; i < vm.gridOptionsTaskListTable.data.length; i++) {
              rowData = angular.copy(vm.gridOptionsTaskListTable.data[i]);
              if (rowData.taskCode === data.taskCode) {
                selectedRowExists = true;
              }
            }
          }
          if (!selectedRowExists) {
            //Assigning additional/default values to the row before adding
            data.taskParallelToPrevious = 'NO';

            if (vm.selectedRowForTaskList) {
              //Pusing the selected Row after adidng the additional default values.
              vm.selectedIndexForTaskList = vm.gridOptionsTaskListTable.data.lastIndexOf(
                vm.selectedRowForTaskList
              );
              UiGridCommands.execute('RowAdd', vm.gridContextTaskList, {
                index: vm.selectedIndexForTaskList + 1,
                data: data
              });
            } else {
              var lastIndex = vm.gridOptionsTaskListTable.data.length;
              UiGridCommands.execute('RowAdd', vm.gridContextTaskList, {
                index: lastIndex,
                data: data
              });
            }
          } else {
            MessagesService.addMessage(
              'Task Code [' + data.taskCode + '] is already added to list',
              'warning'
            );
          }
        });
    }

    function removeTaskForTaskList() {
      // Remove an item
      vm.gridOptionsTaskListTable.data.splice(
        vm.gridOptionsTaskListTable.data.lastIndexOf(vm.selectedRowForTaskList),
        1
      );
      recalcTaskSequenceForTaskList();
      var removedTaskId = vm.selectedRowForTaskList.id;
      $log.debug(removedTaskId);
      vm.removedTasksForTaskList.push(removedTaskId);
      $log.debug(vm.removedTasksForTaskList);
    }

    function saveTasks() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiTaskList.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function undoForTaskList() {
      //vm.gridOptionsTaskListTable.data[vm.selectedIndexForTaskList] = vm.gridDataTaskListCopy[vm.selectedIndexForTaskList];
      UiGridCommands.undo();
    }

    function recalcTaskSequenceForTaskList() {
      // this is a new task list with the re-sequenced tasks
      var sequencedData = [];
      var sequenceNumber = 10; // start with 10 (incremented by 10)

      var rowData;

      for (var i = 0; i < vm.gridOptionsTaskListTable.data.length; i++) {
        rowData = angular.copy(vm.gridOptionsTaskListTable.data[i]);

        if (rowData.taskParallelToPrevious === 'YES') {
          rowData.taskSequence = sequenceNumber.toString();
        } else {
          // the sequence should start with 10 for the table
          if (i > 0) {
            sequenceNumber += 10;
          }
          rowData.taskSequence = sequenceNumber.toString();
        }

        sequencedData.push(rowData);
      }

      // update data with newly calculated task sequence numbers
      vm.gridOptionsTaskListTable.data = sequencedData;
    }

    function exportFileForTaskList() {
      vm.gridApiTaskList.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    // UDA

    function beginCellEditUDA(rowEntity) {
      var index = _.indexOf(vm.gridOptionsUDATable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextUDA, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEditUDA(rowEntity) {
      TransitionData.setDirtyRows('yes');
    }

    function rowSelectionChangedUDA(row) {
      vm.selectedRowForUDA = row.entity;
      if (
        vm.selectedRowForUDA.id === undefined ||
        vm.selectedRowForUDA.id === ''
      ) {
        vm.newRowForUDA = true;
      } else {
        vm.newRoworUDA = false;
      }
      vm.selectedIndexForUDA = vm.gridOptionsUDATable.data.lastIndexOf(
        vm.selectedRowForUDA
      );
    }

    function setupUiGridForUDA() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'uda.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiUDA = gridApi;
          vm.gridContextUDA.gridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope, beginCellEditUDA);
          gridApi.edit.on.afterCellEdit($scope, afterCellEditUDA);
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedUDA
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRowForUDA);
        }
        //                gridMenuCustomItems: [
        //                    {
        //                        title: 'Hide Empty Columns',
        //                        action: function () {
        //                            vm.toggleEmptyColumns();
        //                        }
        //                    },
        //                    {
        //                        title: 'Reset Columns',
        //                        action: function () {
        //                            vm.displayOrderDetail();
        //                        },
        //                        order: 210
        //                    }
        //                ]
      });
    }

    function saveUDA() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiUDA.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function updateUDA() {}

    function undo() {
      UiGridCommands.undo();
      vm.selectedRowForUDA = false;
      vm.newRowForUDA = false;
    }

    function addUDA() {
      var newRowForUDA = {};
      var cols = vm.gridOptionsUDATable.columnDefs;
      angular.forEach(cols, function(column) {
        newRowForUDA[column.id] = '';
      });
      if (vm.selectedRowUDA) {
        var selectedIndex = vm.gridOptionsUDATable.data.lastIndexOf(
          vm.selectedRowUDA
        );
        UiGridCommands.execute('RowAdd', vm.gridContextUDA, {
          index: selectedIndex + 1,
          data: newRowForUDA
        });
      } else {
        var lastIndex = vm.gridOptionsUDATable.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContextUDA, {
          index: lastIndex,
          data: newRowForUDA
        });
      }
    }

    function exportFileForUDA() {
      vm.gridApiUDA.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    function discardUDA() {
      vm.gridOptionsUDATable.data.splice(
        vm.gridOptionsUDATable.data.lastIndexOf(vm.selectedRowUDA),
        1
      );
      vm.newRowForUDA = false;
      vm.gridApiUDA.selection.clearSelectedRows();
      vm.gridApiUDA.core.refresh();
      vm.selectedRowForUDA = false;
    }

    // Document URLs

    function beginCellEditLinks(rowEntity) {
      var index = _.indexOf(vm.gridOptionsLinksTable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextLinks, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEditLinks(rowEntity) {
      TransitionData.setDirtyRows('yes');
    }

    function rowSelectionChangedLinks(row) {
      vm.selectedRowForLinks = row.isSelected ? row.entity : false;
      if (
        vm.selectedRowForLinks.id === undefined ||
        vm.selectedRowForLinks.id === ''
      ) {
        vm.newRowForLinks = true;
      } else {
        vm.newRowForLinks = false;
      }
      vm.selectedIndexForLinks = vm.gridOptionsLinksTable.data.lastIndexOf(
        vm.selectedRowForLinks
      );
    }

    function setupUiGridForLinks() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'links.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiLinks = gridApi;
          vm.gridContextLinks.gridApi = gridApi;
          //Register events
          gridApi.edit.on.beginCellEdit($scope, beginCellEditLinks);
          gridApi.edit.on.afterCellEdit($scope, afterCellEditLinks);
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedLinks
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRowForLinks);
        }
        //                gridMenuCustomItems: [
        //                    {
        //                        title: 'Hide Empty Columns',
        //                        action: function () {
        //                            vm.toggleEmptyColumns();
        //                        }
        //                    },
        //                    {
        //                        title: 'Reset Columns',
        //                        action: function () {
        //                            vm.displayOrderDetail();
        //                        },
        //                        order: 210
        //                    }
        //                ]
      });
    }

    function saveLink() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiLinks.rowEdit.flushDirtyRows();
      });
    }

    function updateLink() {}

    function undoForLinks() {
      UiGridCommands.undo();
    }

    function addLink() {
      var newRowForLinks = {};
      var cols = vm.gridOptionsLinksTable.columnDefs;
      angular.forEach(cols, function(column) {
        newRowForLinks[column.id] = '';
      });
      if (vm.selectedRowForLinks) {
        var selectedIndex = vm.gridOptionsLinksTable.data.lastIndexOf(
          vm.selectedRowForLinks
        );
        UiGridCommands.execute('RowAdd', vm.gridContextLinks, {
          index: selectedIndex + 1,
          data: newRowForLinks
        });
      } else {
        var lastIndex = vm.gridOptionsLinksTable.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContextLinks, {
          index: lastIndex,
          data: newRowForLinks
        });
      }
    }

    function discardLink() {
      vm.gridOptionsLinksTable.data.splice(
        vm.gridOptionsLinksTable.data.lastIndexOf(vm.selectedRowForLinks),
        1
      );
      vm.newRowForLinks = false;
      vm.gridApiLinks.selection.clearSelectedRows();
      vm.gridApiLinks.core.refresh();
      vm.selectedRowForLinks = false;
    }

    function exportFileForLinks() {
      vm.gridApiLinks.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    // New WO Template

    // Handle grid events
    function beginCellEdit(rowEntity) {
      var index = _.indexOf(vm.gridOptionsNewWOTemplateTable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextNewWOTemplate, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEdit(rowEntity) {
      TransitionData.setDirtyRows('yes');
    }

    function rowSelectionChangedNewWOTemplate(row) {
      vm.selectedRowForNewWOTemplate = row.isSelected ? row.entity : false;
      if (
        vm.selectedRowForNewWOTemplate.id === undefined ||
        vm.selectedRowForNewWOTemplate.id === ''
      ) {
        vm.newRowForNewWOTemplate = true;
      } else {
        vm.newRowForNewWOTemplate = false;
      }
      vm.selectedIndexForNewWOTemplate = vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(
        vm.selectedRowForNewWOTemplate
      );
      vm.newWOType = row.entity.woType;

      displayChildTablesForNewWOTemplate();
    }

    function setupUiGridForNewWOTemplate() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'newWOTemplate.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiNewWOTemplate = gridApi;
          vm.gridContextNewWOTemplate.gridApi = gridApi;
          // Register events
          gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
          gridApi.edit.on.afterCellEdit($scope, afterCellEdit);

          gridApi.rowEdit.on.saveRow($scope, saveRowForNewWOTemplate);
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedNewWOTemplate
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRow);
        }
      });
    }

    function displayChildTablesForNewWOTemplate() {
      // display new tables with empty data
      displayNewTaskListTable();
      displayNewUDATable();
      displayNewLinksTable();

      // enable the display of the child tables
      vm.displayChildTablesForNewWOTemplateFlag = true;
    }

    function saveRowForNewWOTemplate(rowEntity) {
      $log.debug('Saving row for New WO Template');
    }

    function displayNewWOTemplateTable() {
      AdminJsonService.getWoTemplateColumnDefs().then(function(data) {
        var tableData = data;

        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

        colDefs = UiGridUtilService.autoColWidth(
          colDefs,
          tableData.rowMetadata
        );
        vm.gridOptionsNewWOTemplateTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
          colDefs
        );

        vm.gridOptionsNewWOTemplateTable.columnDefs = colDefs;

        vm.gridOptionsNewWOTemplateTable.data = UiGridUtilService.extractTableCellValues(
          tableData
        );
        vm.gridDataNewWOTemplateCopy = angular.copy(
          vm.gridOptionsNewWOTemplateTable.data
        );
        vm.gridOptionsNewWOTemplateTable.exporterCsvFilename =
          'newWOTemplate.csv';

        vm.displayNewWOTemplateTableFlag = true;

        setTimeout(function() {
          $(window).trigger('resize');
        }, 0); //500);
      });
    }

    function saveNewWOTemplate() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiNewWOTemplate.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function updateNewWOTemplate() {}

    function undoForNewWOTemplate() {
      UiGridCommands.undo();
      vm.selectedRowForNewWOTemplate = false;
    }

    function addNewWOTemplate() {
      var newRow = {};

      var cols = vm.gridOptionsNewWOTemplateTable.columnDefs;
      angular.forEach(cols, function(column) {
        newRow[column.id] = '';
      });

      if (vm.selectedRowForNewWOTemplate) {
        var selectedIndex = vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(
          vm.selectedRowForNewWOTemplate
        );
        UiGridCommands.execute('RowAdd', vm.gridContextNewWOTemplate, {
          index: selectedIndex + 1,
          data: newRow
        });
      } else {
        var lastIndex = vm.gridOptionsNewWOTemplateTable.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContextNewWOTemplate, {
          index: lastIndex,
          data: newRow
        });
      }
    }

    function removeNewWOTemplate() {
      vm.gridOptionsNewWOTemplateTable.data.splice(
        vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(
          vm.selectedRowForNewWOTemplate
        ),
        1
      );
      vm.newRowForNewWOTemplate = false;
      vm.gridApiNewWOTemplate.selection.clearSelectedRows();
      vm.gridApiNewWOTemplate.core.refresh();
      vm.selectedRowForNewWOTemplate = false;
    }

    function exportFileForNewWOTemplate() {
      vm.gridApiNewWOTemplateexporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    // New Task List

    function beginCellEditNewTaskList(rowEntity) {
      var index = _.indexOf(vm.gridOptionsNewTaskListTable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextNewTaskList, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function rowSelectionChangedNewTaskList(rowEntity) {
      vm.selectedRowForNewTaskList = rowEntity.isSelected
        ? rowEntity.entity
        : false;
      vm.selectedNewIndexForNewTaskList = vm.gridOptionsNewTaskListTable.data.lastIndexOf(
        vm.selectedRowForNewTaskList
      );
      vm.previousNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList - 1;
      vm.nextNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList + 1;
      //These checks happen once per selected row
      //Is the selected row already the last Element? Then disable the down button
      //Is the selected row the first element in the list? Then disable the up button
      if (
        vm.nextNewIndexForNewTaskList ===
        vm.gridOptionsNewTaskListTable.data.length
      ) {
        vm.lastNewElementForNewTaskList = true;
        vm.firstNewElementForNewTaskList = false;
      } else {
        vm.lastNewElementForNewTaskList = false;
      }

      if (vm.previousNewIndexForNewTaskList < 0) {
        vm.firstNewElementForNewTaskList = true;
        vm.lastNewElementForNewTaskList = false;
      } else {
        vm.firstNewElementForNewTaskList = false;
      }
    }

    function setupUiGridForNewTaskList() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'newTaskList.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiNewTaskList = gridApi;
          vm.gridContextNewTaskList.gridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope, beginCellEditNewTaskList);
          gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef) {
            if (colDef.id === 'taskParallelToPrevious') {
              recalcTaskSequenceForNewTaskList();
            }
            TransitionData.setDirtyRows('yes');
          });

          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedNewTaskList
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRow);
        },
        enableSorting: false
      });
    }

    function displayNewTaskListTable() {
      AdminJsonService.getTaskListColumnDefs().then(function(data) {
        var tableData = data;

        vm.gridOptionsNewTaskListTable.data = UiGridUtilService.extractTableCellValues(
          tableData
        );

        vm.gridDataNewTaskListCopy = angular.copy(
          vm.gridOptionsNewTaskListTable.data
        );
        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

        colDefs = UiGridUtilService.autoColWidth(
          colDefs,
          tableData.rowMetadata
        );
        vm.gridOptionsNewTaskListTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
          colDefs
        );
        vm.gridOptionsNewTaskListTable.columnDefs = colDefs;
        vm.gridOptionsNewTaskListTable.exporterCsvFilename = 'newTaskList.csv';

        setTimeout(function() {
          $(window).trigger('resize');
        }, 0); //500);
      });
    }

    function moveSelectedUpForNewTaskList() {
      vm.selectedNewIndexForNewTaskList = vm.gridOptionsNewTaskListTable.data.lastIndexOf(
        vm.selectedRowForNewTaskList
      );
      if (vm.previousNewIndexForNewTaskList > -1) {
        vm.previousNewIndexForNewTaskList =
          vm.selectedNewIndexForNewTaskList - 1;
        vm.nextNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList + 1;

        vm.previousNewRowDataForNewTaskList =
          vm.gridOptionsNewTaskListTable.data[
            vm.previousNewIndexForNewTaskList
          ];

        vm.nextNewRowDataForNewTaskList =
          vm.gridOptionsNewTaskListTable.data[vm.nextNewIndexForNewTaskList];

        vm.gridOptionsNewTaskListTable.data[vm.previousNewIndexForNewTaskList] =
          vm.gridOptionsNewTaskListTable.data[
            vm.selectedNewIndexForNewTaskList
          ];
        vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndexForNewTaskList] =
          vm.previousNewRowDataForNewTaskList;
        vm.selectedNewIndexForNewTaskList =
          vm.selectedNewIndexForNewTaskList - 1;

        checkNewStartForNewTaskList();
        checkNewEndForNewTaskList();
      } else {
      }
      //vm.gridApiNewTaskList.cellNav.scrollToFocus(vm.selectedRowForNewTaskList);
      recalcTaskSequenceForNewTaskList();
      vm.gridApiNewTaskList.core.refreshRows().then(function() {
        vm.gridApiNewTaskList.selection.selectRow(
          vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndexForNewTaskList]
        );
      });
    }

    function moveSelectedDownForNewTaskList() {
      vm.selectedNewIndexForNewTaskList = vm.gridOptionsNewTaskListTable.data.lastIndexOf(
        vm.selectedRowForNewTaskList
      );

      if (
        vm.nextNewIndexForNewTaskList !==
        vm.gridOptionsNewTaskListTable.data.length
      ) {
        vm.previousNewIndexForNewTaskList =
          vm.selectedNewIndexForNewTaskList - 1;
        vm.nextNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList + 1;

        vm.previousNewRowDataForNewTaskList =
          vm.gridOptionsNewTaskListTable.data[
            vm.previousNewIndexForNewTaskList
          ];

        vm.nextNewRowDataForNewTaskList =
          vm.gridOptionsNewTaskListTable.data[vm.nextNewIndexForNewTaskList];

        vm.gridOptionsNewTaskListTable.data[vm.nextNewIndexForNewTaskList] =
          vm.gridOptionsNewTaskListTable.data[
            vm.selectedNewIndexForNewTaskList
          ];
        vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndexForNewTaskList] =
          vm.nextNewRowDataForNewTaskList;
        vm.selectedNewIndexForNewTaskList =
          vm.selectedNewIndexForNewTaskList + 1;

        checkNewEndForNewTaskList();
        checkNewStartForNewTaskList();
      } else {
        //vm.nextIndex = vm.selectedIndex+1;
      }
      //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRowForNewTaskList);
      recalcTaskSequenceForNewTaskList();
      vm.gridApiNewTaskList.core.refreshRows().then(function() {
        vm.gridApiNewTaskList.selection.selectRow(
          vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndexForNewTaskList]
        );
      });
    }

    function addTaskForNewTaskList() {
      MessagesService.clearMessages();
      $modal
        .open({
          templateUrl: 'app/admin-app/mobilityorders/views/addTaskModal.html',
          controller: 'AddTaskModalController',
          controllerAs: 'addTask',
          size: 'lg',
          resolve: {
            data: [
              'AdminJsonService',
              function(AdminJsonService) {
                return AdminJsonService.getTasks('');
              }
            ]
          }
        })
        .result.then(function(data) {
          MessagesService.clearMessages();
          var rowData;
          var selectedRowExists = false;
          if (!(data.taskCode === 'PLAN')) {
            for (
              var i = 0;
              i < vm.gridOptionsNewTaskListTable.data.length;
              i++
            ) {
              rowData = angular.copy(vm.gridOptionsNewTaskListTable.data[i]);
              if (rowData.taskCode === data.taskCode) {
                selectedRowExists = true;
              }
            }
          }
          if (!selectedRowExists) {
            //Assigning additional/default values to the row before adding
            data.taskParallelToPrevious = 'NO';

            if (vm.selectedRowNewTaskList) {
              //Pusing the selected Row after adidng the additional default values.
              vm.selectedIndexForNewTaskList = vm.gridOptionsNewTaskListTable.data.lastIndexOf(
                vm.selectedRowForNewTaskList
              );
              UiGridCommands.execute('RowAdd', vm.gridContextNewTaskList, {
                index: vm.selectedIndexForNewTaskList + 1,
                data: data
              });
            } else {
              var lastIndex = vm.gridOptionsNewTaskListTable.data.length;
              UiGridCommands.execute('RowAdd', vm.gridContextNewTaskList, {
                index: lastIndex,
                data: data
              });
            }
          } else {
            MessagesService.addMessage(
              'Task Code [' + data.taskCode + '] is already added to list',
              'warning'
            );
          }
        });
    }

    function removeTaskForNewTaskList() {
      // Remove an item
      vm.gridOptionsNewTaskListTable.data.splice(
        vm.gridOptionsNewTaskListTable.data.lastIndexOf(
          vm.selectedRowForNewTaskList
        ),
        1
      );
      recalcTaskSequenceForNewTaskList();
    }

    function saveTasksForNewTaskList() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiNewTaskList.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function undoForNewTaskList() {
      UiGridCommands.undo();
      vm.selectedRowForNewTaskList = false;
    }

    function recalcTaskSequenceForNewTaskList() {
      // this is a new task list with the re-sequenced tasks
      var sequencedData = [];
      var sequenceNumber = 10; // start with 10 (incremented by 10)

      var rowData;

      for (var i = 0; i < vm.gridOptionsNewTaskListTable.data.length; i++) {
        rowData = angular.copy(vm.gridOptionsNewTaskListTable.data[i]);
        if (rowData.taskParallelToPrevious === 'YES') {
          rowData.taskSequence = sequenceNumber.toString();
        } else {
          // the sequence should start with 10 for the table
          if (i > 0) {
            sequenceNumber += 10;
          }
          rowData.taskSequence = sequenceNumber.toString();
        }

        sequencedData.push(rowData);
      }

      // update data with newly calculated task sequence numbers
      vm.gridOptionsNewTaskListTable.data = sequencedData;
    }

    function exportFileForNewTaskList() {
      vm.gridApiNewTaskList.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    function checkNewStartForNewTaskList() {
      vm.previousNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList - 1;
      if (vm.previousNewIndexForNewTaskList < 0) {
        vm.firstNewElementForNewTaskList = true;
      } else {
        vm.firstNewElementForNewTaskList = false;
      }
    }

    function checkNewEndForNewTaskList() {
      vm.nextNewIndexForNewTaskList = vm.selectedNewIndexForNewTaskList + 1;
      if (
        vm.nextNewIndexForNewTaskList ===
        vm.gridOptionsNewTaskListTable.data.length
      ) {
        vm.lastNewElementForNewTaskList = true;
      } else {
        vm.lastNewElementForNewTaskList = false;
      }
    }

    // Add Task for New Task List

    function rowSelectionChangedNewAddTask(row) {
      vm.selectedRowNewAddTask = row.isSelected ? row.entity : false;
    }

    function setupUiGridForNewAddTask() {
      return {
        enableRowSelection: true,
        multiSelect: false,
        enableSorting: false,
        rowHeight: 45,
        enableColumnMenus: false,
        enableGridMenu: true,
        onRegisterApi: function(gridApi) {
          vm.gridApiNewAddTask = gridApi;
          // Register Events
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedNewAddTask
          );
        }
      };
    }

    // UDA

    function beginCellEditNewUDA(rowEntity) {
      var index = _.indexOf(vm.gridOptionsNewUDATable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextNewUDA, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEditNewUDA(rowEntity) {
      TransitionData.setDirtyRows('yes');
    }

    function rowSelectionChangedNewUDA(row) {
      vm.selectedRowForNewUDA = row.entity;
      if (
        vm.selectedRowForNewUDA.id === undefined ||
        vm.selectedRowForNewUDA.id === ''
      ) {
        vm.newRowForNewUDA = true;
      } else {
        vm.newRowForNewUDA = false;
      }
      vm.selectedIndexForNewUDA = vm.gridOptionsNewUDATable.data.lastIndexOf(
        vm.selectedRowForNewUDA
      );
    }

    function setupUiGridForNewUDA() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'newUDA.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiNewUDA = gridApi;
          vm.gridContextNewUDA.gridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope, beginCellEditNewUDA);
          gridApi.edit.on.afterCellEdit($scope, afterCellEditNewUDA);
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedNewUDA
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRowForNewUDA);
        }
      });
    }

    function displayNewUDATable() {
      AdminJsonService.getUDAColumnDefs().then(function(data) {
        var tableData = data;

        vm.gridOptionsNewUDATable.data = UiGridUtilService.extractTableCellValues(
          tableData
        );
        vm.gridDataNewUDACopy = angular.copy(vm.gridOptionsNewUDATable.data);
        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

        colDefs = UiGridUtilService.autoColWidth(
          colDefs,
          tableData.rowMetadata
        );
        vm.gridOptionsNewUDATable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
          colDefs
        );
        vm.gridOptionsNewUDATable.columnDefs = colDefs;
        vm.gridOptionsNewUDATable.exporterCsvFilename = 'newUDA.csv';
      });
    }

    function saveNewUDA() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiNewUDA.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function updateNewUDA() {}

    function undoForNewUDA() {
      UiGridCommands.undo();
      vm.selectedRowForNewUDA = false;
      vm.newRowForNewUDA = false;
    }

    function addNewUDA() {
      var newRowForNewUDA = {};
      var cols = vm.gridOptionsNewUDATable.columnDefs;
      angular.forEach(cols, function(column) {
        newRowForNewUDA[column.id] = '';
      });
      if (vm.selectedRowForNewUDA) {
        var selectedIndex = vm.gridOptionsNewUDATable.data.lastIndexOf(
          vm.selectedRowForNewUDA
        );
        UiGridCommands.execute('RowAdd', vm.gridContextNewUDA, {
          index: selectedIndex + 1,
          data: newRowForNewUDA
        });
      } else {
        var lastIndex = vm.gridOptionsNewUDATable.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContextNewUDA, {
          index: lastIndex,
          data: newRowForNewUDA
        });
      }
    }

    function exportFileForNewUDA() {
      vm.gridApiNewUDA.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    function discardNewUDA() {
      vm.gridOptionsNewUDATable.data.splice(
        vm.gridOptionsNewUDATable.data.lastIndexOf(vm.selectedRowForNewUDA),
        1
      );
      vm.newRowForNewUDA = false;
      vm.gridApiNewUDA.selection.clearSelectedRows();
      vm.gridApiNewUDA.core.refresh();
      vm.selectedRowForNewUDA = false;
    }

    // Document URLs

    function beginCellEditNewLinks(rowEntity) {
      var index = _.indexOf(vm.gridOptionsNewLinksTable.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContextNewLinks, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEditNewLinks(rowEntity) {
      TransitionData.setDirtyRows('yes');
    }

    function rowSelectionChangedNewLinks(row) {
      vm.selectedRowForNewLinks = row.entity;
      if (
        vm.selectedRowForNewLinks.id === undefined ||
        vm.selectedRowForNewLinks.id === ''
      ) {
        vm.newRowForNewLinks = true;
      } else {
        vm.newRowForNewLinks = false;
      }
      vm.selectedIndexForNewLinks = vm.gridOptionsNewLinksTable.data.lastIndexOf(
        vm.selectedRowForNewLinks
      );
    }

    function setupUiGridForNewLinks() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: 'newLinks.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApiNewLinks = gridApi;
          vm.gridContextNewLinks.gridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope, beginCellEditNewLinks);
          gridApi.edit.on.afterCellEdit($scope, afterCellEditNewLinks);
          gridApi.selection.on.rowSelectionChanged(
            $scope,
            rowSelectionChangedNewLinks
          );
          //saving inline edited rows
          //gridApi.rowEdit.on.saveRow($scope, saveRowForNewLinks);
        }
      });
    }

    function displayNewLinksTable() {
      AdminJsonService.getLinksColumnDefs().then(function(data) {
        var tableData = data;

        vm.gridOptionsNewLinksTable.data = UiGridUtilService.extractTableCellValues(
          tableData
        );
        vm.gridDataNewLinksCopy = angular.copy(
          vm.gridOptionsNewLinksTable.data
        );
        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

        colDefs = UiGridUtilService.autoColWidth(
          colDefs,
          tableData.rowMetadata
        );
        vm.gridOptionsNewLinksTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
          colDefs
        );
        vm.gridOptionsNewLinksTable.columnDefs = colDefs;
        vm.gridOptionsNewLinksTable.exporterCsvFilename = 'newLinks.csv';

        // setTimeout(function () {
        //   $(window).trigger('resize');
        // }, 0);  //500);
      });
    }

    function saveNewLink() {
      Dialog.confirm('Would you like to save your changes?').then(function() {
        vm.gridApiNewLinks.rowEdit.flushDirtyRows();
        UiGridCommands.resetCallbacks();
        updateUndoStack();
      });
    }

    function updateNewLink() {}

    function undoForNewLinks() {
      UiGridCommands.undo();
    }

    function addNewLink() {
      //Initialize the new row and then pass it to the UiGridCommands Service
      var newRowForNewLinks = {};
      var cols = vm.gridOptionsNewLinksTable.columnDefs;
      angular.forEach(cols, function(column) {
        newRowForNewLinks[column.id] = '';
      });
      if (vm.selectedRowForNewLinks) {
        var selectedIndex = vm.gridOptionsNewLinksTable.data.lastIndexOf(
          vm.selectedRowForNewLinks
        );
        UiGridCommands.execute('RowAdd', vm.gridContextNewLinks, {
          index: selectedIndex + 1,
          data: newRowForNewLinks
        });
      } else {
        var lastIndex = vm.gridOptionsNewLinksTable.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContextNewLinks, {
          index: lastIndex,
          data: newRowForNewLinks
        });
      }
    }

    function discardNewLink() {
      vm.gridOptionsNewLinksTable.data.splice(
        vm.gridOptionsNewLinksTable.data.lastIndexOf(vm.selectedRowNewLinks),
        1
      );
      vm.newRowForNewLinks = false;
      vm.gridApiNewLinks.selection.clearSelectedRows();
      vm.gridApiNewLinks.core.refresh();
      vm.selectedRowForNewLinks = false;
    }

    function exportFileForNewLinks() {
      vm.gridApiNewLinks.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }
  }
})();
