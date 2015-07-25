(function() {
    'use strict';
    
    angular.module('admin.app')
           .controller('TasksController', tasksController);

    tasksController.$inject = ['$scope', '$http', '$log', '$filter', '$templateCache', 'uiGridExporterConstants', 'taskTypes', 'AdminJsonService', 'UiGridUtilService', 'MessagesService','Dialog', '$rootScope', 'TransitionData', 'UiGridCommands'];    
	
    function tasksController($scope, $http, $log, $filter, $templateCache, uiGridExporterConstants, taskTypes, AdminJsonService, UiGridUtilService, MessagesService, Dialog, $rootScope, TransitionData, UiGridCommands) {
	var vm = this;
    
        //Grid context for the tasks grid
        vm.gridContextTasks = {}; 

        //Grid context for the subtasks grid
        vm.gridContextSubTasks = {}; 

        // sort the lookup type values in ascending order
        vm.taskTypes = $filter('orderBy')(taskTypes, 'name');
        vm.taskType = '';

        vm.displayTaskResults = false;
        vm.displaySubtaskResults = false;

        vm.searchAccordionOpen = true;

        vm.taskCodeAndNameLookupTable = setupCodeAndNameGridOptions();

        vm.gridOptions = setupGridOptionsForTasks();
        vm.gridOptionsSubTasks = setupGridOptionsForSubTasks();
        vm.gridContextTasks.gridOptions = vm.gridOptions;
        vm.gridContextSubTasks.gridOptions = vm.gridOptionsSubTasks;

        vm.uiGridExporterConstants = uiGridExporterConstants;

        vm.newRow = false;
        vm.newRowSubTask = false;

    
        // ========================================================
        // Use Function Declarations to hide implementation details
        // and keep the bindable members up top
        // ========================================================
        
        vm.taskSearch = taskSearch;
        vm.taskCodeAndNameLookup = taskCodeAndNameLookup;
        vm.selectedTaskCodeAndName = selectedTaskCodeAndName;
        vm.changeTaskType = changeTaskType;
        vm.refreshData = refreshData;
        
        vm.taskResult = {};
        vm.taskResult.addItem = addItemForTasks;
        vm.taskResult.saveTasks = saveTasks;
        vm.taskResult.undo = undoForTasks;
        vm.taskResult.insertCopyAtLocationForTasks = insertCopyAtLocationForTasks;
        vm.taskResult.discardItem = discardItemForTasks;
        vm.taskResult.export = exportFileForTasks;
        
        vm.subTask = {};
        vm.subTask.addItem = addItemForSubTasks;
        vm.subTask.saveSubTasks = saveSubTasks;
        vm.subTask.undo = undoForSubTasks;
        vm.subTask.discardItem = discardItemForSubTasks;
        vm.subTask.export = exportFileForSubTasks;
    
        
        init();
        
        function init() {
            //UiGridUtilService.loadTemplate('ui-grid/selectionRowHeader');
            //UiGridUtilService.loadTemplate('ui-grid/selectionRowHeaderButtonsCanopi');
            
 	    // Revert to default setting
            $templateCache.put('ui-grid/selectionRowHeader',
                "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
            );

            // Revert to default setting
            $templateCache.put('ui-grid/uiGridHeaderCell',
                 "<div ng-class=\"{ 'sortable': sortable }\"><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><span>{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span></div><div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\"><i class=\"ui-grid-icon-angle-down\">&nbsp;</i></div><div ng-if=\"filterable\" class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\"><div ng-if=\"colFilter.type !== 'select'\"><input type=\"text\" class=\"ui-grid-filter-input\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\"><div class=\"ui-grid-filter-button\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"></select><div class=\"ui-grid-filter-button-select\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div></div></div>"
            );

            UiGridCommands.registerCallbacks(updateUndoStack);          
        };
        


        function updateUndoStack() {
            // Undo configuration
            // Get updated undo stack from service when it changes for enabling/disabling undo button
            vm.undoStack = UiGridCommands.getCommandStack(); 
            vm.undoStackSubTasks = UiGridCommands.getCommandStack();
        }


     
        //Handle Grid events
        function rowSelectionChangedAddTaskCodeAndName(row) {
            vm.selectedRowTaskCodeAndName = row.isSelected ? row.entity : false;
        }


        function setupCodeAndNameGridOptions() {
            return {
                enableRowSelection: true,
                multiSelect: false,
                enableSorting: false,
                enableColumnMenus:false,
                rowHeight: 45,
                enableGridMenu: true,
                onRegisterApi: function (gridApi) {
                    vm.gridApiAddTaskCodeAndName = gridApi;
                    // Register Events
                    gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChangedAddTaskCodeAndName);
                }
            };
        }
        

        //Handle Grid events
        function beginCellEdit(rowEntity) {
            var index = _.indexOf(vm.gridOptions.data, rowEntity);
            UiGridCommands.execute('CellEdit', vm.gridContextTasks, {index: index, rowEntity: rowEntity});
        }



        function afterCellEdit(rowEntity) {                
            TransitionData.setDirtyRows('yes');
        }



        function rowSelectionChanged(row) {
            vm.selectedRow = row.isSelected ? row.entity : false;
            if((vm.selectedRow.id) === undefined || vm.selectedRow.id === ''){
                vm.newRow = true;
            }
            else{
                vm.newRow = false;
            }
            vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
            displaySubtasks();
        }



        function setupGridOptionsForTasks() {
            return UiGridUtilService.createGrid({
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridContextTasks.gridApi = gridApi;
                    //Register events
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
        }


        //Handle Grid events    
        function beginCellEditSubTasks(rowEntity) {
            var index = _.indexOf(vm.gridOptionsSubTasks.data, rowEntity);
            UiGridCommands.execute('CellEdit', vm.gridContextSubTasks, {index:index, rowEntity:rowEntity})
        }
            
           
           
        function rowSelectionChangedSubTask(row){
            vm.selectedRowSubTask = row.isSelected ? row.entity : false; 
            if((vm.selectedRowSubTask.id) === undefined || vm.selectedRowSubTask.id === ''){
                vm.newRowSubTask = true;
            }
            else{
                vm.newRowSubTask = false;
            }
            vm.selectedIndexSubTask = vm.gridOptionsSubTasks.data.lastIndexOf(vm.selectedRowSubTask);
        }



        function setupGridOptionsForSubTasks() {
            return UiGridUtilService.createGrid({
                onRegisterApi: function (gridApi) {
                    vm.gridApiSubTasks = gridApi;
                    vm.gridContextSubTasks.gridApi = gridApi;
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
        }
        
        
        
        function taskSearch() {
            MessagesService.clearMessages();
            //var isFormValidated = false;

            //isFormValidated = ((_.isEmpty(vm.taskCode) && _.isEmpty(vm.taskName) && _.isEmpty(vm.taskType)) ? false : true);

                //if(!isFormValidated) {
                //    MessagesService.addMessage('Please fill out at least one search criteria to continue_1', "error");
                //    MessagesService.addMessage('Please fill out at least one search criteria to continue_2', "error");
                //    MessagesService.addMessage('Please fill out at least one search criteria to continue_3', "error");
                //    MessagesService.addMessage('Please fill out at least one search criteria to continue', "warning");
                //    angular.element('.admin-app-container').css('margin-top', '150px');
                //    console.log("height should change");
                //} else {
                    // reset to false before making restful call to get search results
                    vm.displayTaskResults = false;
                    vm.displaySubtaskResults = false;

                    AdminJsonService.getAllTasks().then(function(data) {

                        vm.displayTaskResults = true;

                        vm.data = UiGridUtilService.extractTableCellValues(data);
                        vm.gridOptions.data = vm.data;
                        vm.gridDataCopy = angular.copy(vm.gridOptions.data);
                        var colDefs = UiGridUtilService.extractColumnDefs(data);
                        colDefs = UiGridUtilService.autoColWidth(colDefs, data.rowMetadata);
                        vm.gridOptions.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(colDefs);
                        vm.gridOptions.columnDefs = colDefs;
                        vm.gridOptions.exporterCsvFilename = vm.taskType.name + 'tasks.csv';

                    });
                //}
            };
        
        
        
        function taskCodeAndNameLookup() {
            AdminJsonService.getTaskCodeNameList().then(function (data) {

              var tableData = data;

              vm.taskCodeAndNameLookupTable.data = UiGridUtilService.extractTableCellValues(tableData);
              var colDefs = UiGridUtilService.extractColumnDefs(tableData);
              colDefs = UiGridUtilService.autoColWidth(colDefs, tableData.rowMetadata);
              vm.taskCodeAndNameLookupTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(colDefs);
              vm.taskCodeAndNameLookupTable.columnDefs = colDefs;
              //$log.debug(angular.toJson(data));

          });
        }
        
        
        
        function selectedTaskCodeAndName() {
            var selectedRow = vm.gridApiAddTaskCodeAndName.selection.getSelectedRows()[0];
            $("#taskCodeNameModal").modal('hide');
            vm.taskCode = selectedRow.taskCode;
            vm.taskName = selectedRow.taskName; 
        }
        
        
        
        function changeTaskType() {
            AdminJsonService.getTaskType(vm.taskType.value).then(function (data) {
                //vm.data = UiGridUtilService.extractTableCellValues(data);
                //vm.gridOptions.data = vm.data;
                //vm.gridOptions.columnDefs = UiGridUtilService.extractColumnDefs(data);
                vm.gridOptions.exporterCsvFilename = vm.taskType.value + 'tasks.csv';
            });
        }
        
        
        /**
        * Workaround to filter on all columns
        * @todo Remove this when ui-grid provides it natively
        */
        function refreshData(filter) {
            vm.gridOptions.data = vm.data;
            while (filter) {
                var oSearchArray = filter.split(' ');
                vm.gridOptions.data = $filter('filter')(vm.gridOptions.data, oSearchArray[0], undefined);
                oSearchArray.shift();
                filter = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
            }
        }

        
        function displaySubtasks(){
            
            vm.displaySubtaskResults = true;
            
            AdminJsonService.getSubTasks().then(function(data) {

                vm.displaySubtaskResults = true;

                var myData = UiGridUtilService.extractTableCellValues(data);
                vm.gridOptionsSubTasks.data = myData;
                vm.gridDataSubTasksCopy = angular.copy(vm.gridOptionsSubTasks.data);
                var colDefs = UiGridUtilService.extractColumnDefs(data);
                colDefs = UiGridUtilService.autoColWidth(colDefs, data.rowMetadata);
                vm.gridOptionsSubTasks.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(colDefs);
                vm.gridOptionsSubTasks.columnDefs = colDefs;
                vm.gridOptionsSubTasks.exporterCsvFilename = vm.taskType.name + 'subtasks.csv';                

            });         
        }  
        
        
        // Tasks
        
        function addItemForTasks() {
            var newRow={};             
            var cols = vm.gridOptions.columnDefs;
            angular.forEach(cols, function (column) {
                    newRow[column.id] = '';                                
            });

            if(vm.selectedRow){                    
                vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                UiGridCommands.execute('RowAdd', vm.gridContextTasks, {index: vm.selectedIndex+1, data: newRow});
            }            
            else{
                var lastRowIndex = vm.gridOptions.data.length-1;
                UiGridCommands.execute('RowAdd', vm.gridContextTasks, {index: lastRowIndex, data:newRow});
            }
        }
        
        
        
        function saveTasks() {
            Dialog.confirm("Would you like to save your changes?").then(function () {
                      vm.gridApi.rowEdit.flushDirtyRows();
                      UiGridCommands.resetCallbacks();
                      updateUndoStack();
                  });
        }
        
        
        
        function undoForTasks() {
            UiGridCommands.undo();    
            vm.selectedRow = false;
            vm.newRow = false;
        }
        
        
    
        function insertCopyAtLocationForTasks() {
            vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
            UiGridCommands.execute('RowDuplicate', vm.gridContextTasks, {index: vm.selectedIndex});
        }
        
        
        
        function discardItemForTasks() {
            //Check if this is new row or not with the id
            console.log(vm.selectedRow.id);
            //if((vm.selectedRow.id) === undefined){
                //vm.newRow = true;
            vm.gridOptions.data.splice(vm.gridOptions.data.lastIndexOf(vm.selectedRow), 1);
            vm.newRow = false;
            //}
            vm.gridApi.selection.clearSelectedRows();
            vm.gridApi.core.refresh();
            vm.selectedRow = false;   

            //vm.gridOptions.data.splice(vm.gridOptions.data.lastIndexOf(vm.selectedRow), 1);
            //}
        }
        
            
        function exportFileForTasks() {
           vm.gridApi.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
        }
        
        
        
        // Subtasks
        
        function addItemForSubTasks() {
            var newRow={};             
            var cols = vm.gridOptionsSubTasks.columnDefs;
            angular.forEach(cols, function(column){
                newRow[column.id] = '';                                

            });

            if(vm.selectedRowSubTask){                    
                vm.selectedIndex = vm.gridOptionsSubTasks.data.lastIndexOf(vm.selectedRowSubTask);
                UiGridCommands.execute('RowAdd', vm.gridContextSubTasks, {index: vm.selectedIndex+1, data:newRow});
            }            
            else{
                var lastRowIndex = vm.gridOptionsSubTasks.data.length-1;
                UiGridCommands.execute('RowAdd', vm.gridContextSubTasks, {index: lastRowIndex, data:newRow});
            }
        }
        
        
        
        function saveSubTasks() {
            Dialog.confirm("Would you like to save your changes?").then(function () {
                vm.gridApiSubTasks.rowEdit.flushDirtyRows();
                UiGridCommands.resetCallbacks();
                updateUndoStack();
            });
        }
        
        
        
        function undoForSubTasks() {
            UiGridCommands.undo();
            vm.selectedRowSubTask = false;
            vm.newRowSubTask = false;
        }
        
        
        
        function discardItemForSubTasks() {
            vm.gridOptionsSubTasks.data.splice(vm.gridOptionsSubTasks.data.lastIndexOf(vm.selectedRowSubTask), 1);
            vm.newRowSubTask = false;                    
            vm.gridApiSubTasks.selection.clearSelectedRows();
            vm.gridApiSubTasks.core.refresh();
            vm.selectedRowSubTask = false;         
        }
        
        
        
        function exportFileForSubTasks() {
            vm.gridApiSubTasks.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
        }
 
    }
})();



