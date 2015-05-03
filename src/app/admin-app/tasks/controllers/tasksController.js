angular.module('admin.app').controller('TasksController', 
                                       ['$scope', '$http', '$log', '$filter', '$templateCache', 'uiGridExporterConstants', 'taskTypes', 'AdminJsonService', 'UiGridUtilService', 'MessagesService','Dialog',
                                       function ($scope, $http, $log, $filter, $templateCache, uiGridExporterConstants, taskTypes, AdminJsonService, UiGridUtilService, MessagesService, Dialog) {
	'use strict';
        //UiGridUtilService.loadTemplate('ui-grid/selectionRowHeader');
        //UiGridUtilService.loadTemplate('ui-grid/selectionRowHeaderButtonsCanopi');
        // Revert templateCache
        $templateCache.put('ui-grid/selectionRowHeader',
            "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
          );
  
        // Revert to default setting
        $templateCache.put('ui-grid/uiGridHeaderCell',
             "<div ng-class=\"{ 'sortable': sortable }\"><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><span>{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span></div><div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\"><i class=\"ui-grid-icon-angle-down\">&nbsp;</i></div><div ng-if=\"filterable\" class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\"><div ng-if=\"colFilter.type !== 'select'\"><input type=\"text\" class=\"ui-grid-filter-input\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\"><div class=\"ui-grid-filter-button\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"></select><div class=\"ui-grid-filter-button-select\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div></div></div>"
         );
  
  
        var vm = this;
        
        init();
        
        function init() {
            
  	    initializeVMVariables();
 	    setupVMMethods();
            
        };
        
        function  initializeVMVariables() {

            // sort the lookup type values in ascending order
            vm.taskTypes = $filter('orderBy')(taskTypes, 'name');
            vm.taskType = '';
            
            vm.displayTaskResults = false;
            vm.displaySubtaskResults = false;

            vm.searchAccordionOpen = true;
        
            vm.gridOptions = {};
            vm.gridOptionsSubTasks={};
            
            vm.uiGridExporterConstants = uiGridExporterConstants;
            
            vm.taskCodeAndNameLookupTable = {
                enableRowSelection: true,
                multiSelect: false,
                enableSorting: false,
                rowHeight: 45,
                enableGridMenu: true,
                onRegisterApi: function (gridApi) {
                    vm.gridApiAddTaskCodeAndName = gridApi;
                    // Register Events
                    gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedAddTaskCodeAndName);
                }
            };
            
            vm.gridOptions = UiGridUtilService.createGrid({
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
                    gridApi.edit.on.afterCellEdit($scope, afterCellEdit); 
                    gridApi.selection.on.rowSelectionChanged($scope,rowSelectionChanged);
                },
                gridMenuCustomItems: [
                    {
                      title: 'Hide Empty Columns',
                      action: function () {
                        vm.toggleEmptyColumns(); 
                      }
                    },
                    {
                      title: 'Reset Columns',
                      action: function () {
                        vm.taskSearch(); 
                      },
                      order:210
                    }
                ]                
            });
            
            //Previous
//            vm.gridOptions = { 
//                rowEditWaitInterval: -1, //disable autosave
//                enableCellEditOnFocus:true,
//                enableRowSelection: true,
//                enableColumnMenus:false,
//                enableGridMenu:true,
//                //enableRowHeaderSelection: false,
//                rowHeight: 45,
//                //enableHorizontalScrollbar: 0,
//                multiSelect: false,
//                exporterMenuPdf: false,
//                exporterMenuCsv: false,
//                gridMenuCustomItems: [
//                    {
//                      title: 'Hide Empty Columns',
//                      action: function () {
//                        vm.toggleEmptyColumns(); 
//                      }
//                    },
//                    {
//                      title: 'Reset Columns',
//                      action: function () {
//                        vm.taskSearch(); 
//                      },
//                      order:210
//                    }
//                ],
//                onRegisterApi: function (gridApi) {
//                    vm.gridApi = gridApi;
//                    gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
//                    gridApi.edit.on.afterCellEdit($scope, afterCellEdit); 
//                    gridApi.selection.on.rowSelectionChanged($scope,rowSelectionChanged);
//                }
//            };  
            
            function beginCellEdit(rowEntity) {
                vm.gridApi.selection.clearSelectedRows();
                vm.gridApi.selection.selectRow(rowEntity);
                
                // Save row for undo
                vm.undoRow = angular.copy(rowEntity);                
                vm.isEditing = true;
            }
            
            function afterCellEdit(rowEntity) {
                vm.isEditing = false;
            }
            
            vm.gridOptionsSubTasks = UiGridUtilService.createGrid({
                onRegisterApi: function (gridApi) {
                    vm.gridApiSubTasks = gridApi;
                    gridApi.edit.on.beginCellEdit($scope, beginCellEditSubTasks);
                    gridApi.selection.on.rowSelectionChanged($scope,rowSelectionChangedSubTask);
                },
                gridMenuCustomItems: [
                    {
                      title: 'Hide Empty Columns',
                      action: function () {
                        vm.toggleEmptyColumns(); 
                      }
                    },
                    {
                      title: 'Reset Columns',
                      action: function () {
                        vm.taskSearch(); 
                      },
                      order:210
                    }
                ]
            });
//            vm.gridOptionsSubTasks = {
//                rowEditWaitInterval: -1, //disable autosave
//                enableRowSelection: true,
//                enableCellEditOnFocus:true,
//                enableColumnMenus:false,
//                enableGridMenu:true,
//                //enableRowSelection: true,
//                //enableRowHeaderSelection: false,
//                enableHorizontalScrollbar: 0,
//                multiSelect: false,
//                rowHeight: 45,
//                //showGridFooter:true,
//                //enableFooterTotalSelected:true,
//                enableSorting:false,
//                exporterMenuPdf: false,
//                exporterMenuCsv: false,
//                gridMenuCustomItems: [
//                    {
//                      title: 'Hide Empty Columns',
//                      action: function () {
//                        vm.toggleEmptyColumns(); 
//                      }
//                    },
//                    {
//                      title: 'Reset Columns',
//                      action: function () {
//                        vm.taskSearch(); 
//                      },
//                      order:210
//                    }
//                ],
//                onRegisterApi: function (gridApi) {
//                    vm.gridApiSubTasks = gridApi;
//                    gridApi.edit.on.beginCellEdit($scope, beginCellEditSubTasks);
//                    gridApi.selection.on.rowSelectionChanged($scope,rowSelectionChangedSubTask);
//                }
//    
//             }; 
            function beginCellEditSubTasks(rowEntity) {
                vm.gridApiSubTasks.selection.clearSelectedRows();
                vm.gridApiSubTasks.selection.selectRow(rowEntity);
                
                // Save row for undo
                vm.undoRowSubTask = angular.copy(rowEntity);
                vm.isEditingSubTasks = true;
            }
        };
        
        function setupVMMethods() {
                                    
            vm.taskSearch = function () {
                MessagesService.clearMessages();
                var isFormValidated = false;
                
                isFormValidated = ((_.isEmpty(vm.taskCode) && _.isEmpty(vm.taskName) && _.isEmpty(vm.taskType)) ? false : true);
                
//                if(!isFormValidated) {
////                    MessagesService.addMessage('Please fill out at least one search criteria to continue_1', "error");
////                    MessagesService.addMessage('Please fill out at least one search criteria to continue_2', "error");
////                    MessagesService.addMessage('Please fill out at least one search criteria to continue_3', "error");
//                    MessagesService.addMessage('Please fill out at least one search criteria to continue', "warning");
//                    angular.element('.admin-app-container').css('margin-top', '150px');
//                    console.log("height should change");
//                } else {
                    // reset to false before making restful call to get search results
                    vm.displayTaskResults = false;
                    vm.displaySubtaskResults = false;

                    AdminJsonService.getTasks().then(function(data) {

                        vm.displayTaskResults = true;

                        vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
                        vm.gridOptions.data = vm.data;
                        vm.gridDataCopy = angular.copy(vm.gridOptions.data);
                        var colDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                        colDefs = UiGridUtilService.autoColWidth(colDefs, data.tableRows.rowMetaData);

                        vm.gridOptions.columnDefs = colDefs;
                        vm.gridOptions.exporterCsvFilename = vm.taskType.name + 'tasks.csv';

                    });
//                }
               
            };
            
            
            vm.taskCodeAndNameLookup = function() {
                AdminJsonService.getTaskCodeNameList().then(function (data) {
                    
                    $log.debug(angular.toJson(data));
                });

            };
            
            vm.changeTaskType = function(){
                AdminJsonService.getTaskType(vm.taskType.value).then(function (data) {
                    //vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
                    //vm.gridOptions.data = vm.data;
                    //vm.gridOptions.columnDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                    vm.gridOptions.exporterCsvFilename = vm.taskType.value + 'tasks.csv';
                });
            };

            /**
              * Workaround to filter on all columns
              * @todo Remove this when ui-grid provides it natively
              */
            vm.refreshData = function (filter) {
                 vm.gridOptions.data = vm.data;
                 while (filter) {
                     var oSearchArray = filter.split(' ');
                     vm.gridOptions.data = $filter('filter')(vm.gridOptions.data, oSearchArray[0], undefined);
                     oSearchArray.shift();
                     filter = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
                 }
            };
            
            vm.selectedTaskCodeAndName = function () {
                var selectedRow = vm.gridApiAddTaskCodeAndName.selection.getSelectedRows()[0];
                $("#taskCodeNameModal").modal('hide');
                vm.taskCode = selectedRow.taskCode;
                vm.taskName = selectedRow.taskName; 
            };
            
            vm.taskCodeAndNameLookup = function() {
              
                AdminJsonService.getTaskCodeNameList().then(function (data) {

                    var tableData = data.tableRows;

                    vm.taskCodeAndNameLookupTable.data = UiGridUtilService.extractTableCellValues(tableData);
                    var colDefs = UiGridUtilService.extractColumnDefs(tableData);
                    colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);
                    vm.taskCodeAndNameLookupTable.columnDefs = colDefs;
                    $log.debug(angular.toJson(data));
                    
                });
                
            };
             
            vm.taskResult = {
                addItem: function() {
                    if(vm.selectedRow){                    
                        vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                        vm.gridOptions.data.splice(vm.selectedIndex+1, 0, {});
                        vm.gridApi.core.refreshRows().then(function () {
                            vm.selectedIndex = vm.selectedIndex+1;
                            vm.gridApi.core.scrollTo(vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
                            //Alternate to scrollTo - same behavior for now
                            //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);                        
                            vm.gridApi.selection.selectRow(vm.gridOptions.data[vm.selectedIndex]); 
                        });
                    }            
                    else{
                        var newItem = {};
                        vm.gridOptions.data.push(newItem);
                        vm.gridApi.core.refreshRows().then(function () {
                            var lastRowIndex = vm.gridOptions.data.length-1;
                            vm.gridApi.core.scrollTo(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                            //Alternate to scrollTo - same behavior for now
                            //vm.gridApi.cellNav.scrollToFocus(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                            vm.gridApi.selection.selectRow(vm.gridOptions.data[lastRowIndex]); 
                        });
                    }
                },
                
               
               saveTasks: function() {
                    Dialog.confirm("Would you like to save your changes?").then(function () {
                        vm.gridApi.rowEdit.flushDirtyRows();
                    });
               },
               
               undo:function(){                   
                    vm.gridOptions.data[vm.selectedIndex] = vm.gridDataCopy[vm.selectedIndex];                
               },
               
               export: function() {
                   vm.gridApi.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
               },
               
               insertCopyAtLocation:function(){
                    vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                    vm.newRowIndex = vm.selectedIndex + 1;
                    var dataCopy = angular.copy(vm.gridOptions.data);
                    dataCopy.splice(vm.newRowIndex, 0, {});
                    dataCopy[vm.newRowIndex] = vm.gridOptions.data[vm.selectedIndex];
                    vm.gridOptions.data = dataCopy;
               }
            }
             
             vm.subTask={
                addItem: function() {
                    if(vm.selectedRowSubTask){                    
                        vm.selectedIndex = vm.gridOptionsSubTasks.data.lastIndexOf(vm.selectedRowSubTask);
                        vm.gridOptionsSubTasks.data.splice(vm.selectedIndex+1, 0, {});
                        vm.gridApiSubTasks.core.refreshRows().then(function () {
                            vm.selectedIndex = vm.selectedIndex+1;
                            vm.gridApiSubTasks.core.scrollTo(vm.gridOptionsSubTasks.data[vm.selectedIndex], vm.gridOptionsSubTasks.columnDefs[0]);
                            //Alternate to scrollTo - same behavior for now
                            //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);                        
                            vm.gridApiSubTasks.selection.selectRow(vm.gridOptionsSubTasks.data[vm.selectedIndex]); 
                        });
                    }            
                    else{
                        var newItem = {};
                        vm.gridOptionsSubTasks.data.push(newItem);
                        vm.gridApiSubTasks.core.refreshRows().then(function () {
                            var lastRowIndex = vm.gridOptionsSubTasks.data.length-1;
                            vm.gridApiSubTasks.core.scrollTo(vm.gridOptionsSubTasks.data[lastRowIndex], vm.gridOptionsSubTasks.columnDefs[0]);
                            //Alternate to scrollTo - same behavior for now
                            //vm.gridApi.cellNav.scrollToFocus(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                            vm.gridApiSubTasks.selection.selectRow(vm.gridOptionsSubTasks.data[lastRowIndex]); 
                        });
                        
                    }
                },
                
                saveTasks: function() {
                    Dialog.confirm("Would you like to save your changes?").then(function () {
                        vm.gridApiSubTasks.rowEdit.flushDirtyRows();
                    });
                },
                
                undo:function(){
                    vm.gridOptionsSubTasks.data[vm.selectedIndexSubTask] = vm.gridDataSubTasksCopy[vm.selectedIndexSubTask];    
                },
                
                export: function() {
                   vm.gridApiSubTasks.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                }
             };
             
        };
        
        function rowSelectionChanged(row) {
            vm.selectedRow = row.isSelected ? row.entity : false;
            vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
            displaySubtasks();
        }
        
        function rowSelectionChangedSubTask(row){
            vm.selectedRowSubTask = row.isSelected ? row.entity : false; 
            vm.selectedIndexSubTask = vm.gridOptionsSubTasks.data.lastIndexOf(vm.selectedRowSubTask);
        }
        
        function rowSelectionChangedAddTaskCodeAndName(row) {
            vm.selectedRowTaskCodeAndName = row.isSelected ? row.entity : false;
        }
        
        function displaySubtasks(){
            
            vm.displaySubtaskResults = true;
            
            AdminJsonService.getSubTasks().then(function(data) {

                vm.displaySubtaskResults = true;

                var myData = UiGridUtilService.extractTableCellValues(data.tableRows);
                vm.gridOptionsSubTasks.data = myData;
                vm.gridDataSubTasksCopy = angular.copy(vm.gridOptionsSubTasks.data);
                var colDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                colDefs = UiGridUtilService.autoColWidth(colDefs, data.tableRows.rowMetaData);

                vm.gridOptionsSubTasks.columnDefs = colDefs;
                vm.gridOptionsSubTasks.exporterCsvFilename = vm.taskType.name + 'subtasks.csv';                

            });
            
        }  
        
        
            
     

}]);
