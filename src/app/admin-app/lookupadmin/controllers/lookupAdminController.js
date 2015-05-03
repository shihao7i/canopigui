'use strict';

angular.module('admin.app').controller('LookupAdminController',
    ['$scope', '$log', '$filter', '$templateCache', 'uiGridExporterConstants', 'uiGridConstants', 'lookupTypes', 'AdminJsonService', 'UiGridUtilService', 'ModalRowEdit', 'Dialog',
        function ($scope, $log, $filter, $templateCache, uiGridExporterConstants, uiGridConstants, lookupTypes, AdminJsonService, UiGridUtilService, ModalRowEdit, Dialog) {
            var vm = this;

            // By default the accordion is open
            vm.searchAccordionOpen = true;

            // sort the lookup type values in ascending order
            vm.lookupTypes = $filter('orderBy')(lookupTypes, 'name');
            vm.uiGridExporterConstants = uiGridExporterConstants;

            // Load default values
            vm.lookupType = vm.lookupTypes[2];
            vm.mySlections = [];

            // Create and configure grid
            vm.gridOptions = UiGridUtilService.createGrid({
                exporterCsvFilename: vm.lookupType.value + '.csv',
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;

                    // Register events
                    gridApi.edit.on.beginCellEdit($scope, beginCellEdit);
                    gridApi.edit.on.afterCellEdit($scope, afterCellEdit);
                    gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChanged);
                    gridApi.rowEdit.on.saveRow($scope, saveRow);
                },
                gridMenuCustomItems: [
                    {
                        title: 'Hide Empty Columns',
                        action: function () {
                            vm.gridOptions.columnDefs[1].visible = false;
                            vm.gridApi.core.refresh();
                        }
                    },
                    {
                        title: 'Reset Columns',
                        action: function () {
                            vm.changeLookupType();
                        },
                        order: 210
                    }
                ]
            });

            AdminJsonService.getLookupType(vm.lookupType.value).then(function (data) {
                vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
                vm.gridOptions.data = vm.data;
                vm.gridOptions.columnDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                vm.gridDataCopy = angular.copy(vm.gridOptions.data);
            });

            // Handle grid events
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

            function rowSelectionChanged(rowEntity) {
                var msg = 'row selected ' + rowEntity.isSelected;
                $log.log(msg);

                vm.selectedRow = rowEntity.isSelected ? rowEntity.entity : false;
                if (vm.selectedRow) {
                    vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                    console.log("vm.selectedIndex :");
                    console.log(vm.selectedIndex);

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
                        vm.gridApi.core.refreshRows().then(function () {
                            vm.scrollDownIndex = vm.selectedIndex + 3;
                            //$log.debug(vm.scrollDownIndex);

                            vm.gridApi.core.scrollTo(vm.gridOptions.data[vm.scrollDownIndex], vm.gridOptions.columnDefs[0]);

                        })
                    }
                    else {
                        vm.gridApi.core.refreshRows().then(function () {
                            //$log.debug("limitRow")
                            //$log.debug(vm.limitRow);
                            vm.scrollUpIndex = vm.selectedIndex - 3;
                            //$log.debug(vm.scrollUpIndex);

                            vm.gridApi.core.scrollTo(vm.gridOptions.data[vm.scrollUpIndex], vm.gridOptions.columnDefs[0]);

                        })
                    }
                }
            }

            //@TODO Move scrolling to specified row here from rowSelectionChanged
