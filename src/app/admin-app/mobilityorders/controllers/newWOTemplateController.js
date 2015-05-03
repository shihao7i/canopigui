
'use strict';

angular.module('admin.app').controller('NewWOTemplateController',
    ['$scope', '$templateCache', 'uiGridExporterConstants', '$log', '$q', '$interval', 'poPicklist', 'AdminJsonService', 'UiGridUtilService', 'MessagesService', 'Dialog',
        function ($scope, $templateCache, uiGridExporterConstants, $log, $q, $interval, poPicklist, AdminJsonService, UiGridUtilService, MessagesService, Dialog) {

            // Revert templateCache
            $templateCache.put('ui-grid/selectionRowHeader',
                "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
            );

            var vm = this;

            init();


            function init() {

                initializeVMVariables();
                
                // For New WO Template
                setupUiGridForNewWOTemplate();
                           
                // set up the child tables for New WO Tempalte
                setupUiGridForNewTaskList();
                setupUiGridForNewUDA();
                setupUiGridForNewLinks();

                setupUiGridForNewAddTask();
                
                setupVMMethods();
            }


            function initializeVMVariables() {
    
                vm.poPicklist = poPicklist;
                
                vm.woType = '';

                vm.displayNewWOTemplateTableFlag = false;
                vm.displayChildTablesForNewWOTemplateFlag = false;
                
                vm.searchAccordionOpen = true;
           
                vm.isLoading = true;

                vm.uiGridExporterConstants = uiGridExporterConstants;

            }

            function setupUiGridForNewWOTemplate() {
                vm.gridOptionsNewWOTemplateTable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'newWOTemplate.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiNewWOTemplate = gridApi;
                        // Register events
                        gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
                        gridApi.edit.on.afterCellEdit($scope, afterCellEdit);
           
                        gridApi.rowEdit.on.saveRow($scope, saveRow);
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedNewWOTemplate);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
                    }
                    
                });               

                // Handle grid events
                function beginCellEdit(rowEntity) {
                   vm.gridApiNewWOTemplate.selection.clearSelectedRows();
                   vm.gridApiNewWOTemplate.selection.selectRow(rowEntity);

                    // Save row for undo
                    vm.undoRowNewWOTemplate = angular.copy(rowEntity);
                    vm.isEditingNewWOTemplate = true;
                }

                function afterCellEdit(rowEntity) {
                    vm.isEditingNewWOTemplate = false;
                }

                function rowSelectionChangedNewWOTemplate(row) {
                    vm.selectedRowNewWOTemplate = row.isSelected ? row.entity : false;                    
                    vm.selectedIndexNewWOTemplate = vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(vm.selectedRowNewWOTemplate);
                    vm.woType = row.entity.woType;
                    
                    displayChildTablesForNewWOTemplate();
                }
                
                
                function displayChildTablesForNewWOTemplate() {
         
                    // display new tables with empty data
                    vm.displayNewTaskListTable();
                    vm.displayNewUDATable();
                    vm.displayNewLinksTable();

                    // enable the display of the child tables
                    vm.displayChildTablesForNewWOTemplateFlag = true;
                }


                function saveRow(rowEntity) {
                     $log.debug("Saving row");
                }
    
                AdminJsonService.getWoTemplateColumnDefs().then(function (data) {

                    var tableData = data.tableRows;

                    var colDefs = UiGridUtilService.extractColumnDefs(tableData);

                    colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);

                    vm.gridOptionsNewWOTemplateTable.columnDefs = colDefs;

                    vm.gridOptionsNewWOTemplateTable.data = UiGridUtilService.extractTableCellValues(tableData);
                    vm.gridDataNewWOTemplateCopy = angular.copy(vm.gridOptionsNewWOTemplateTable.data);
                    vm.gridOptionsNewWOTemplateTable.exporterCsvFilename = 'newWOTemplate.csv';

                    vm.displayNewWOTemplateTableFlag = true;

                    setTimeout(function () {
                        $(window).trigger('resize');
                    }, 0);  //500);

                });


                // TODO: define all the functions needed for New WO Template add/update operations
                vm.newWOTemplate = {

                    saveNewWOTemplate: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiNewWOTemplate.rowEdit.flushDirtyRows();
                        });
                    },

                    updateNewWOTemplate: function () {

                    },

                    undo: function () {
                        vm.gridOptionsNewWOTemplateTable.data[vm.selectedIndexNewWOTemplate] = vm.gridDataNewWOTemplateCopy[vm.selectedIndexNewWOTemplate];    
                    },
                  
        
                    addNewWOTemplate: function () {
                                            
                        if (vm.selectedRowNewWOTemplate) {
                            vm.selectedIndex = vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(vm.selectedRowNewWOTemplate);
                            vm.gridOptionsNewWOTemplateTable.data.splice(vm.selectedIndex + 1, 0, {});
                            vm.gridApiNewWOTemplate.core.refreshRows().then(function () {
                                vm.selectedIndex = vm.selectedIndex+1;
                                vm.gridApiNewWOTemplate.core.scrollTo(vm.gridOptionsNewWOTemplateTable.data[vm.selectedIndex], vm.gridOptionsNewWOTemplateTable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);                        
                                vm.gridApiNewWOTemplate.selection.selectRow(vm.gridOptionsNewWOTemplateTable.data[vm.selectedIndex]); 
                            }); 
                        }
                        else {
                            vm.gridOptionsNewWOTemplateTable.data.push({"woType": "", "woDescription": ""});
                            vm.gridApiNewWOTemplate.core.refreshRows().then(function () {
                                var lastRowIndex = vm.gridOptionsNewWOTemplateTable.data.length-1;
                                vm.gridApiNewWOTemplate.core.scrollTo(vm.gridOptionsNewWOTemplateTable.data[lastRowIndex], vm.gridOptionsNewWOTemplateTable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApi.cellNav.scrollToFocus(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                                vm.gridApiNewWOTemplate.selection.selectRow(vm.gridOptionsNewWOTemplateTable.data[lastRowIndex]); 
                            });
                        }
                    },
                    
                    removeNewWOTemplate: function () {
                       vm.gridOptionsNewWOTemplateTable.data.splice(vm.gridOptionsNewWOTemplateTable.data.lastIndexOf(vm.selectedRowNewWOTemplate), 1);
                    },
                    
                    export:function(){
                        vm.gridApiNewWOTemplateexporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    }
                  
                };
            }

            function setupUiGridForNewTaskList() {
                vm.gridOptionsNewTaskListTable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'newTaskList.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiNewTaskList = gridApi;
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditNewTaskList);
                        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef){
                                if (colDef.id === 'taskParallelToPrevious') {
                                    vm.newTasklist.recalcTaskSequence();
                                }
                            
                        });
                        
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedNewTaskList);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
                    }
                });
                                
                function beginCellEditNewTaskList(rowEntity){
                    vm.gridApiNewTaskList.selection.clearSelectedRows();
                    vm.gridApiNewTaskList.selection.selectRow(rowEntity);

                    // Save row for undo
                    vm.undoRowNewTaskList = angular.copy(rowEntity);                
                    vm.isEditingNewTaskList = true;
                }
                
                function rowSelectionChangedNewTaskList(row) {
                    vm.selectedRowNewTaskList = row.entity;                    
                    vm.selectedNewIndex = vm.gridOptionsNewTaskListTable.data.lastIndexOf(vm.selectedRowNewTaskList);
                    vm.previousNewIndex = vm.selectedNewIndex - 1;
                    vm.nextNewIndex = vm.selectedNewIndex + 1;
                    //These checks happen once per selected row
                    //Is the selected row already the last Element? Then disable the down button
                    //Is the selected row the first element in the list? Then disable the up button
                    if (vm.nextNewIndex === (vm.gridOptionsNewTaskListTable.data.length)) {
                        vm.lastNewElement = true;
                        vm.firstNewElement = false;
                    }
                    else {
                        vm.lastNewElement = false;
                    }

                    if (vm.previousNewIndex < 0) {
                        vm.firstNewElement = true;
                        vm.lastNewElement = false;
                    }
                    else {
                        vm.firstNewElement = false;
                    }

                };
                
                
                vm.displayNewTaskListTable = function() {
    
                    AdminJsonService.getTaskListColumnDefs().then(function (data) {
      
                        var tableData = data.tableRows;

                        vm.gridOptionsNewTaskListTable.data = UiGridUtilService.extractTableCellValues(tableData);
                 
                        vm.gridDataNewTaskListCopy = angular.copy(vm.gridOptionsNewTaskListTable.data);
                        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

                        colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);

                        vm.gridOptionsNewTaskListTable.columnDefs = colDefs;
     
                        vm.gridOptionsNewTaskListTable.exporterCsvFilename = 'newTaskList.csv';       
                        
                        setTimeout(function () {
                            $(window).trigger('resize');
                        }, 0);  //500);

                    });
                }
                
                
                vm.newTasklist = {

                    moveSelectedUp: function () {

                        vm.selectedNewIndex = vm.gridOptionsNewTaskListTable.data.lastIndexOf(vm.selectedRowNewTaskList);
                        if (vm.previousNewIndex > -1) {

                            vm.previousNewIndex = vm.selectedNewIndex - 1;
                            vm.nextNewIndex = vm.selectedNewIndex + 1;

                            vm.previousNewRowData = vm.gridOptionsNewTaskListTable.data[vm.previousNewIndex];

                            vm.nextNewRowData = vm.gridOptionsNewTaskListTable.data[vm.nextNewIndex];

                            vm.gridOptionsNewTaskListTable.data[vm.previousNewIndex] = vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex];
                            vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex] = vm.previousNewRowData;
                            vm.selectedNewIndex = vm.selectedNewIndex - 1;

                            vm.checkNewStart();
                            vm.checkNewEnd();
                        }

                        else {

                        }
                        //vm.gridApiNewTaskList.cellNav.scrollToFocus(vm.selectedRow);
                        vm.newTasklist.recalcTaskSequence();
                        vm.gridApiNewTaskList.core.refreshRows().then(function () {
                            vm.gridApiNewTaskList.selection.selectRow(vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex]); 
                        });
                    },

                    moveSelectedDown: function () {

                        vm.selectedNewIndex = vm.gridOptionsNewTaskListTable.data.lastIndexOf(vm.selectedRowNewTaskList);

                        if (vm.nextNewIndex !== vm.gridOptionsNewTaskListTable.data.length) {

                            vm.previousNewIndex = vm.selectedNewIndex - 1;
                            vm.nextNewIndex = vm.selectedNewIndex + 1;

                            vm.previousNewRowData = vm.gridOptionsNewTaskListTable.data[vm.previousNewIndex];

                            vm.nextNewRowData = vm.gridOptionsNewTaskListTable.data[vm.nextNewIndex];

                            vm.gridOptionsNewTaskListTable.data[vm.nextNewIndex] = vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex];
                            vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex] = vm.nextNewRowData;
                            vm.selectedNewIndex = vm.selectedNewIndex + 1;

                            vm.checkNewEnd();
                            vm.checkNewStart();
                        }
                        else {
                            //vm.nextIndex = vm.selectedIndex+1;
                        }
                        //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRow);
                        vm.newTasklist.recalcTaskSequence();
                        vm.gridApiNewTaskList.core.refreshRows().then(function () {
                            vm.gridApiNewTaskList.selection.selectRow(vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex]); 
                        });
                    },

                    addTask: function () {
                        MessagesService.clearMessages();
                        
                        AdminJsonService.getTasks(vm.woType).then(function (data) {

                            var tableData = data.tableRows;

                            vm.gridOptionsNewAddTaskSelectTable.data = UiGridUtilService.extractTableCellValues(tableData);
                            var colDefs = UiGridUtilService.extractColumnDefs(tableData);
                            colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);
                            vm.gridOptionsNewAddTaskSelectTable.columnDefs = colDefs;

                        });
                        vm.newTasklist.recalcTaskSequence();
                    },

                    removeTask: function () {

                        // Remove an item
                        vm.gridOptionsNewTaskListTable.data.splice(vm.gridOptionsNewTaskListTable.data.lastIndexOf(vm.selectedRowNewTaskList), 1);
                        vm.newTasklist.recalcTaskSequence();

                    },

                    saveTasks: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiNewTaskList.rowEdit.flushDirtyRows();
                        });
                    },

                    undo: function () {
                        vm.gridOptionsNewTaskListTable.data[vm.selectedNewIndex] = vm.gridDataNewTaskListCopy[vm.selectedNewIndex];
                    },
                    
                    recalcTaskSequence: function () {
                        
                        // this is a new task list with the re-sequenced tasks
                        var sequencedData = [];
                        var sequenceNumber = 10; // start with 10 (incremented by 10)
                       
                        var rowData;
                        
                        for (var i=0; i < vm.gridOptionsNewTaskListTable.data.length; i++) {
                            rowData = angular.copy(vm.gridOptionsNewTaskListTable.data[i]);
                            if (rowData.taskParallelToPrevious === "YES") {
                                rowData.taskSequence = sequenceNumber.toString();
                            }
                            else {
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
                    },

                    export: function () {
                        vm.gridApiNewTaskList.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    },
                    
                    addToNewTaskList: function() {
                        MessagesService.clearMessages();
                        var rowData;
                        var selectedRow = vm.gridApiAddTask.selection.getSelectedRows()[0];
                        var selectedRowExists = false;
                        if(!(selectedRow.taskCode === 'PLAN')) {
                            for (var i=0; i < vm.gridOptionsNewTaskListTable.data.length; i++) {
                                rowData = angular.copy(vm.gridOptionsNewTaskListTable.data[i]);
                                if (rowData.taskCode === selectedRow.taskCode) {
                                    selectedRowExists = true;
                                }
                            }
                        }
                        if(!selectedRowExists) {
                            var selectedRowData = vm.gridApiAddTask.selection.getSelectedRows()[0];
                            
                            //Assigning additional/default values to the row before adding
                            selectedRowData.taskParallelToPrevious = "NO";
                            
                            //Pusing the selected Row after adidng the additional default values.
                            vm.gridOptionsNewTaskListTable.data.push(selectedRowData);
                            
                            // recalculate task sequence
                            vm.newTasklist.recalcTaskSequence();
                            
                            $("#addTaskModal").modal('hide');
                        } else {
                            MessagesService.addMessage('Task Code ['+ selectedRow.taskCode + '] is already added to list', "warning");
                        }
                    }
                };
                
                vm.checkNewStart = function () {
                    vm.previousNewIndex = vm.selectedNewIndex - 1;
                    if (vm.previousNewIndex < 0) {
                        vm.firstNewElement = true;
                    }
                    else {
                        vm.firstNewElement = false;
                    }
                }

                vm.checkNewEnd = function () {
                    vm.nextNewIndex = vm.selectedNewIndex + 1;
                    if (vm.nextNewIndex === vm.gridOptionsNewTaskListTable.data.length) {
                        vm.lastNewElement = true;
                    }
                    else {
                        vm.lastNewElement = false;
                    }
                };
            }
            
            function setupUiGridForNewUDA() {
                vm.gridOptionsNewUDATable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'newUDA.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiNewUDA = gridApi;
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditNewUDA);
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedNewUDA);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
                    }
                });
                
                function beginCellEditNewUDA(rowEntity) {
                    vm.gridApiNewUDA.selection.clearSelectedRows();
                    vm.gridApiNewUDA.selection.selectRow(rowEntity);

                    // Save row for undo
                    vm.undoRowNewUDA = angular.copy(rowEntity);
                    vm.isEditingNewUDA = true;
                }
                
                function rowSelectionChangedNewUDA(row) {
                    vm.selectedRowNewUDA = row.entity;
                    vm.selectedIndexNewUDA = vm.gridOptionsNewUDATable.data.lastIndexOf(vm.selectedRowNewUDA);
                    
                }
                
                
                vm.displayNewUDATable = function() {
    
                    AdminJsonService.getUDAColumnDefs().then(function (data) {
      
                        var tableData = data.tableRows;

                        vm.gridOptionsNewUDATable.data = UiGridUtilService.extractTableCellValues(tableData);
                        vm.gridDataNewUDACopy = angular.copy(vm.gridOptionsNewUDATable.data);
                        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

                        colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);

                        vm.gridOptionsNewUDATable.columnDefs = colDefs;
     
                        vm.gridOptionsNewUDATable.exporterCsvFilename = 'newUDA.csv';  
                        
                        setTimeout(function () {
                            $(window).trigger('resize');
                        }, 0);  //500);

                    });
                }
                
                
                vm.newUda = {

                    saveUDA: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiNewUDA.rowEdit.flushDirtyRows();
                        });
                    },

                    updatUDA: function () {

                    },

                    undo: function () {
                        vm.gridOptionsNewUDATable.data[vm.selectedIndexNewUDA] = vm.gridDataNewUDACopy[vm.selectedIndexNewUDA]; 
                    },

                    addUDA: function () {
                        if (vm.selectedRowNewUDA) {
                            vm.selectedIndex = vm.gridOptionsNewUDATable.data.lastIndexOf(vm.selectedRowNewUDA);
                            vm.gridOptionsNewUDATable.data.splice(vm.selectedIndex + 1, 0, {});
                            vm.gridApiNewUDA.core.refreshRows().then(function () {
                                vm.selectedIndex = vm.selectedIndex+1;
                                vm.gridApiNewUDA.core.scrollTo(vm.gridOptionsNewUDATable.data[vm.selectedIndex], vm.gridOptionsNewUDATable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiNewUDA.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);                        
                                vm.gridApiNewUDA.selection.selectRow(vm.gridOptionsNewUDATable.data[vm.selectedIndex]); 
                            });
                        }
                        else {
                            vm.gridOptionsNewUDATable.data.push({"name": ""});
                            vm.gridApiNewUDA.core.refreshRows().then(function () {
                                var lastRowIndex = vm.gridOptionsNewUDATable.data.length-1;
                                vm.gridApiNewUDA.core.scrollTo(vm.gridOptionsNewUDATable.data[lastRowIndex], vm.gridOptionsNewUDATable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiNewUDA.cellNav.scrollToFocus(vm.gridOptionsNewUDATable.data[lastRowIndex], vm.gridOptionsNewUDATable.columnDefs[0]);
                                vm.gridApiNewUDA.selection.selectRow(vm.gridOptionsNewUDATable.data[lastRowIndex]); 
                            });
                        }
                    },
                    export:function(){
                        vm.gridApiNewUDA.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    }
                  
                };
            }
            
            function setupUiGridForNewLinks() {
                vm.gridOptionsNewLinksTable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'newLinks.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiNewLinks = gridApi;
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditNewLinks);
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedNewLinks);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
                    }
                });                
                
                function beginCellEditNewLinks(rowEntity) {
                    vm.gridApiNewLinks.selection.clearSelectedRows();
                    vm.gridApiNewLinks.selection.selectRow(rowEntity);

                    // Save row for undo
                    vm.undoRowNewLinks = angular.copy(rowEntity);
                    vm.isEditingNewLinks = true;
                }
                
                
                function rowSelectionChangedNewLinks(row) {
                    vm.selectedRowNewLinks = row.entity;
                    vm.selectedIndexNewLinks = vm.gridOptionsNewLinksTable.data.lastIndexOf(vm.selectedRowNewLinks);
                }
                
                
                vm.displayNewLinksTable = function() {
    
                    AdminJsonService.getLinksColumnDefs().then(function (data) {
      
                        var tableData = data.tableRows;

                        vm.gridOptionsNewLinksTable.data = UiGridUtilService.extractTableCellValues(tableData);
                        vm.gridDataNewLinksCopy = angular.copy(vm.gridOptionsNewLinksTable.data);
                        var colDefs = UiGridUtilService.extractColumnDefs(tableData);

                        colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);

                        vm.gridOptionsNewLinksTable.columnDefs = colDefs;
     
                        vm.gridOptionsNewLinksTable.exporterCsvFilename = 'newLinks.csv';      
                        
                        setTimeout(function () {
                            $(window).trigger('resize');
                        }, 0);  //500);

                    });
                }
                
                vm.newLinks = {

                    saveLink: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiNewLinks.rowEdit.flushDirtyRows();
                        });
                    },

                    updateLink: function () {

                    },

                    undo: function () {
                        vm.gridOptionsNewLinksTable.data[vm.selectedIndexNewLinks] = vm.gridDataNewLinksCopy[vm.selectedIndexNewLinks];
                    },

                    addLink: function () {
                        if (vm.selectedRowLinks) {
                            vm.selectedIndex = vm.gridOptionsNewLinksTable.data.lastIndexOf(vm.selectedRowNewLinks);
                            vm.gridOptionsNewLinksTable.data.splice(vm.selectedIndex + 1, 0, {});
//                            vm.gridApiNewLinks.core.refreshRows().then(function () {
//                                vm.selectedIndex = vm.selectedIndex+1;
//                                vm.gridApiNewLinks.core.scrollTo(vm.gridOptionsNewLinksTable.data[vm.selectedIndex], vm.gridOptionsNewLinksTable.columnDefs[0]);
//                                //Alternate to scrollTo - same behavior for now
//                                //vm.gridApiNewLinks.cellNav.scrollToFocus( vm.gridOptionsNewLinksTable.data[vm.selectedIndex], vm.gridOptionsNewLinksTable.columnDefs[0]);                        
//                                vm.gridApiNewLinks.selection.selectRow(vm.gridOptionsNewLinksTable.data[vm.selectedIndex]); 
//                            }); 
                        }
                        else {
                            vm.gridOptionsNewLinksTable.data.push({"name": "", "url": ""});
//                            vm.gridApiNewLinks.core.refreshRows().then(function () {
//                                var lastRowIndex = vm.gridOptionsNewLinksTable.data.length-1;
//                                vm.gridApiNewLinks.core.scrollTo(vm.gridOptionsNewLinksTable.data[lastRowIndex], vm.gridOptionsNewLinksTable.columnDefs[0]);
//                                //Alternate to scrollTo - same behavior for now
//                                //vm.gridApiNewLinks.cellNav.scrollToFocus(vm.gridOptionsNewLinksTable.data[lastRowIndex], vm.gridOptionsNewLinksTable.columnDefs[0]);
//                                vm.gridApiNewLinks.selection.selectRow(vm.gridOptionsNewLinksTable.data[lastRowIndex]); 
//                            });
                        }
                    },
                    
                    removeLink: function () {
                        vm.gridOptionsNewLinksTable.data.splice(vm.gridOptionsNewLinksTable.data.lastIndexOf(vm.selectedRowNewLinks), 1);
                    },
                    
                    export:function(){
                        vm.gridApiNewLinks.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    }
                  
                };
            }
                

            function setupUiGridForNewAddTask() {

                vm.gridOptionsNewAddTaskSelectTable = {
                    enableRowSelection: true,
                    multiSelect: false,
                    enableSorting: false,
                    rowHeight: 45,
                    enableColumnMenus:false,
                    enableGridMenu: true,
                    onRegisterApi: function (gridApi) {
                        vm.gridApiAddTask = gridApi;
                        // Register Events
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedAddTask);
                    }
                };


                function rowSelectionChangedAddTask(row) {
                    vm.selectedRow = row.isSelected ? row.entity : false;

                }

            }


            function setupVMMethods() {

              
            };

        }]);


