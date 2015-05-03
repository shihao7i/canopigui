'use strict';

angular.module('admin.app').controller('RuleAdminController', 
    ['$scope', '$log', '$filter', '$q', '$stateParams', '$templateCache', '$interval', 'uiGridExporterConstants', 'uiGridConstants', 'ruleCategories', 'AdminJsonService', 'ModalRowEdit', 'UiGridUtilService', 'Dialog',
    function ($scope, $log, $filter, $q, $stateParams, $templateCache, $interval, uiGridExporterConstants, uiGridConstants, ruleCategories, AdminJsonService, ModalRowEdit, UiGridUtilService, Dialog) {
        // Revert templateCache
        $templateCache.put('ui-grid/selectionRowHeader',
            "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
          );
  
        // Revert to default setting
        $templateCache.put('ui-grid/uiGridHeaderCell',
             "<div ng-class=\"{ 'sortable': sortable }\"><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><span>{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span></div><div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\"><i class=\"ui-grid-icon-angle-down\">&nbsp;</i></div><div ng-if=\"filterable\" class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\"><div ng-if=\"colFilter.type !== 'select'\"><input type=\"text\" class=\"ui-grid-filter-input\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\"><div class=\"ui-grid-filter-button\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"></select><div class=\"ui-grid-filter-button-select\" ng-click=\"colFilter.term = null\"><i class=\"ui-grid-icon-cancel\" ng-show=\"!!colFilter.term\">&nbsp;</i><!-- use !! because angular interprets 'f' as false --></div></div></div></div>"
         );
 
        var vm = this;
        
        $log.debug("$stateParams => " + angular.toJson($stateParams));

        // Table lookup accordion open by default
        vm.searchAccordionOpen = true;
        
        // sort the rule category values in ascending order
        vm.ruleCategories = $filter('orderBy')(ruleCategories, 'name');
        $log.debug(vm.ruleCategories);
        vm.uiGridExporterConstants = uiGridExporterConstants;
        
        // Load default values
//        
//        if ()
//    for (var i = 0; i < $scope.activities.length; i++) {
//    if ($scope.activities[i].id == $scope.engineer.currentActivity.id) {
//        $scope.engineer.currentActivity = $scope.activities[i];
//        break;
//    }

        
        if ($stateParams.ruleCategory === 'taskQueue') {
            
            vm.ruleCategory =  vm.ruleCategories[5];
        } 
        else if ($stateParams.ruleCategory === 'taskDuration') {
            vm.ruleCategory = vm.ruleCategories[2];
        }
        else if ($stateParams.ruleCategory === 'taskEscalation') {
            vm.ruleCategory = vm.ruleCategories[3];
        }
        else if ($stateParams.ruleCategory === 'taskDelegation') {
            vm.ruleCategory = vm.ruleCategories[0];
        }
        else {
            vm.ruleCategory = vm.ruleCategories[7];  // default to "WO Description" for testing
        }
        
        vm.mySlections = [];
        vm.addRuleCategory = vm.ruleCategories[7];  // default to "WO Description" for testing
        vm.woDescription = '';
        vm.orderType='';
        
        vm.state = {};  

        // Configure grid
        vm.gridOptions = UiGridUtilService.createGrid({
            exporterCsvFilename: vm.ruleCategory.value + '.csv',
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                // Register Events
                gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
                gridApi.edit.on.afterCellEdit($scope, afterCellEdit); 
                gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChanged);
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
                    vm.changeRuleCategory(); 
                  },
                  order:210
                }
            ]
        });
        
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

        AdminJsonService.getRuleCategory(vm.ruleCategory.value).then(function (data) {
            vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
            vm.gridOptions.data = vm.data;
            vm.gridDataCopy = angular.copy(vm.gridOptions.data);
            var colDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
            colDefs = UiGridUtilService.autoColWidth(colDefs, data.tableRows.rowMetaData);

            vm.gridOptions.columnDefs = colDefs;
            //var templateWithTooltip = '<div class="ngCellText" ng-class="ui-grid-cell-contents"><a tooltip="Testing?" tooltip-placement="right" ng-cell-text>{{row.getProperty(col.field)}}</a></div>';
            //vm.gridOptions.columnDefs[1].cellTemplate = templateWithTooltip;
            //$log.debug("problem");
            //vm.gridOptions.columnDefs[1].cellTemplate = '<span tooltip="{{row.entity.note}}" tooltip-append-to-body="true" tooltip-trigger:"focus">{{row.entity.status}}</span>';
            vm.gridOptions.exporterCsvFilename = vm.ruleCategory.value + '.csv';           
            vm.emptyColumns = UiGridUtilService.getEmptyColumns(data.tableRows);
                
                
        });

        // Handle grid events
        function rowSelectionChanged(row) {
            vm.selectedRow = row.isSelected ? row.entity : false;
            var msg = 'row selected ' + row.isSelected;
            $log.log(msg);
            //Go to selected row
            vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
           //vm.gridApi.core.scrollTo( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
            //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
        }
        
