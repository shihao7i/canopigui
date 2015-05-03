'use strict';

angular.module('admin.app').controller('MobilityOrdersController',
    ['$scope', '$templateCache', 'uiGridExporterConstants', '$log', '$q', '$interval', 'orderPicklists', 'AdminJsonService', 'UiGridUtilService', 'MessagesService', 'Dialog',
        function ($scope, $templateCache, uiGridExporterConstants, $log, $q, $interval, orderPicklists, AdminJsonService, UiGridUtilService, MessagesService, Dialog) {

            // Revert templateCache
            $templateCache.put('ui-grid/selectionRowHeader',
                "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
            );

            var vm = this;

            init();


            function init() {

                initializeVMVariables();

                // For Order Search
                setupUiGridForSearchResults();
                setupUiGridForSelectedWO();
                setupUiGridForTaskList();
                setupUiGridForAddTask();
                setupUiGridForUDA();
                setupUiGridForLinks();

                setupVMMethods();
            }


            function initializeVMVariables() {

                vm.poTypeCurrentSelection = [];
                vm.woTypeCurrentSelection = [];
                
                vm.poTypeMultiselectPickList = orderPicklists.poTypes;
                vm.woTypeMultiselectPickList = orderPicklists.woTypes;
                
                vm.displaySearchResultsTableFlag = false;
                vm.displayOrderDetailsFlag = false;

                // this object will be populated in
                // orderPicklists => { poTypes, woTypes }
                vm.searchButtonDisabled = true;
                vm.clearButtonDisabled = true;

                vm.searchAccordionOpen = true;
                vm.searchResultsOpen = true;
                vm.orderPicklists = orderPicklists;
                vm.poType = orderPicklists.poTypes;
                vm.woType = orderPicklists.woTypes;

                //TOP TABLE 1
                vm.gridOptionsSearchResults = {};

                //Selected WO
                vm.gridOptionsSelectedWO = {};

                //MIDDLE TABLE 2
                vm.gridOptionsTaskListTable = {};
                //BOTTOM TABLE 3
                vm.gridOptionsUDATable = {};

                vm.isLoading = true;

                vm.testit = function () {
                    $log.debug("Test it ...");
                }

                vm.uiGridExporterConstants = uiGridExporterConstants;

            }

            
            function setupUiGridForSearchResults() {
                
                vm.gridOptionsSearchResults = {
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    enableHorizontalScrollbar: 0,
                    enableColumnMenus:false,
                    multiSelect: false,
                    rowHeight: 45,
                    onRegisterApi: function (gridApi) {
                        vm.gridApiSearchResults = gridApi;
                        // Register Events
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedSearchResults);
                    }
                };

                // Handle grid events for Top Table
                function rowSelectionChangedSearchResults(row) {
                    vm.selectedRow = row.isSelected ? row.entity : false;

                    vm.buildColumnDefsAndDataForSelectedWO(row)

                    displayOrderDetail(vm.selectedRow.woType);
                }

                function displayOrderDetail(woType) {
                    
                    vm.searchAccordionOpen = false;
                    vm.searchResultsOpen = false;
                    
                    AdminJsonService.getWODetails(woType).then(function (woDetails) {
                        
                        if (woDetails) {
                            if (woDetails.tasklist) {
                                populateDataForTaskListTable(woType, woDetails.tasklist);
                            }   

                            if (woDetails.uda) {
                                populateDataForUDATable(woType, woDetails.uda);
                            }   

                            if (woDetails.links) {
                                populateDataForLinksTable(woType, woDetails.links);
                            }   
                        }
                    });
                }      
                
                
                function populateDataForTaskListTable(woType, tableData) {
                    
                    // Load a special header template that has href links
                    UiGridUtilService.loadTemplate('ui-grid/uiGridHeaderCellSpecial');

                    vm.displayOrderDetailsFlag = true;

                    vm.gridOptionsTaskListTable.data = UiGridUtilService.extractTableCellValues(tableData);
                    vm.gridDataTaskListCopy = angular.copy(vm.gridOptionsTaskListTable.data);
                    var colDefs = UiGridUtilService.extractColumnDefs(tableData, {headerCellTemplate: 'ui-grid/uiGridHeaderCellSpecial', woType: woType});

                    colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);

                    vm.gridOptionsTaskListTable.columnDefs = colDefs;                    

                    vm.selectedWoType = vm.gridOptionsSelectedWO.data[0].woType;
                    vm.gridOptionsTaskListTable.exporterCsvFilename = vm.selectedWoType+'tasks.csv';

                }
                

                function populateDataForUDATable(woType, tableData) {
     
                    vm.gridOptionsUDATable.data = UiGridUtilService.extractTableCellValues(tableData);
                    vm.gridDataUDACopy = angular.copy(vm.gridOptionsUDATable.data);
                    var colDefs = UiGridUtilService.extractColumnDefs(tableData);
                    colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);
                    vm.gridOptionsUDATable.columnDefs = colDefs;

                }
   
   
                
                function populateDataForLinksTable(woType, tableData) {
                    
                    vm.gridOptionsLinksTable.data = UiGridUtilService.extractTableCellValues(tableData);
                    vm.gridDataLinksCopy = angular.copy(vm.gridOptionsLinksTable.data);
                    var colDefs = UiGridUtilService.extractColumnDefs(tableData);
                    colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);
                    vm.gridOptionsLinksTable.columnDefs = colDefs;
                    
                }
            }


            function setupUiGridForSelectedWO() {

                vm.gridOptionsSelectedWO = {
                    rowEditWaitInterval: -1, //disable autosave
                    enableCellEditOnFocus: true,
                    enableCellEdit: false,
                    enableRowSelection: true,
                    enableRowHeaderSelection: true,
                    enableHorizontalScrollbar: 0,
                    enableVerticalScrollbar: 0,
                    enableColumnMenus:false,
                    multiSelect: false,
                    rowHeight: 45,
                    onRegisterApi: function (gridApi) {
                        vm.gridApiSelectedWO = gridApi;
                        // Register Events
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditSelectedWO);
                        //gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedWO);
                    }
                };
                
                function beginCellEditSelectedWO(rowEntity) {
                    vm.gridApiSelectedWO.selection.clearSelectedRows();
                    vm.gridApiSelectedWO.selection.selectRow(rowEntity);
                    // Save row for undo
                    vm.undoRowSelectedWO = angular.copy(rowEntity);
                    vm.isEditingSelectedWO = true;
                }

                vm.buildColumnDefsAndDataForSelectedWO = function (row) {
                    // copy the columnDefs from search results table to Selected WO row
                    vm.gridOptionsSelectedWO.columnDefs = angular.copy(vm.gridOptionsSearchResults.columnDefs);
                    vm.gridOptionsSelectedWO.data = [row.entity];                    
                    //NOT NECESSARY since undo is for 1 cell value but added for consistency
                    vm.gridDataSelectedWOCopy = angular.copy(vm.gridOptionsSelectedWO.data);
                    // find WO Description field and set it to editable
                    for (var i = 0; i < vm.gridOptionsSelectedWO.columnDefs.length; i++) {                      
                        if (vm.gridOptionsSelectedWO.columnDefs[i].id === 'woDescription') {
                            vm.gridOptionsSelectedWO.columnDefs[i].enableCellEdit = true;          
                            
                            UiGridUtilService.makeEditable(vm.gridOptionsSelectedWO.columnDefs[i]);
                            vm.gridOptionsSelectedWO.columnDefs[i].cellTemplate = "" +
                            "<div>" +
                            "   <div ng-if='COL_FIELD.length > 10' class='ui-grid-cell-contents' tooltip-placement='left' tooltip-append-to-body='false' tooltip='{{COL_FIELD CUSTOM_FILTERS}}'>{{COL_FIELD CUSTOM_FILTERS}}</div>" +
                            "   <div ng-if='COL_FIELD.length <= 10' class='ui-grid-cell-contents'>{{COL_FIELD CUSTOM_FILTERS}}</div>" +
                            "</div>";
                            break;
                        }
                    }
                }


                // TODO: define all the functions needed for Seltect WO update operations
                vm.wo = {

                    updateWO: function () {

                    },
                    save:function(){
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiSelectedWO.rowEdit.flushDirtyRows();
                        });
                    },
                    undo: function () {
                        vm.gridOptionsSelectedWO.data[0] = vm.gridDataSelectedWOCopy[0];
                    }
                 
                };

            }


            function setupUiGridForTaskList() {
                vm.gridOptionsTaskListTable = UiGridUtilService.createGrid({
                    onRegisterApi: function (gridApi) {
                        vm.gridApiTaskList = gridApi;
                        
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditTaskList);                        
                        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef){
                                if (colDef.id === 'taskParallelToPrevious') {
                                    vm.tasklist.recalcTaskSequence();
                                }
                            
                        });
                        
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedTaskList);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
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
                                displayOrderDetail(vm.selectedRow.woType);
                            },
                            order:210
                        }
                    ]
                });
                
                function beginCellEditTaskList(rowEntity) {
                    vm.gridApiTaskList.selection.clearSelectedRows();
                    vm.gridApiTaskList.selection.selectRow(rowEntity);
                    // Save row for undo
                    vm.undoRowTaskList = angular.copy(rowEntity);
                    vm.isEditingTaskList = true;
                }


                function rowSelectionChangedTaskList(row) {
                    var msg = 'row selected ' + row.isSelected;
                    $log.log(msg);

                    vm.selectedRowTaskList = row.entity;
                    //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRow);
                    

                    vm.selectedIndexTaskList = vm.gridOptionsTaskListTable.data.lastIndexOf(vm.selectedRowTaskList);
                    vm.previousIndex = vm.selectedIndex - 1;
                    vm.nextIndex = vm.selectedIndex + 1;
                    //These checks happen once per selected row
                    //Is the selected row already the last Element? Then disable the down button
                    //Is the selected row the first element in the list? Then disable the up button
                    if (vm.nextIndex === (vm.gridOptionsTaskListTable.data.length)) {
                        vm.lastElement = true;
                        vm.firstElement = false;
                    }
                    else {
                        vm.lastElement = false;
                    }

                    if (vm.previousIndex < 0) {
                        vm.firstElement = true;
                        vm.lastElement = false;
                    }
                    else {
                        vm.firstElement = false;
                    }
                };


                // TODO: define all the functions needed for Task List operations
                vm.tasklist = {

                    moveSelectedUp: function () {

                        vm.selectedIndex = vm.gridOptionsTaskListTable.data.lastIndexOf(vm.selectedRowTaskList);
                        if (vm.previousIndex > -1) {

                            vm.previousIndex = vm.selectedIndex - 1;
                            vm.nextIndex = vm.selectedIndex + 1;

                            vm.previousRowData = vm.gridOptionsTaskListTable.data[vm.previousIndex];

                            vm.nextRowData = vm.gridOptionsTaskListTable.data[vm.nextIndex];

                            vm.gridOptionsTaskListTable.data[vm.previousIndex] = vm.gridOptionsTaskListTable.data[vm.selectedIndex];
                            vm.gridOptionsTaskListTable.data[vm.selectedIndex] = vm.previousRowData;
                            vm.selectedIndex = vm.selectedIndex - 1;

                            vm.checkStart();
                            vm.checkEnd();
                        }

                        else {

                        }
                        //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRow);                        
                        vm.tasklist.recalcTaskSequence();
                        vm.gridApiTaskList.core.refreshRows().then(function () {
                            vm.gridApiTaskList.selection.selectRow(vm.gridOptionsTaskListTable.data[vm.selectedIndex]); 
                        });
                        
                    },

                    moveSelectedDown: function () {

                        vm.selectedIndex = vm.gridOptionsTaskListTable.data.lastIndexOf(vm.selectedRowTaskList);

                        if (vm.nextIndex !== vm.gridOptionsTaskListTable.data.length) {

                            vm.previousIndex = vm.selectedIndex - 1;
                            vm.nextIndex = vm.selectedIndex + 1;

                            vm.previousRowData = vm.gridOptionsTaskListTable.data[vm.previousIndex];

                            vm.nextRowData = vm.gridOptionsTaskListTable.data[vm.nextIndex];

                            vm.gridOptionsTaskListTable.data[vm.nextIndex] = vm.gridOptionsTaskListTable.data[vm.selectedIndex];
                            vm.gridOptionsTaskListTable.data[vm.selectedIndex] = vm.nextRowData;
                            vm.selectedIndex = vm.selectedIndex + 1;

                            vm.checkEnd();
                            vm.checkStart();
                        }
                        else {
                            //vm.nextIndex = vm.selectedIndex+1;
                        }
                        //vm.gridApiTaskList.cellNav.scrollToFocus(vm.selectedRow);                        
                        vm.tasklist.recalcTaskSequence();
                        vm.gridApiTaskList.core.refreshRows().then(function () {
                            vm.gridApiTaskList.selection.selectRow(vm.gridOptionsTaskListTable.data[vm.selectedIndex]); 
                        });
                        
                    },

                    addTask: function () {
                        MessagesService.clearMessages();

                        //TODO:  pass in dummy value for now
                        var woType = "";
                        
                        AdminJsonService.getTasks(woType).then(function (data) {

                            var tableData = data.tableRows;

                            vm.gridOptionsAddTaskSelectTable.data = UiGridUtilService.extractTableCellValues(tableData);
                            var colDefs = UiGridUtilService.extractColumnDefs(tableData);
                            colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetaData);
                            vm.gridOptionsAddTaskSelectTable.columnDefs = colDefs;
          
                        });
                        vm.tasklist.recalcTaskSequence();
                    },

                    removeTask: function () {

                        // Remove an item
                        vm.gridOptionsTaskListTable.data.splice(vm.gridOptionsTaskListTable.data.lastIndexOf(vm.selectedRowTaskList), 1);
                        vm.tasklist.recalcTaskSequence();
                    },

                    saveTasks: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiTaskList.rowEdit.flushDirtyRows();
                        });
                    },

                    undo: function () {
                        vm.gridOptionsTaskListTable.data[vm.selectedIndexTaskList] = vm.gridDataTaskListCopy[vm.selectedIndexTaskList];
                    },
                    
                    recalcTaskSequence: function () {
                        
                        // this is a new task list with the re-sequenced tasks
                        var sequencedData = [];
                        var sequenceNumber = 10; // start with 10 (incremented by 10)
                       
                        var rowData;
                        
                        for (var i=0; i < vm.gridOptionsTaskListTable.data.length; i++) {
                            rowData = angular.copy(vm.gridOptionsTaskListTable.data[i]);
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
                        vm.gridOptionsTaskListTable.data = sequencedData;
          
                    },

                    export: function () {
                        vm.gridApiTaskList.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    },
                    
                    addToTaskList: function() {
                        MessagesService.clearMessages();
                        var rowData;
                        var selectedRow = vm.gridApiAddTask.selection.getSelectedRows()[0];
                        var selectedRowExists = false;
                        if(!(selectedRow.taskCode === 'PLAN')) {
                            for (var i=0; i < vm.gridOptionsTaskListTable.data.length; i++) {
                                rowData = angular.copy(vm.gridOptionsTaskListTable.data[i]);
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
                            vm.gridOptionsTaskListTable.data.push(selectedRowData);
                          
                            // recalculate task sequence
                            vm.tasklist.recalcTaskSequence();
                            
                            $("#addTaskModal").modal('hide');
                        } else {
                            MessagesService.addMessage('Task Code ['+ selectedRow.taskCode + '] is already added to list', "warning");
                        }
                    }
                };

                vm.checkStart = function () {
                    vm.previousIndex = vm.selectedIndex - 1;
                    if (vm.previousIndex < 0) {
                        vm.firstElement = true;
                    }
                    else {
                        vm.firstElement = false;
                    }
                }

                vm.checkEnd = function () {
                    vm.nextIndex = vm.selectedIndex + 1;
                    if (vm.nextIndex === vm.gridOptionsTaskListTable.data.length) {
                        vm.lastElement = true;
                    }
                    else {
                        vm.lastElement = false;
                    }
                };

                vm.insertCopyAtLocation = function () {
                    vm.newRowIndex = vm.selectedIndex + 1;
                    var dataCopy = angular.copy(vm.gridOptionsTaskListTable.data);
                    dataCopy.splice(vm.newRowIndex, 0, {
                        taskName: '',
                        taskSequence: '',
                        taskDescription: '',
                        tasksDuration: '',
                        tasksEscalation: ''
                    });
                    dataCopy[vm.newRowIndex] = vm.gridOptionsTaskListTable.data[vm.selectedIndex];
                    vm.gridOptionsTaskListTable.data = dataCopy;

                };


                function saveRow(rowEntity) {
                    // create a fake promise - normally you'd use the promise returned by $http or $resource
                    var deferred = $q.defer();
                    vm.gridApiTaskList.rowEdit.setSavePromise(rowEntity, deferred.promise);
                    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
                    $interval(function () {
                        if (rowEntity.gender === 'male') {
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }, 3000, 1);
                }

            }


            function setupUiGridForAddTask() {

                vm.gridOptionsAddTaskSelectTable = {
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


            function setupUiGridForUDA() {
                vm.gridOptionsUDATable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'uda.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiUDA = gridApi;
                        gridApi.edit.on.beginCellEdit($scope, beginCellEditUDA);
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedUDA);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
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
                                displayOrderDetail(vm.selectedRow.woType);
                            },
                            order:210
                        }                        
                    ]
                    
                });
                
                function beginCellEditUDA(rowEntity){
                    vm.gridApiUDA.selection.clearSelectedRows();
                    vm.gridApiUDA.selection.selectRow(rowEntity);

                    // Save row for undo
                    vm.undoRowUDA = angular.copy(rowEntity);
                    vm.isEditingUDA = true;
                }

                function rowSelectionChangedUDA(row) {
                    vm.selectedRowUDA = row.entity;
                    vm.selectedIndexUDA = vm.gridOptionsUDATable.data.lastIndexOf(vm.selectedRowUDA);

                }


                // TODO: define all the functions needed for Seltect UDA add/update operations
                vm.uda = {

                    saveUDA: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiUDA.rowEdit.flushDirtyRows();
                        });
                    },

                    updateUDA: function () {

                    },

                    undo: function () {
                        vm.gridOptionsUDATable.data[vm.selectedIndexUDA] =  vm.gridDataUDACopy[vm.selectedIndexUDA];
                    },

                    addUDA: function () {
                                                
                        if (vm.selectedRowUDA) {
                            vm.selectedIndex = vm.gridOptionsUDATable.data.lastIndexOf(vm.selectedRowUDA);
                            vm.gridOptionsUDATable.data.splice(vm.selectedIndex + 1, 0, {});
                            vm.gridApiUDA.core.refreshRows().then(function () {
                                vm.selectedIndex = vm.selectedIndex+1;
                                vm.gridApiUDA.core.scrollTo(vm.gridOptionsUDATable.data[vm.selectedIndex], vm.gridOptionsUDATable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiUDA.cellNav.scrollToFocus( vm.gridOptionsUDATable.data[vm.selectedIndex], vm.gridOptionsUDATable.columnDefs[0]);                        
                                vm.gridApiUDA.selection.selectRow(vm.gridOptionsUDATable.data[vm.selectedIndex]); 
                            }); 
                        }
                        else {
                            var newItem = {};
                            vm.gridOptionsUDATable.data.push(newItem);
                            vm.gridApiUDA.core.refreshRows().then(function () {
                                var lastRowIndex = vm.gridOptionsUDATable.data.length-1;
                                vm.gridApiUDA.core.scrollTo(vm.gridOptionsUDATable.data[lastRowIndex], vm.gridOptionsUDATable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiUDA.cellNav.scrollToFocus(vm.gridOptionsUDATable.data[lastRowIndex], vm.gridOptionsUDATable.columnDefs[0]);
                                vm.gridApiUDA.selection.selectRow(vm.gridOptionsUDATable.data[lastRowIndex]); 
                            });
                        }
                    },
                    export:function(){
                        vm.gridApiUDA.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    }
                  
                };
            }
            
            function setupUiGridForLinks() {
                vm.gridOptionsLinksTable = UiGridUtilService.createGrid({
                    exporterCsvFilename : 'links.csv',
                    onRegisterApi: function (gridApi) {
                        vm.gridApiLinks = gridApi;
                        gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedLinks);
                        //saving inline edited rows
                        //gridApi.rowEdit.on.saveRow($scope, saveRow);
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
                                displayOrderDetail(vm.selectedRow.woType);
                            },
                            order:210
                        }                        
                    ]                    
                });

                function rowSelectionChangedLinks(row) {
                    vm.selectedRowLinks = row.entity;
                    vm.selectedIndexLinks = vm.gridOptionsLinksTable.data.lastIndexOf(vm.selectedRowLinks);
                }


                // TODO: define all the functions needed for Seltect Links add/update operations
                vm.links = {

                    saveLink: function () {
                        Dialog.confirm("Would you like to save your changes?").then(function () {
                            vm.gridApiLinks.rowEdit.flushDirtyRows();
                        });
                    },

                    updateLink: function () {

                    },

                    undo: function () {
                        vm.gridOptionsLinksTable.data[vm.selectedIndexLinks] = vm.gridDataLinksCopy[vm.selectedIndexLinks]; 
                    },

                    addLink: function () {
                                                
                        if (vm.selectedRowLinks) {
                            vm.selectedIndex = vm.gridOptionsLinksTable.data.lastIndexOf(vm.selectedRowLinks);
                            vm.gridOptionsLinksTable.data.splice(vm.selectedIndex + 1, 0, {});
                            vm.gridApiLinks.core.refreshRows().then(function () {
                                vm.selectedIndex = vm.selectedIndex+1;
                                vm.gridApiLinks.core.scrollTo(vm.gridOptionsLinksTable.data[vm.selectedIndex], vm.gridOptionsLinksTable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiLinks.cellNav.scrollToFocus( vm.gridOptionsLinksTable.data[vm.selectedIndex], vm.gridOptionsLinksTable.columnDefs[0]);                        
                                vm.gridApiLinks.selection.selectRow(vm.gridOptionsLinksTable.data[vm.selectedIndex]); 
                            }); 
                        }
                        else {
                            var newItem = {};
                            vm.gridOptionsLinksTable.data.push(newItem);
                            vm.gridApiLinks.core.refreshRows().then(function () {
                                var lastRowIndex = vm.gridOptionsLinksTable.data.length-1;
                                vm.gridApiLinks.core.scrollTo(vm.gridOptionsLinksTable.data[lastRowIndex], vm.gridOptionsLinksTable.columnDefs[0]);
                                //Alternate to scrollTo - same behavior for now
                                //vm.gridApiLinks.cellNav.scrollToFocus(vm.gridOptionsLinksTable.data[lastRowIndex], vm.gridOptionsLinksTable.columnDefs[0]);
                                vm.gridApiLinks.selection.selectRow(vm.gridOptionsLinksTable.data[lastRowIndex]); 
                            });
                        }
                    },
                    
                    removeLink: function () {
                        vm.gridOptionsLinksTable.data.splice(vm.gridOptionsLinksTable.data.lastIndexOf(vm.selectedRowLinks), 1);
                    },
                    
                    export:function(){
                        vm.gridApiLinks.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
                    }
                  
                };
            }
            


            function setupVMMethods() {

                vm.clear = function () {
                    vm.poType = '';
                    vm.woType = '';
                };
                
      

                vm.poTypeSelectionEvents = {

                    onItemSelect: function (item) {

                        if (item.id !== undefined || item === "") {
                            if (item.id !== "" && item.id !== undefined) {
                                vm.searchButtonDisabled = false;
                                vm.clearButtonDisabled = false;
                            } else {
                                vm.searchButtonDisabled = true;
                                vm.clearButtonDisabled = true;
                            }
                        }
                    }

                };

                vm.woTypeSelectionEvents = {

                    onItemSelect: function (item) {

                        if (item.id !== undefined || item === "") {
                            if (item.id !== "" && item.id !== undefined) {
                                vm.searchButtonDisabled = false;
                                vm.clearButtonDisabled = false;
                            } else {
                                vm.searchButtonDisabled = true;
                                vm.clearButtonDisabled = true;
                            }
                        }
                    }

                };


                vm.orderSearch = function () {
                    // reset to false before making restful call to get search results
                    vm.displaySearchResultsTableFlag = false;
                    vm.displayOrderDetailsFlag = false;

                    var currentPOPicklist = vm.poTypeMultiselectPickListOutput;
                    var currentWOPicklist = vm.woTypeMultiselectPickListOutput;
                  //  var ordersearchresultpath = "";
                 
                    var woSelectedFlag = (currentWOPicklist.length !== 0);

                    //TODO:  this is for prototype only 
                    //when the real JSON service is available, selected PO Types and WO Types need to be passed to BE
                    if (!woSelectedFlag) {
                        vm.orderSearchPromiseTable = AdminJsonService.getPOSearchResults().then(function (data) {

                            vm.displaySearchResultsTableFlag = true;

                            var tableData = data.tableRows;
                            vm.gridOptionsSearchResults.data = UiGridUtilService.extractTableCellValues(tableData);
                            vm.gridOptionsSearchResults.columnDefs = UiGridUtilService.extractColumnDefs(tableData);
                            /**
                             * Hack to workaround the blank table issue
                             * @TODO Issue needs investigation
                             */
                            setTimeout(function () {
                                $(window).trigger('resize');
                            }, 0);  //500);
                        });
                    }
                    else {
                    
                        vm.orderSearchPromiseTable = AdminJsonService.getWOSearchResults().then(function (data) {

                            vm.displaySearchResultsTableFlag = true;

                            var tableData = data.tableRows;
                            vm.gridOptionsSearchResults.data = UiGridUtilService.extractTableCellValues(tableData);
                            vm.gridOptionsSearchResults.columnDefs = UiGridUtilService.extractColumnDefs(tableData);                       

                            setTimeout(function () {
                                $(window).trigger('resize');
                            }, 0);  //500);
                        });
                    }
                };
                
                
                vm.poTypeSelectionClickItemEvent = function (selectedItem) {   
                    if(vm.poTypeMultiselectPickListOutput.length > 0){
                        vm.searchButtonDisabled = false;
                        vm.clearButtonDisabled = false;
                    } else {
                        vm.searchButtonDisabled = true;
                        vm.clearButtonDisabled = true;
                    }
                };

                vm.poTypeSelectionSelectNoneEvent = function () {  
                    vm.searchButtonDisabled = true;
                    vm.clearButtonDisabled = true;          
                };

                vm.poTypeSelectionSelectAllEvent = function () { 
                    vm.searchButtonDisabled = false;
                    vm.clearButtonDisabled = false;      
                };

                vm.poTypeSelectionResetEvent = function () {  
                    vm.searchButtonDisabled = true;
                    vm.clearButtonDisabled = true;   
                };

                vm.woTypeSelectionClickItemEvent = function (selectedItem) { 
                    if(vm.woTypeMultiselectPickListOutput.length > 0){
                        vm.searchButtonDisabled = false;
                        vm.clearButtonDisabled = false;
                    } else {
                        vm.searchButtonDisabled = true;
                        vm.clearButtonDisabled = true;
                    }
                };

                vm.woTypeSelectionSelectNoneEvent = function () {  
                    vm.searchButtonDisabled = true;
                    vm.clearButtonDisabled = true;
                };

                vm.woTypeSelectionSelectAllEvent = function () {  
                    vm.searchButtonDisabled = false;
                    vm.clearButtonDisabled = false;      
                };

                vm.woTypeSelectionResetEvent = function () {   
                    vm.searchButtonDisabled = true;
                    vm.clearButtonDisabled = true;   
                };
                
            
            };

        }]);
