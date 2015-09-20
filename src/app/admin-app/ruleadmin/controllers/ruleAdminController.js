(function() {
  'use strict';

  angular
    .module('admin.app')
    .controller('RuleAdminController', ruleAdminController);

  ruleAdminController.$inject = [
    '$scope',
    '$log',
    '$filter',
    '$q',
    '$stateParams',
    '$templateCache',
    '$interval',
    'uiGridExporterConstants',
    'uiGridConstants',
    'ruleCategoryConfig',
    'AdminJsonService',
    'ModalRowEdit',
    'UiGridUtilService',
    'Dialog',
    '$rootScope',
    'TransitionData',
    'MessagesService',
    'UiGridCommands',
    '$modal',
    '$timeout'
  ];

  function ruleAdminController(
    $scope,
    $log,
    $filter,
    $q,
    $stateParams,
    $templateCache,
    $interval,
    uiGridExporterConstants,
    uiGridConstants,
    ruleCategoryConfig,
    AdminJsonService,
    ModalRowEdit,
    UiGridUtilService,
    Dialog,
    $rootScope,
    TransitionData,
    MessagesService,
    UiGridCommands,
    $modal,
    $timeout
  ) {
    var vm = this;

    // sort the rule category values in ascending order
    vm.ruleCategoryConfig = $filter('orderBy')(ruleCategoryConfig, 'title');

    vm.ruleCategory = vm.ruleCategoryConfig[5]; // default to "WO Description"

    vm.woDescription = '';
    vm.orderType = '';
    vm.state = {};

    vm.continueNextState = false;
    vm.gridContext = {};
    vm.gridOptions = setupGridOptions();
    vm.gridContext.gridOptions = vm.gridOptions;
    vm.isEmptyTable = false;
    vm.mySlections = [];

    // Table lookup accordion open by default
    vm.searchAccordionOpen = true;

    vm.uiGridExporterConstants = uiGridExporterConstants;

    // ========================================================
    // Use Function Declarations to hide implementation details
    // and keep the bindable members up top
    // ========================================================

    vm.errorTable = errorTable;
    vm.search = search;
    vm.toggleEmptyColumns = toggleEmptyColumns;
    vm.insertEmptyRowTop = insertEmptyRowTop;
    vm.insertEmptyRowBottom = insertEmptyRowBottom;
    vm.insertEmptyRowAtLocation = insertEmptyRowAtLocation;
    vm.insertCopyAtLocation = insertCopyAtLocation;
    vm.changeRuleCategory = changeRuleCategory;
    vm.addItem = addItem;
    vm.discardItem = discardItem;
    vm.export = exportFile;
    vm.isEmptyRowFound = isEmptyRowFound;
    vm.isDuplicateFound = isDuplicateFound;
    vm.isRuleInvalid = isRuleInvalid;
    vm.save = save;
    vm.undo = undo;
    vm.refreshData = refreshData;

    init();

    function init() {
      // Revert templateCache
      $templateCache.put(
        'ui-grid/selectionRowHeader',
        '<div class="ui-grid-disable-selection"><div class="ui-grid-cell-contents"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>'
      );

      // add column def to support required field indicator
      UiGridUtilService.loadTemplate('ui-grid/uiGridHeaderCell');

      $log.debug('$stateParams => ' + angular.toJson($stateParams));
      setTheDropdownValueWhenNavigateFromWOTemplateScreen();

      UiGridCommands.registerCallbacks(updateUndoStack);

      MessagesService.clearMessages();
      UiGridUtilService.resetNextIdValue();
    }

    function setTheDropdownValueWhenNavigateFromWOTemplateScreen() {
      if ($stateParams.ruleCategoryValue === 'taskQueue') {
        vm.ruleCategory = vm.ruleCategoryConfig[3];
      } else if ($stateParams.ruleCategoryValue === 'taskDuration') {
        vm.ruleCategory = vm.ruleCategoryConfig[1];
      } else if ($stateParams.ruleCategoryValue === 'taskDelegation') {
        vm.ruleCategory = vm.ruleCategoryConfig[0];
      } else {
        vm.ruleCategory = vm.ruleCategoryConfig[5]; // default to "WO Description" for testing
      }
    }

    function errorTable() {
      return UiGridUtilService.createGrid({
        onRegisterApi: function(gridApi) {
          vm.gridApi = gridApi;
        }
      });
    }

    function beginCellEdit(rowEntity) {
      var index = _.indexOf(vm.gridOptions.data, rowEntity);
      UiGridCommands.execute('CellEdit', vm.gridContext, {
        index: index,
        rowEntity: rowEntity
      });
    }

    function afterCellEdit(rowEntity) {
      //            $interval(function(){
      //                if(!vm.isEmptyTable && !vm.isEmptyRowFound()
      //                        && (!!vm.undoStack && vm.undoStack.length > 0)
      //                        && (vm.gridApi.rowEdit.getDirtyRows().length > 0)) {
      //                    TransitionData.setDirtyRows('yes');
      //                    //console.log("TransitionData::: yes");
      //                }
      //                else {
      //                    TransitionData.setDirtyRows('no');
      //                    //console.log("TransitionData::: no");
      //                }
      //            }, 1, 1);
      checkTransitionData();
    }

    // Handle grid events
    function rowSelectionChanged(row) {
      vm.selectedRow = row.isSelected ? row.entity : false;
      var msg = 'row selected ' + row.isSelected;

      //$log.log(msg);
      //$log.debug(vm.selectedRow);

      // Check to see if the selected row is a new row
      if (vm.selectedRow) {
        if (
          vm.selectedRow.id === undefined ||
          vm.selectedRow.id === '' ||
          _.startsWith(vm.selectedRow.id, 'GUI') === true
        ) {
          //if((vm.selectedRow.id) === undefined || vm.selectedRow.id === '' ){
          vm.newRow = true;
          //vm.gridApi.rowEdit.setRowsDirty(vm.selectedRow);
        }
      } else {
        vm.newRow = false;
      }

      //Go to selected row
      vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
      //vm.gridApi.core.scrollTo( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
      //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
    }

    function saveRow(rowEntity) {
      var promise = AdminJsonService.updateRuleCategory(
        vm.ruleCategory,
        rowEntity,
        vm.gridOptions.columnDefs
      );

      vm.gridApi.rowEdit.setSavePromise(rowEntity, promise);

      promise.then(function(response) {
        var oldId = response.data[0].oldId;
        var newId = response.data[0].newId;

        // if this is new row being inserted in db - the response JSON will contain the id value
        // as the unique record id
        if (!oldId) {
          // update current new row with newId received from COLM
          // since rowEntity is shadow copy of the row enity in vm.gridOptions.data array,
          // this will also update the id value for the saved row
          rowEntity.id = newId;
          //Reset local storage id
          UiGridUtilService.resetNextIdValue();
        }
      });

      return promise;
    }

    function setupGridOptions() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: vm.ruleCategory.value + '.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApi = gridApi;
          vm.gridContext.gridApi = gridApi;
          // Register Events
          gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
          gridApi.edit.on.afterCellEdit($scope, afterCellEdit);
          //TODO
          //gridApi.cellNav.on.navigate($scope, cellNavigate);
          gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChanged);
          //saving inline edited rows
          gridApi.rowEdit.on.saveRow($scope, saveRow);
        },
        gridMenuCustomItems: [
          {
            title: 'Hide Empty Columns',
            action: function() {
              vm.toggleEmptyColumns(false);
            }
          }
        ]
      });
    }

    function getRuleCategorySearchResult() {
      vm.ruleCategoryPromise = AdminJsonService.getRuleCategory(
        vm.ruleCategory,
        vm.woType
      ).then(
        function(data) {
          vm.data = UiGridUtilService.extractTableCellValues(data);

          var colDefs = UiGridUtilService.extractColumnDefs(
            data,
            null,
            vm.ruleCategory.pinnedColumns
          );
          //var colDefs = UiGridUtilService.extractColumnDefs(data);

          // sort the data on the first visible column in asc order
          vm.gridOptions.data = $filter('orderBy')(
            vm.data,
            vm.ruleCategory.sortId
              ? vm.ruleCategory.sortId
              : UiGridUtilService.getFirstVisibleColumnId(colDefs),
            false
          );

          //vm.gridOptions.data = vm.data;
          $log.debug(vm.gridOptions.data.length);
          vm.gridDataCopy = angular.copy(vm.gridOptions.data);

          colDefs = UiGridUtilService.autoColWidth(
            colDefs,
            data.rowMetadata,
            vm.ruleCategory.columnWidths
          );
          vm.gridOptions.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
            colDefs
          );
          vm.gridOptions.columnDefs = colDefs;
          vm.gridOptions.exporterCsvFilename = vm.ruleCategory.value + '.csv';
          vm.selectedRow = false;
          vm.newRow = false;
          vm.showResults = true;
          vm.emptyColumns = UiGridUtilService.getEmptyColumns(data);
          vm.enabledColumns = UiGridUtilService.getEnabledColumns(data);
        },
        function(data) {
          vm.showResults = true;
          vm.isEmptyTable = true;
          // vm.errorTable.data = null;
          // vm.errorTable.columnDefs = null;
        }
      );
    }

    function updateUndoStack() {
      // Undo configuration
      // Get updated undo stack from service when it changes for enabling/disabling undo button
      vm.undoStack = UiGridCommands.getCommandStack();
    }

    function search() {
      vm.showResults = false;
      getRuleCategorySearchResult();
      vm.gridApi.selection.clearSelectedRows();
      vm.gridOptions.gridMenuCustomItems = [
        {
          title: 'Hide Empty Columns',
          action: function() {
            vm.toggleEmptyColumns(false);
          }
        }
      ];
    }

    function toggleEmptyColumns(isShowClicked) {
      var emptyColumns = vm.emptyColumns;
      var enabledColumns = vm.enabledColumns;
      var pinnedColumns = vm.ruleCategory.pinnedColumns;

      for (var i = 0; i < vm.gridOptions.columnDefs.length; i++) {
        if (
          _.includes(enabledColumns, vm.gridOptions.columnDefs[i].id) &&
          _.includes(emptyColumns, vm.gridOptions.columnDefs[i].id) &&
          !_.includes(pinnedColumns, vm.gridOptions.columnDefs[i].id)
        ) {
          if (isShowClicked) {
            vm.gridOptions.columnDefs[i].visible = true;
            vm.gridOptions.gridMenuCustomItems = [
              {
                title: 'Hide Empty Columns',
                action: function() {
                  vm.toggleEmptyColumns(false);
                }
              }
            ];
          } else {
            vm.gridOptions.columnDefs[i].visible = false;
            vm.gridOptions.gridMenuCustomItems = [
              {
                title: 'Show Empty Columns',
                action: function() {
                  vm.toggleEmptyColumns(true);
                }
              }
            ];
          }
        }
      }

      vm.gridApi.core.refresh();
    }

    function insertEmptyRowTop() {
      vm.gridOptions.data.unshift({});
    }

    function insertEmptyRowBottom() {
      vm.gridOptions.data.push(vm.gridOptions.data.length, 0, {});
    }

    function insertEmptyRowAtLocation() {
      vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
      vm.gridOptions.data.splice(vm.selectedIndex + 1, 0, {
        woDescription: '',
        orderType: '',
        taskDescription: '',
        tasksDuration: '',
        tasksEscalation: ''
      });
      //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex+1], vm.gridOptions.columnDefs[0]);
    }

    function insertCopyAtLocation() {
      var selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
      $log.debug(vm.selectedRow);
      vm.dataCopy = angular.copy(vm.gridOptions.data[vm.selectedIndex]);
      //vm.dataCopy.id = '';
      var newIdVal = UiGridUtilService.getNextIdValue();
      vm.dataCopy.id = newIdVal;
      $log.debug('copy data ');
      $log.debug(vm.dataCopy);
      UiGridCommands.execute('RowDuplicate', vm.gridContext, {
        index: selectedIndex,
        data: vm.dataCopy
      });
      //Set copied row to dirty
      $interval(
        function() {
          vm.gridApi.rowEdit.setRowsDirty([
            vm.gridOptions.data[vm.selectedIndex]
          ]);
          //Also works
          //TransitionData.setDirtyRows('yes');
        },
        1,
        1
      );

      //Will prompt user when they do screen change
      //            $interval(function(){
      //                TransitionData.setDirtyRows('yes');
      //            }, 1, 1);
      checkTransitionData();
    }

    function changeRuleCategory(ruleCategoryOldValue) {
      // reset table filter field
      vm.ruleCategoryFilter = '';

      //If dirty rows found, then prompt the user to stay on current view or continue
      if (!!vm.undoStack && vm.undoStack.length > 0) {
        //event.preventDefault();
        $modal
          .open({
            templateUrl:
              'app/admin-app/ruleadmin/views/ruleAdminConfirmationModal.html',
            scope: $scope,
            size: 'lg'
          })
          .result.then(function() {
            if (vm.continueNextState) {
              //This is a redundant code. Need to figure if I can merge
              //this code and the code in else loop when there are no dirty rows
              if (
                vm.ruleCategory.title === 'Task Queue' &&
                vm.woTypes === undefined
              ) {
                vm.woTypePromise = AdminJsonService.getWOTypes().then(function(
                  data
                ) {
                  vm.woTypes = $filter('orderBy')(data, 'title');
                });
              }
              //Clear all dirty rows
              $interval(
                function() {
                  vm.gridOptions.data.forEach(function(value, index) {
                    vm.gridApi.rowEdit
                      .getDirtyRows()
                      .forEach(function(gridRow, index) {
                        if (gridRow.entity.id === value.id) {
                          vm.gridApi.rowEdit.getDirtyRows().splice(index, 1);
                        }
                      });
                    delete value.isDirty;
                    delete value.isError;
                  });
                  //var gridRows = vm.gridApi.rowEdit.getDirtyRows();
                },
                1,
                1
              );

              UiGridCommands.resetCallbacks();
              updateUndoStack();
              vm.isEmptyTable = false;
              MessagesService.clearMessages();
              UiGridUtilService.resetNextIdValue();
              vm.gridOptions.gridMenuCustomItems = [
                {
                  title: 'Hide Empty Columns',
                  action: function() {
                    vm.toggleEmptyColumns(false);
                  }
                }
              ];

              vm.showResults = false;
              //Scroll to the topmost element again
              //                            vm.gridApi.core.queueRefresh().then(function () {
              //                                vm.gridApi.cellNav.scrollToFocus(vm.gridOptions.data[0], vm.gridOptions.columnDefs[0]);
              //                            });
            } else {
              //set the Rule Category dropdown to old value as the user selected 'NO'
              for (var i = 0; i < vm.ruleCategoryConfig.length; i++) {
                if (vm.ruleCategoryConfig[i].title === ruleCategoryOldValue) {
                  vm.ruleCategory = vm.ruleCategoryConfig[i];
                  break;
                }
              }
            }
          });
      } else {
        // If no dirty rows just continue normally
        if (
          vm.ruleCategory.title === 'Task Queue' &&
          vm.woTypes === undefined
        ) {
          vm.woTypePromise = AdminJsonService.getWOTypes().then(function(data) {
            vm.woTypes = $filter('orderBy')(data, 'title');
          });
        }

        vm.woType = ''; // default to blank value
        vm.isEmptyTable = false;
        vm.showResults = false;
        MessagesService.clearMessages();
        UiGridUtilService.resetNextIdValue();
        vm.gridOptions.gridMenuCustomItems = [
          {
            title: 'Hide Empty Columns',
            action: function() {
              vm.toggleEmptyColumns(false);
            }
          }
        ];
      }
    }

    /**
     * Add or Edit an item
     * @param {Object} item Optional item if this is an edit operation
     */
    function addItem(item) {
      var newIdVal = UiGridUtilService.getNextIdValue();
      $log.debug(newIdVal);

      var newRow = {};
      var cols = vm.gridOptions.columnDefs;
      angular.forEach(cols, function(column) {
        newRow[column.id] = '';
        //newRow[column.id] = newIdVal;
      });
      newRow.id = newIdVal;

      if (
        !!vm.ruleCategory.autopopulatedFields &&
        vm.ruleCategory.autopopulatedFields.length > 0
      ) {
        angular.forEach(vm.ruleCategory.autopopulatedFields, function(prop) {
          _.merge(newRow, prop);
        });
      }

      if (vm.selectedRow) {
        vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
        UiGridCommands.execute('RowAdd', vm.gridContext, {
          index: vm.selectedIndex + 1,
          data: newRow
        });
        $log.debug(vm.gridOptions.data[vm.selectedIndex + 1]);
      } else {
        var lastIndex = vm.gridOptions.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContext, {
          index: lastIndex,
          data: newRow
        });
      }

      //Will prompt user when they do screen change
      //            $interval(function(){
      //                TransitionData.setDirtyRows('yes');
      //            }, 1, 1);
      checkTransitionData();
    }

    function discardItem(item) {
      // Remove an item that is a new row and not saved
      //Could be empty row, copied row, new row with data
      vm.gridOptions.data.splice(
        vm.gridOptions.data.lastIndexOf(vm.selectedRow),
        1
      );
      var selectedRows = vm.gridApi.selection.getSelectedGridRows();
      var dataRows = selectedRows.map(function(selectedRow) {
        return selectedRow.entity;
      });
      vm.gridApi.rowEdit.setRowsClean(dataRows);
      vm.gridApi.selection.clearSelectedRows();
      vm.gridApi.core.queueRefresh();
      vm.selectedRow = false;
      vm.newRow = false;
      // remove error message display
      MessagesService.clearMessages();
      //Update undo stack because we want to completely remove the entire row and all its edits
      vm.undoStack.length = 0;
      //            if(vm.undoStack.length !== 0){
      //                vm.undoStack.length= vm.undoStack.length-1;
      //            }
      checkTransitionData();
    }

    function exportFile() {
      vm.gridApi.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
    }

    function isEmptyRowFound() {
      return UiGridUtilService.isEmptyRowFound(vm.gridOptions);
    }

    function isDuplicateFound() {
      //Check on dirty rows - edited rows
      var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
      if (dirtyRows.length > 0) {
        var duplicates = UiGridUtilService.isDuplicateCheck(
          vm.gridOptions,
          dirtyRows,
          vm.ruleCategory.uniqueColumns
        );
        $log.debug('Duplicate Indices: ' + angular.toJson(duplicates));
        //$log.debug(duplicates.length);
        //$log.debug("Length of records: " + vm.gridOptions.data.length);
        return duplicates;
      } else {
        var duplicates = [];
        return duplicates;
      }
    }

    function isRuleInvalid() {
      //Check on dirty rows - edited rows
      var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
      if (dirtyRows.length > 0) {
        var ruleInvalidIndices = UiGridUtilService.validateTaskDelegationRule(
          vm.gridOptions,
          dirtyRows,
          vm.ruleCategory.rule
        );
        console.debug('These rows violate the rule:: ' + ruleInvalidIndices);
      }
      return ruleInvalidIndices;
    }

    function save() {
      MessagesService.clearMessages();

      $timeout(function() {
        if (vm.isEmptyRowFound()) {
          MessagesService.addMessage(
            'Empty row(s) found in the table. Please either discard the empty row or enter values before saving again.',
            'error'
          );
        } else if (!!vm.ruleCategory.rule && vm.isRuleInvalid().length > 0) {
          MessagesService.addMessage(
            vm.ruleCategory.rule.errorMessage,
            'error'
          );
          //Temporary workaround - prevent user from using undo when duplicate is detected
          //vm.undoStack.length = 0;
        } else if (vm.isDuplicateFound().length > 0) {
          var duplicateIndices = vm.isDuplicateFound();
          MessagesService.addMessage(
            'There are duplicate values found at Row: ' +
              duplicateIndices +
              '. Please replace these duplicate values in order to save your changes.',
            'error'
          );
          //var message = ""
          //MessagesService.addMessage(message, "error");

          //Temporary workaround - prevent user from using undo when duplicate is detected
          //vm.undoStack.length = 0;
        } else if (vm.gridApi.rowEdit.getDirtyRows().length > 0) {
          Dialog.confirm('Would you like to save your changes?').then(
            function() {
              vm.gridApi.rowEdit.flushDirtyRows();
              vm.newRow = false;
              UiGridCommands.resetCallbacks();
              updateUndoStack();
            }
          );
        }
      }, 500);
    }

    function undo() {
      //A way to restore the grid data completely - currently just for the selected row though
      //vm.gridOptions.data[vm.selectedIndex] = vm.gridDataCopy [vm.selectedIndex];
      $log.debug('Clicked on undo');

      UiGridCommands.undo();

      vm.gridApi.selection.clearSelectedRows();
      vm.gridApi.core.refreshRows();

      $log.debug('Checking undoStack length: ' + vm.undoStack.length);

      //Each time undo is clicked -finding current dirty rows
      var gridRows = vm.gridApi.rowEdit.getDirtyRows();
      $log.debug('Current Dirty Rows: ' + gridRows);
      var dirtyRow;
      var rowHash;
      var dirtyid;
      var rowTobeRemoved;
      vm.dirtyIndices = [];

      //Looping through to determine which grid row the dirty row corresponds to by matching the id
      for (var x = 0; x < gridRows.length; x++) {
        dirtyRow = gridRows[x].entity;
        $log.debug('Current Dirty Row (loop): ' + dirtyRow);
        rowHash = vm.gridOptions.getRowIdentity(dirtyRow);
        dirtyid = dirtyRow.id;

        for (var y = 0; y < vm.gridOptions.data.length; y++) {
          //Alternative approach was to use hashkey but not preferred approach
          var hash;
          hash = vm.gridOptions.getRowIdentity(vm.gridOptions.data[y]);

          if (vm.gridOptions.data[y].id === dirtyid) {
            $log.debug('found it');
            rowTobeRemoved = vm.gridOptions.data[y];
            //  rowTobeRemoved.valid = "yes";
            $log.debug(rowTobeRemoved);
            vm.dirtyIndices[x] = vm.gridOptions.data.lastIndexOf(
              rowTobeRemoved
            );
            $log.debug(vm.dirtyIndices);
            break;
          }
        }
      }

      //Cleans up all dirty rows
      $interval(
        function() {
          vm.gridOptions.data.forEach(function(value, index) {
            vm.gridApi.rowEdit.getDirtyRows().forEach(function(gridRow, index) {
              // if ( gridRow.entity.id === value.id ){
              vm.gridApi.rowEdit.getDirtyRows().splice(index, 1);
              delete gridRow.isDirty;
              delete gridRow.isError;
              delete gridRow.isSelected;
              // }
            });
          });

          $log.debug('cleared all dirty rows');
          //TransitionData.setDirtyRows('no');
          //checkTransitionData();
        },
        1,
        1
      );

      //Set the gridData row to be dirty instead
      $interval(
        function() {
          //vm.gridApi.rowEdit.setRowsDirty([rowTobeRemoved] );
          if (vm.dirtyIndices.length > 0) {
            vm.gridApi.grid.rows.forEach(function(value, index) {
              //                        $log.debug(index);
              for (var x = 0; x < vm.dirtyIndices.length; x++) {
                if (index === vm.dirtyIndices[x]) {
                  value.isDirty = true;
                  vm.gridApi.rowEdit.getDirtyRows().push(value);
                }
              }
            });

            // vm.gridApi.rowEdit.setRowsDirty([vm.gridOptions.data[vm.dirtyIndices[0]]]);
          }
          //TransitionData.setDirtyRows('yes');
          //checkTransitionData();
        },
        1,
        1
      );

      //Checking again for dirtyRows will now include the gridData row which has the latest cell values after undo
      var gridRows = vm.gridApi.rowEdit.getDirtyRows();
      $log.debug('before clean');
      $log.debug(gridRows);

      //If user has removed ALL of their changes, we want to clear ALL dirty rows
      //PENDING
      if (vm.undoStack.length === 0) {
        //Cleans up all dirty rows
        $interval(
          function() {
            vm.gridOptions.data.forEach(function(value, index) {
              vm.gridApi.rowEdit
                .getDirtyRows()
                .forEach(function(gridRow, index) {
                  vm.gridApi.rowEdit.getDirtyRows().splice(index, 1);
                  delete gridRow.isDirty;
                  delete gridRow.isError;
                  delete gridRow.isSelected;
                });
            });

            var gridRows = vm.gridApi.rowEdit.getDirtyRows();
            $log.debug('after clean');
            $log.debug(gridRows);

            vm.gridApi.selection.clearSelectedRows();
            vm.gridApi.core.refreshRows();
            vm.selectedRow = false;
            vm.newRow = false;
            //TransitionData.setDirtyRows('no');
            checkTransitionData();
          },
          1,
          1
        );
      }
    }

    /**
     * Workaround to filter on all columns
     * @todo Remove this when ui-grid provides it natively
     */
    function refreshData(filter) {
      vm.gridOptions.data = vm.data;
      while (filter) {
        var oSearchArray = filter.split(' ');
        vm.gridOptions.data = $filter('filter')(
          vm.gridOptions.data,
          oSearchArray[0],
          undefined
        );
        oSearchArray.shift();
        filter = oSearchArray.length !== 0 ? oSearchArray.join(' ') : '';
      }
    }

    /**
     * Checks transition data
     */
    function checkTransitionData() {
      $interval(
        function() {
          if (
            vm.isEmptyRowFound() ||
            (!!vm.undoStack && vm.undoStack.length > 0) ||
            vm.gridApi.rowEdit.getDirtyRows().length > 0
          ) {
            TransitionData.setDirtyRows('yes');
            console.log('TransitionData::: yes');
          } else {
            TransitionData.setDirtyRows('no');
            console.log('TransitionData::: no');
          }
        },
        1,
        1
      );
    }
  }
})();