//            function scrollTo(rowEntity){
//                 vm.selectedRow = rowEntity.entity;
//                 console.log(vm.selectedRow);
//            }

            function saveRow(rowEntity) {
                //console.log("Saving row");
                //console.log(vm.selectedRow);
                //console.log(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, vm.selectedRow));
            }

            vm.undo = function () {
                vm.gridOptions.data[vm.selectedIndex] = vm.gridDataCopy[vm.selectedIndex];
            };

            vm.save = function () {
                Dialog.confirm("Would you like to save your changes?").then(function () {
                    vm.gridApi.rowEdit.flushDirtyRows();
                });
            };

            vm.changeLookupType = function () {
                AdminJsonService.getLookupType(vm.lookupType.value).then(function (data) {
                    vm.data = UiGridUtilService.extractTableCellValues(data.tableRows);
                    vm.gridOptions.data = vm.data;
                    vm.gridOptions.columnDefs = UiGridUtilService.extractColumnDefs(data.tableRows);
                    vm.gridOptions.exporterCsvFilename = vm.lookupType.value + '.csv';
                    vm.gridDataCopy = angular.copy(vm.gridOptions.data);
                });
            };

            /**
             * Add or Edit an item
             * @param {Object} item Optional item if this is an edit operation
             */
            vm.addItem = function (item) {
                if (vm.selectedRow) {
                    vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                    //Alternative (to be used later)
                    ///var dataCopy = angular.copy(vm.gridOptions.data);
                    //dataCopy.splice(vm.selectedIndex+1, 0, {});
                    vm.gridOptions.data.splice(vm.selectedIndex + 1, 0, {});
                    vm.gridApi.core.refreshRows().then(function () {
                        vm.selectedIndex = vm.selectedIndex + 1;
                        vm.gridApi.core.scrollTo(vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);
                        //Alternate to scrollTo - same behavior for now
                        //vm.gridApi.cellNav.scrollToFocus( vm.gridOptions.data[vm.selectedIndex], vm.gridOptions.columnDefs[0]);                        
                        vm.gridApi.selection.selectRow(vm.gridOptions.data[vm.selectedIndex]);
                    });
                }
                else {
                    var lastRowIndex = vm.gridOptions.data.length;
                    vm.gridOptions.data.splice(lastRowIndex, 0, {});
                    vm.gridApi.core.refreshRows().then(function () {
                        var lastRowIndex = vm.gridOptions.data.length - 1;
                        vm.gridApi.core.scrollTo(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                        //Alternate to scrollTo - same behavior for now
                        //vm.gridApi.cellNav.scrollToFocus(vm.gridOptions.data[lastRowIndex], vm.gridOptions.columnDefs[0]);
                        vm.gridApi.selection.selectRow(vm.gridOptions.data[lastRowIndex]);
                    });
                }

                //Testing Out isDuplicate - WORKS
//                var testRow = {
//                    edpCarrier: "Test",
//                    canopiCarrierName:"",
//                    graniteCarrierName:"",
//                    vfoCarrierName:"",
//                    archive:"NO"                
//                }                
//                var testRowSecond = {
//                    edpCarrier: "Comcast Ethernet",
//                    canopiCarrierName:"",
//                    graniteCarrierName:"",
//                    vfoCarrierName:"",
//                    archive:"NO"
//                }                
//                console.log(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, testRow));
//                console.log(UiGridUtilService.isDuplicateRow(vm.gridOptions.data, testRowSecond));


            };

            vm.insertCopyAtLocation = function () {
                vm.selectedIndex = vm.gridOptions.data.lastIndexOf(vm.selectedRow);
                vm.newRowIndex = vm.selectedIndex + 1;
                var dataCopy = angular.copy(vm.gridOptions.data);
                //vm.gridDataCopy.splice(vm.newRowIndex, 0, {});
                dataCopy.splice(vm.newRowIndex, 0, {});
                //vm.gridDataCopy[vm.newRowIndex] = vm.gridOptions.data[vm.selectedIndex];
                dataCopy[vm.newRowIndex] = vm.gridOptions.data[vm.selectedIndex];
                //vm.gridOptions.data = vm.gridDataCopy;
                vm.gridOptions.data = dataCopy;

            };

            vm.remove = function (item) {
                // Remove an item
            };

            vm.export = function () {
                vm.gridApi.exporter.csvExport(vm.uiGridExporterConstants.ALL, vm.uiGridExporterConstants.ALL);
            }


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