//        function saveRow(rowEntity) {
//                // create a fake promise - normally you'd use the promise returned by $http or $resource
//                var promise = $q.defer();
//                vm.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
//                // fake a delay of 3 seconds whilst the save occurs, return error if woDescription is "no"
//                $interval( function() {
//                if (rowEntity.woDescription === 'no' ){
//                promise.reject();
//                } else {
//                promise.resolve();
//                }
//                }, 1000, 1);
//        }; 
        
        vm.toggleEmptyColumns = function(){           

            var emptyColumns = vm.emptyColumns;
            for (var i = 0; i < vm.gridOptions.columnDefs.length; i++) { 
                for(var j = 0; j<emptyColumns.length; j++){
                           if (vm.gridOptions.columnDefs[i].id === emptyColumns[j]) {

                               if(vm.gridOptions.columnDefs[i].visible === true){
                                   vm.gridOptions.columnDefs[i].visible = false;
                               }
                               else{
                                   vm.gridOptions.columnDefs[i].visible = true;
                               }
                           }
                       }
            }
            vm.gridApi.core.refresh();
         
        };
        
        vm.insertEmptyRowTop = function(){
            vm.gridOptions.data.unshift({});
        };
        
        vm.insertEmptyRowBottom = function(){
            vm.gridOptions.data.push((vm.gridOptions.data.length),0, {});
            
        };
        
        vm.insertEmptyRowAtLocation = function(){
            vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
            vm.gridOptions.data.splice(vm.selectedIndex+1, 0, { woDescription: '', orderType: '', taskDescription:'', tasksDuration:'', tasksEscalation:'' });
            //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex+1], vm.gridOptions.columnDefs[0]);
        };
        
        vm.insertCopyAtLocation = function(){
                vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                vm.newRowIndex = vm.selectedIndex+1;
                var dataCopy = angular.copy(vm.gridOptions.data);                
                dataCopy.splice(vm.newRowIndex, 0, { woDescription: '', orderType: '', taskDescription:'', tasksDuration:'', tasksEscalation:'' });
                dataCopy[vm.newRowIndex] = vm.gridOptions.data[vm.selectedIndex];
                vm.gridOptions.data = dataCopy;                
        };

        vm.changeRuleCategory = function () {
            
            AdminJsonService.getRuleCategory(vm.ruleCategory.value).then(function (data) {
    
                vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
                vm.gridOptions.data = vm.data;
                vm.gridDataCopy = angular.copy(vm.gridOptions.data);
                var colDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                colDefs = UiGridUtilService.autoColWidth(colDefs, data.tableRows.rowMetaData);

                vm.gridOptions.columnDefs = colDefs;
                vm.gridOptions.exporterCsvFilename = vm.ruleCategory.value + '.csv';
            
            });
        };

        /**
         * Add or Edit an item
         * @param {Object} item Optional item if this is an edit operation
         */
        vm.addItem = function (item) {
            //Old Version - using modal
            //            ModalRowEdit.open(vm.gridOptions.columnDefs, item).then(function (newItem) {
            //                vm.gridOptions.data.push(newItem);
            //            });

            //New Version - inline
            if(vm.selectedRow){
                vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                vm.gridOptions.data.splice(vm.selectedIndex+1, 0, { woDescription: '', orderType: '', taskDescription:'', tasksDuration:'', tasksEscalation:'' });
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
        };
        
        vm.editItem = function(item){
            //Set inline editable to true
            //vm.gridOptions.data.push(item);
        };

        vm.remove = function (item) {
            // Remove an item
            vm.gridOptions.data.splice(vm.gridOptions.data.lastIndexOf(vm.selectedRow ), 1);            
        };        

        vm.export = function () {
            vm.gridApi.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
        };
        
        vm.save = function(){
            Dialog.confirm("Would you like to save your changes?").then(function () {
                vm.gridApi.rowEdit.flushDirtyRows();
            });
        };
        
        
        vm.undo = function(){
            vm.gridOptions.data[vm.selectedIndex] = vm.gridDataCopy [vm.selectedIndex];;
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

    }]);
