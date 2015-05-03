/**
 /**
 * * This directive is used to show the alert messages on top of the screen (right below the main menu bar) 
 
 [Example of the directive usage in html]:
 
 <table class="table table-striped table-hover data-table" id="poResultsTable" search-result-table add-filter="true"
 table-data="projectordersearch.tableData" event-handler="projectordersearch.gridEventHandler(eventId, data)">
 </table>
 *  
 */

angular.module('canopi.directive').directive('simpleDatatable', ['$window', '$filter', '$compile', '$location', '$timeout', '$log',
    function ($window, $filter, $compile, $location, $timeout, $log) {
        'use strict';

        return {
            restrict: 'E, A, C',
            //Declare isolate scope so we can use multiple table controls in the same controller
            //and we don't bear the danger of controller scope effecting anything here
            scope: {
                tableData: "=", //Maps to the object in the controller scope holding rows, etc.
                onRowClick: "&",
                addFilter: "@addFilter",
                addPagination: "@addPagination",
                addExport: "@addExport",
                addColumnShowHide: "@addColumnShowHide"
            },
            link: function (scope, element, attrs, controller) {

                //Have to unbind from the resize event when this directive is destroyed
                scope.$on('$destroy', function () {
                    angular.element($window).unbind('resize');
                });

                if (scope.tableData.loadTrigger === undefined) {
                    scope.tableData.loadTrigger = 0;
                }
                    
                //External API to see if actual DataTable exists... could be with or without data
                scope.isTableExist = function() {
                        return $.fn.dataTable.fnIsDataTable(document.getElementById(attrs.id));
                };
                          
                //Setup the watch which gets kicked off to regenerate and/or delete the table
                scope.$watch("tableData.loadTrigger", function (newTriggerVal, oldTriggerVal) {

                    //This watch is called once during init.. indicated by newVal and oldVal don't match AND the data is undefined 
                    if (scope.tableData.tableDefinition !== undefined) {

                        //Setup some locals to seperate column from row data 
                        var localColumnDefs = [];
                        var localRowData = [];
                        var item = scope.tableData.tableDefinition.rowMetaData || {columnList: []};

                        for (var n = 0; n < item.columnList.length; n++) {

                            var columnOptions = {
                                //Need to override this value (it's "" in the library) so that null will work as data
                                "sDefaultContent": "",
                                "sTitle": item.columnList[n].displayName,
                                "mDataProp": item.columnList[n].id,
                                "aTargets": [n],
                                "mData": item.columnList[n].id
                            };
                            localColumnDefs.push(columnOptions);
                        }

                        //Extract the column data
                        //Must account for case where no rows are returned, which may include an error
                        //If it's defined, it'll have all of the proper fields in it
                        if (scope.tableData.tableDefinition.rowMetaData !== undefined) {
                            for (var i = 0; i < scope.tableData.tableDefinition.rowMetaData.rowValueList.length; i++) {

                                var rowValue = scope.tableData.tableDefinition.rowMetaData.rowValueList[i];
                                var obj = {};

                                for (var n = 0; n < rowValue.cellValues.length; n++) {
                                    // create Id and value pair for each column
                                    obj[scope.tableData.tableDefinition.rowMetaData.columnList[n].id] = rowValue.cellValues[n];

                                }

                                localRowData.push(obj);
                            }
                        }

                        //We've just finished extracting localColumnDefs (column data only) from localRowData (row data only)
                        //Either both will be an empty array or neither will be an empty array
                        //Proceed to prepare the table for construction


                        var dataTable = null;
                        var isExistingTable = scope.isTableExist();

                        //First see if we have an existing table so we can decide if we need to kill it... 
                        if ( isExistingTable  && (localColumnDefs.length > 0  || newTriggerVal == 0) ) {

                                //If a table already exists and we have columns... then we should kill it
                                //If a table already exists but there is no key... then the controller wants to kill the table and not regenerate
                                //TODO: Here we could compare the new columns to old ones and NOT kill the table if they're the same
                                console.log("inside destroy");
                                element.dataTable().fnClearTable();
                                element.dataTable().fnDestroy();
                                $("#"+attrs.id).empty();
                        };
                        
                        //If the controller doesn't want to regenerate a table... get out
                        if (newTriggerVal > 0) {

                            if (localColumnDefs.length === 0) {
                                //No current columns so load some old ones if any, and if none of the last search's,
                                //see if we can get some from a prior session (stored), and if not, make up some bogus ones
                                localColumnDefs = scope.lastColumnDefs;

                                if (localColumnDefs === undefined || localColumnDefs === null) {

                                    localColumnDefs = [
                                        {
                                            "sTitle": "Data",
                                            "mData": "id",
                                            "mDataProp": "id",
                                            "sDefaultContent": "",
                                            "aTargets": [0]
                                        }
                                    ];
                                }
                            }

                            //If we aren't using the old table... build it
                            // l - show entries (10, 20, etc)
                            // f - filter
                            // p - pagination
                            // i = table info
                            // T - export
                            if (dataTable === null) {

                                var sDomString = "";
                                var includePagination = false;
                                var paginationHeight = false;

                                if (scope.addFilter === "true" && (scope.addPagination === "false" || scope.addPagination === undefined) && (scope.addExport === "false" || scope.addExport === undefined) && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'f>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if (scope.addFilter === "true" && scope.addPagination === "true" && (scope.addExport === "false" || scope.addExport === undefined) && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'f>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                }
                                else if (scope.addFilter === "true" && (scope.addPagination === "false" || scope.addPagination === undefined) && scope.addExport === "true" && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'f>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'T>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if (scope.addFilter === "true" && (scope.addPagination === "false" || scope.addPagination === undefined) && (scope.addExport === "false" || scope.addExport === undefined) && scope.addColumnShowHide === "true") {
                                    sDomString = "<'row'<'col-md-12'Cf>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && scope.addPagination === "true" && (scope.addExport === "false" || scope.addExport === undefined) && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && scope.addPagination === "true" && scope.addExport === "true" && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'T>>";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && scope.addPagination === "true" && (scope.addExport === "false" || scope.addExport === undefined) && scope.addColumnShowHide === "true") {
                                    sDomString = "<'row'<'col-md-12'C>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && (scope.addPagination === "false" || scope.addPagination === undefined) && scope.addExport === "true" && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'T>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && (scope.addPagination === "false" || scope.addPagination === undefined) && scope.addExport === "true" && scope.addColumnShowHide === "true") {
                                    sDomString = "<'row'<'col-md-12'C>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'T>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && (scope.addPagination === "false" || scope.addPagination === undefined) && (scope.addExport === "false" || scope.addExport === undefined) && scope.addColumnShowHide === "true") {
                                    sDomString = "<'row'<'col-md-12'C>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else if ((scope.addFilter === "false" || scope.addFilter === undefined) && (scope.addPagination === "false" || scope.addPagination === undefined) && (scope.addExport === "false" || scope.addExport === undefined) && (scope.addColumnShowHide === "false" || scope.addColumnShowHide === undefined)) {
                                    sDomString = "<'row'<'col-md-12'>>t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                    includePagination = false;
                                    paginationHeight = "250px";
                                }
                                else {
                                    sDomString = "t<'row'<'col-xs-12 col-md-4'i><'col-xs-12 col-md-8'>>";
                                }

                                dataTable = element.dataTable(getTableCreateOptions(localColumnDefs, sDomString, includePagination, paginationHeight));
                            }

                            //Now store the old columns... Do it before loading rows in case it kicks off a table store
                            scope.lastColumnDefs = localColumnDefs;

                            //One way or another we have a table with columns in it... Now load the data.  It might be empty.
                            if (localRowData === undefined || localRowData.length === 0) {
                                dataTable.fnClearTable();
                            }
                            else {
                                dataTable.fnAddData(localRowData);
                            }

                        }	//regeneration conditional (newTriggerVal > 0)


                    }

                });  // watch on tableDefinition...

                function getTableCreateOptions(columns, type, includePagination, paginationHeight) {
                                       
                    return {
                        sDom: type,
                        oLanguage: {
                            "sSearch": 'Filter Results:',
                            "sEmptyTable": 'No records found matching the search criteria'
                        },
                        oTableTools: {
                            "aButtons": [{
                                    "sExtends": "xls",
                                    "sButtonText": "Export",
                                    "mColumns": "visible"
                                }],
                            "sSwfPath": "assets/images/copy_csv_xls_pdf.swf"
                        },
                        aoColumnDefs: columns,
                        bRetrieve: true,
                        bDestroy: true,
                        bPaginate: false,
                        //This method is called everytime DataTables adds a row to the table
                        fnCreatedRow: function (nRow, aData, iDataIndex) {
                            //We need to compile the newly added row in case HTML with angular attributes was injected
                            //into the TD's or they won't work
                            $compile(nRow)(scope);
                        },
                        scrollX: true,
                        scrollY: "200px",
                        iDisplayLength: 100
                    };
                };

            } 	//link method

        };
    }]);

