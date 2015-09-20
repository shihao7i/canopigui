(function() {
  'use strict';

  angular
    .module('admin.app')
    .controller('LookupAdminController', lookupAdminController);

  lookupAdminController.$inject = [
    '$scope',
    '$log',
    '$filter',
    '$interval',
    'uiGridExporterConstants',
    'lookupTypeConfig',
    'AdminJsonService',
    'UiGridUtilService',
    'ModalRowEdit',
    'Dialog',
    '$rootScope',
    'TransitionData',
    'MessagesService',
    'UiGridCommands',
    '$modal'
  ];

  function lookupAdminController(
    $scope,
    $log,
    $filter,
    $interval,
    uiGridExporterConstants,
    lookupTypeConfig,
    AdminJsonService,
    UiGridUtilService,
    ModalRowEdit,
    Dialog,
    $rootScope,
    TransitionData,
    MessagesService,
    UiGridCommands,
    $modal
  ) {
    var vm = this;
    // sort the lookup type values in ascending order
    vm.lookupTypeConfig = $filter('orderBy')(lookupTypeConfig, 'title');

    // set default dropdown value to "Carrier Name"
    vm.lookupType = vm.lookupTypeConfig[2];

    vm.continueNextState = false;
    vm.gridContext = {};
    vm.gridOptions = setupGridOptions();
    vm.gridContext.gridOptions = vm.gridOptions;
    vm.isEmptyTable = false;

    vm.mySlections = [];
    vm.newRow = false;

    // By default the accordion is open
    vm.searchAccordionOpen = true;

    vm.uiGridExporterConstants = uiGridExporterConstants;

    // ========================================================
    // Use Function Declarations to hide implementation details
    // and keep the bindable members up top
    // ========================================================

    vm.undo = undo;
    vm.isEmptyRowFound = isEmptyRowFound;
    vm.isDuplicateFound = isDuplicateFound;
    vm.isColumnInvalid = isColumnInvalid;
    vm.save = save;
    vm.search = search;
    vm.changeLookupType = changeLookupType;
    vm.addItem = addItem;
    vm.insertCopyAtLocation = insertCopyAtLocation;
    vm.discardItem = discardItem;
    vm.export = exportFile;
    vm.refreshData = refreshData;

    init();

    function init() {
      // add column def to support required field indicator
      UiGridUtilService.loadTemplate('ui-grid/uiGridHeaderCell');
      UiGridCommands.registerCallbacks(updateUndoStack);

      MessagesService.clearMessages();
      UiGridUtilService.resetNextIdValue();
    }

    function getLookupSearchResult() {
      MessagesService.clearMessages();
      vm.lookupTypePromise = AdminJsonService.getLookupType(vm.lookupType).then(
        function(data) {
          vm.data = UiGridUtilService.extractTableCellValues(data);

          var colDefs = UiGridUtilService.extractColumnDefs(data);

          // sort the data on the first visible column in asc order
          vm.gridOptions.data = $filter('orderBy')(
            vm.data,
            vm.lookupType.sortId
              ? vm.lookupType.sortId
              : UiGridUtilService.getFirstVisibleColumnId(colDefs),
            false
          );
          //vm.gridOptions.data = vm.data;

          colDefs = UiGridUtilService.autoColWidth(
            colDefs,
            data.rowMetadata,
            vm.lookupType.columnWidths
          );
          vm.gridOptions.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(
            colDefs
          );
          vm.gridOptions.columnDefs = colDefs;
          vm.gridOptions.exporterCsvFilename = vm.lookupType.value + '.csv';
          vm.gridDataCopy = angular.copy(vm.gridOptions.data);
          vm.selectedRow = false;
          vm.newRow = false;

          vm.showResults = true;
        },
        function(data) {
          vm.showResults = true;
          vm.isEmptyTable = true;
        }
      );
    }

    function updateUndoStack() {
      // Undo configuration
      // Get updated undo stack from service when it changes for enabling/disabling undo button
      vm.undoStack = UiGridCommands.getCommandStack();
    }

    // Handle grid events
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
      //                } else {
      //                    TransitionData.setDirtyRows('no');
      //                    //console.log("TransitionData::: no");
      //                }
      //            }, 1, 1);
      checkTransitionData();
    }

    function rowSelectionChanged(rowEntity) {
      var msg = 'row selected ' + rowEntity.isSelected;
      $log.log(msg);

      vm.selectedRow = rowEntity.isSelected ? rowEntity.entity : false;
      if (vm.selectedRow) {
        if (
          vm.selectedRow.id === undefined ||
          vm.selectedRow.id === '' ||
          _.startsWith(vm.selectedRow.id, 'GUI') === true
        ) {
          vm.newRow = true;
        } else {
          vm.newRow = false;
        }
        vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
        $log.debug('vm.selectedIndex :');
        $log.debug(vm.selectedIndex);

        if (vm.selectedIndex <= 3) {
          vm.limitRow = 3;
        }
        if (vm.selectedIndex < 6 && vm.selectedIndex > 3) {
          vm.limitRow = 0;
        }

        if (vm.selectedIndex >= 6) {
          vm.limitRow = 6;
        }

        if (vm.selectedIndex > vm.limitRow) {
          //$log.debug("limitRow")
          //$log.debug(vm.limitRow);
          vm.gridApi.core.refreshRows().then(function() {
            vm.scrollDownIndex = vm.selectedIndex + 3;
            //$log.debug(vm.scrollDownIndex);

            vm.gridApi.core.scrollTo(
              vm.gridOptions.data[vm.scrollDownIndex],
              vm.gridOptions.columnDefs[0]
            );
          });
        } else {
          vm.gridApi.core.refreshRows().then(function() {
            //$log.debug("limitRow")
            //$log.debug(vm.limitRow);
            vm.scrollUpIndex = vm.selectedIndex - 3;
            //$log.debug(vm.scrollUpIndex);

            vm.gridApi.core.scrollTo(
              vm.gridOptions.data[vm.scrollUpIndex],
              vm.gridOptions.columnDefs[0]
            );
          });
        }
      }
    }

    //@TODO Move scrolling to specified row here from rowSelectionChanged
    //      function scrollTo(rowEntity){
    //          vm.selectedRow = rowEntity.entity;
    //          $log.debug(vm.selectedRow);
    //      }

    function saveRow(rowEntity) {
      //$log.debug("Saving row");
      //$log.debug(vm.selectedRow);
      //$log.debug(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, vm.selectedRow, JSON.parse(vm.lookupType.uniqueColumns)));
      // $log.debug("vm.gridOptions.data => " + angular.toJson(vm.gridOptions.data));

      //$log.debug("[rowEntity] => " + angular.toJson(rowEntity));

      var promise = AdminJsonService.updateLookupType(
        vm.lookupType,
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
          //Reset local storage ID
          UiGridUtilService.resetNextIdValue();
        }
      });

      return promise;
    }

    function setupGridOptions() {
      return UiGridUtilService.createGrid({
        exporterCsvFilename: vm.lookupType.value + '.csv',
        onRegisterApi: function(gridApi) {
          vm.gridApi = gridApi;
          vm.gridContext.gridApi = gridApi;

          // Register events
          gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
          gridApi.edit.on.afterCellEdit($scope, afterCellEdit);
          gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChanged);
          gridApi.rowEdit.on.saveRow($scope, saveRow);
        }
      });
    }

    function undo() {
      UiGridCommands.undo();
      //vm.selectedRow = false;
      //vm.newRow = false;
      vm.gridApi.selection.clearSelectedRows();
      vm.gridApi.core.refreshRows();

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
          vm.lookupType.uniqueColumns
        );
        $log.debug('Duplicates: ' + angular.toJson(duplicates));
        //$log.debug(duplicates.length);
        //$log.debug("Length of records: " + vm.gridOptions.data.length);
        return duplicates;
      }
    }

    function isColumnInvalid() {
      var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
      if (dirtyRows.length > 0) {
        var carrierInvalidIndices = UiGridUtilService.validateEmptyColumnValidationRule(
          vm.gridOptions,
          dirtyRows,
          vm.lookupType.rule
        );
        $log.debug(carrierInvalidIndices);
      }
      return carrierInvalidIndices;
    }

    function save() {
      $log.debug('vm.save called !!!!!!!');

      MessagesService.clearMessages();

      if (vm.isEmptyRowFound()) {
        MessagesService.addMessage(
          'Empty row(s) found in the table. Please either discard the empty row or enter values before saving again.',
          'error'
        );
      } else if (!!vm.lookupType && vm.isColumnInvalid().length > 0) {
        MessagesService.addMessage(vm.lookupType.rule.errorMessage, 'error');
        //Temporary workaround - prevent user from using undo when duplicate is detected
        vm.undoStack.length = 0;
      } else if (vm.isDuplicateFound().length > 0) {
        MessagesService.addMessage(
          'There are duplicate values found. Please replace these duplicate values in order to save your changes.',
          'error'
        );
        //Temporary workaround - prevent user from using undo when duplicate is detected
        vm.undoStack.length = 0;
      } else if (vm.gridApi.rowEdit.getDirtyRows().length > 0) {
        Dialog.confirm('Would you like to save your changes?').then(function() {
          //TODO - trying duplicate check inside of save
          //var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
          //angular.forEach(dirtyRows, function(dirtyRow){
          //    $log.debug(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, dirtyRow, ["carrier"]));
          //})
          vm.gridApi.rowEdit.flushDirtyRows();

          $log.debug('vm.save called');
          //$log.debug(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, vm.selectedRow, JSON.parse(vm.lookupType.newolumns)));
        });
      }
    }

    function search() {
      vm.showResults = false;
      getLookupSearchResult();
    }

    function changeLookupType(lookupTypeOldValue) {
      // reset table filter field
      vm.lookupFilter = '';

      //If dirty rows found, then prompt the user to stay on current view or continue
      //if(vm.gridApi.rowEdit.getDirtyRows().length > 0) {
      if (!!vm.undoStack && vm.undoStack.length > 0) {
        //event.preventDefault();
        $modal
          .open({
            templateUrl:
              'app/admin-app/lookupadmin/views/lookupAdminConfirmationModal.html',
            scope: $scope,
            size: 'lg'
          })
          .result.then(function() {
            if (vm.continueNextState) {
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
              vm.showResults = false;
              //This is a redundant code. Need to figure if I can merge
              //this code and the code in else loop when there are no dirty rows

              //                        var gridRows = vm.gridApi.rowEdit.getDirtyRows();
              //                        var dataRows = gridRows.map( function( gridRow ) { return gridRow.entity; });
              //                        vm.gridApi.rowEdit.setRowsClean( dataRows );
              //                        UiGridCommands.resetCallbacks();
              //                        updateUndoStack();
              //                        vm.isEmptyTable = false;
              //                        MessagesService.clearMessages();
              //                        vm.changeLookupTypePromise = AdminJsonService.getLookupType(vm.lookupType).then(function (data) {
              //
              //                            vm.data = UiGridUtilService.extractTableCellValues(data);
              //
              //                            var colDefs = UiGridUtilService.extractColumnDefs(data);
              //
              //                            // sort the data on the first visible column in asc order
              //                            vm.gridOptions.data = $filter('orderBy')(vm.data, UiGridUtilService.getFirstVisibleColumnId(colDefs), false);
              //                            //vm.gridOptions.data = vm.data;
              //
              //                            colDefs = UiGridUtilService.autoColWidth(colDefs, data.rowMetadata, vm.lookupType.columnWidths);
              //                            vm.gridOptions.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(colDefs);
              //                            vm.gridOptions.columnDefs = colDefs;
              //                            vm.gridOptions.exporterCsvFilename = vm.lookupType.value + '.csv';
              //                            vm.gridDataCopy = angular.copy(vm.gridOptions.data);
              //                            vm.selectedRow = false;
              //                            vm.newRow = false;
              //                        }, function (data){
              //                            vm.isEmptyTable = true;
              //                        });
            } else {
              //set the Rule Category dropdown to old value as the user selected 'NO'
              for (var i = 0; i < vm.lookupTypeConfig.length; i++) {
                if (vm.lookupTypeConfig[i].title === lookupTypeOldValue) {
                  vm.lookupType = vm.lookupTypeConfig[i];
                  break;
                }
              }
            }
          });
      } else {
        vm.showResults = false;
        vm.isEmptyTable = false;
        MessagesService.clearMessages();
        UiGridUtilService.resetNextIdValue();
      }
    }

    /**
     * Add or Edit an item
     * @param {Object} item Optional item if this is an edit operation
     */
    function addItem(item) {
      var newIdVal = UiGridUtilService.getNextIdValue();

      var newRow = {};
      var cols = vm.gridOptions.columnDefs;
      angular.forEach(cols, function(column) {
        newRow[column.id] = '';
      });

      newRow.id = newIdVal;

      //            if (!!vm.ruleCategory.autopopulatedFields && vm.ruleCategory.autopopulatedFields.length > 0) {
      //                angular.forEach(vm.ruleCategory.autopopulatedFields, function(prop) {
      //                    _.merge(newRow, prop);
      //                });
      //            }

      if (vm.selectedRow) {
        var selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
        UiGridCommands.execute('RowAdd', vm.gridContext, {
          index: selectedIndex + 1,
          data: newRow
        });
      } else {
        var lastIndex = vm.gridOptions.data.length;
        UiGridCommands.execute('RowAdd', vm.gridContext, {
          index: lastIndex,
          data: newRow
        });
      }
      checkTransitionData();
    }

    function insertCopyAtLocation() {
      var selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
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
        },
        1,
        1
      );

      checkTransitionData();
    }

    function discardItem() {
      //Remove an item that is a new row and not saved

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

      //Clear undo stack
      vm.undoStack.length = 0;
      checkTransitionData();
    }

    function exportFile() {
      vm.gridApi.exporter.csvExport(
        vm.uiGridExporterConstants.ALL,
        vm.uiGridExporterConstants.ALL
      );
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
