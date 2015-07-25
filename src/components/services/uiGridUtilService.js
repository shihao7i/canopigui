(function() {
    'use strict';
    
    angular.module('canopi.service')
           .factory('UiGridUtilService', uiGridUtilService);
	
    uiGridUtilService.$inject = ['$templateCache', '$log', 'uiGridConstants', 'uiGridExporterConstants', '$localStorage'];    
        
    function uiGridUtilService($templateCache, $log, uiGridConstants, uiGridExporterConstants, $localStorage) {
    
        var service = {
            createGrid: createGrid,
            loadTemplate: loadTemplate,
            autoColWidth: autoColWidth,
            isHorizontalScrollbarNeeded: isHorizontalScrollbarNeeded,
            extractColumnDefs: extractColumnDefs,
            getFirstVisibleColumnId: getFirstVisibleColumnId,
            makeEditable: makeEditable,
            extractTableCellValues: extractTableCellValues,
            getEmptyColumns: getEmptyColumns,
            getEnabledColumns: getEnabledColumns,
            isEmptyRowFound: isEmptyRowFound,
            isDuplicateCheck: isDuplicateCheck,
            copyValuesToHiddenFields: copyValuesToHiddenFields,
            convertCellValueFromCodeToTitleForDropdownType: convertCellValueFromCodeToTitleForDropdownType,
            convertCellValueFromTitleToCodeForDropdownType: convertCellValueFromTitleToCodeForDropdownType,
            validateTaskDelegationRule: validateTaskDelegationRule,
            validateEmptyColumnValidationRule: validateEmptyColumnValidationRule,
            resetNextIdValue: resetNextIdValue,
            getNextIdValue: getNextIdValue
        };
        
        return service;
    
        ////////
        
       /**
        * Creates a grid config object
        *
        * @param config {Object} Custom configuration, overwriting the default values
        * @returns {Object} ui-grid configuration object
        */
        function createGrid(config) {
            var default_config = {
                enableRowSelection: true,
                rowHeight: 45,
                rowEditWaitInterval: -1,
                enableSelectAll: false,
                enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
                enableColumnMenus: false,
                enableGridMenu: true,
                showGridFooter: true,
                //enableFooterTotalSelected: false,
                enableCellEditOnFocus: true,
                enableFiltering:true,
                multiSelect: false,
                exporterMenuPdf: false,
                exporterMenuCsv: false,
//                flatEntityAccess: true,
                enableSorting: false,
            };

            return angular.extend(default_config, config);
        }


       /**
        * Put a specific template on the templateCache
        *
        * @param name
        */
        function loadTemplate(name) {
            var template = angular.injector(['canopi.templates']).get(name);
            $templateCache.put(name, template);
        }

       /**
        * Helper method to calculate the widths of columns
        *
        * @param colDefs column definitions
        * @param row table row metadata
        * @returns {boolean} scrollbar existence
        */
        function autoColWidth(colDefs, row, columnWidths) {
            var totalChars = 0;

            for (var i = 0; i < row.columnList.length; i++) {
                totalChars += (new String(row.columnList[i].displayName)).length;
            }

            for (var i = 0; i < colDefs.length; i++) {

                var numChars = (new String(colDefs[i].displayName)).length;
        
                    //$log.debug("many columns displayed!");
                    
                if(!!columnWidths) {
                    var found = false;

                    for(var n = 0; n < columnWidths.large.length; n++) {                                              
                       if(colDefs[i].id === columnWidths.large[n]){
                            colDefs[i].width = "23%";
                            found = true;
                        }         
                    }

                    for(var n = 0; n < columnWidths.medium.length; n++) {                        
                        if(colDefs[i].id === columnWidths.medium[n]){
                            colDefs[i].width = "14%";
                            found = true;
                        }                       
                    }

                    for(var n = 0; n < columnWidths.small.length; n++) {                       
                        if(colDefs[i].id === columnWidths.small[n]){
                            colDefs[i].width = "10%";
                            found = true;
                        }                       
                    }
                }

                    
                if(totalChars > 100) {

                    if(found === false) {
                        if(numChars <= 5) {
                            colDefs[i].width = "6%";
                        } else if(numChars > 5 && numChars <= 8) {
                            colDefs[i].width = "7%";
                        } else if(numChars > 8 && numChars <= 11) {
                            colDefs[i].width = "8%";
                        } else if(numChars > 11 && numChars <= 14) {
                            colDefs[i].width = "10%";
                        } else if(numChars > 14 && numChars <= 17) {
                            colDefs[i].width = "12%";
                        } else if(numChars > 17 && numChars <= 20) {
                            colDefs[i].width = "14%";
                        } else {
                            colDefs[i].width = "18%";
                        } 
                    }
                }
                
                //$log.debug("column id: " + colDefs[i].id);
            }

            return colDefs;
        }


       /**
        * Helper method to determine if a table needs a horizontal scrollbar. If the table
        * has more than 4 columns than a horizontal scrollbar should be enabled.
        *
        * @param colDefs column definitions
        * @returns {boolean} scrollbar existence
        */
        function isHorizontalScrollbarNeeded(colDefs) {

            var scrollbarExist = 0;

            if(colDefs.length > 5) {
                scrollbarExist = 1;
            }

            return scrollbarExist;
        }



        function getFirstVisibleColumnId(columnDefs) {
            
            var columnId = '';
            
            var visibleColumns = _.pluck(_.filter(columnDefs, 'visible'), 'id');
            
            //$log.debug("visibleColumns => " + angular.toJson(visibleColumns));
        
            if (!!visibleColumns && visibleColumns.length > 0 ) {
                columnId = visibleColumns[0];
            }
        
            return columnId;
        }
        

 /**
        * Helper method to build ng-grid's columnDefs property based on meta data column attributes
        *
        * @param tableData Table metadata
        * @param config {Object} (Optional) Configuration object that is applied to the column
        * @param pinnedColumns (Array) columns to be pinned
        * @returns {Array} Table columns
        */
        function extractColumnDefs(tableData, config, pinnedColumns) {
            var columns = _.uniq(tableData.rowMetadata.columnList, 'id');
            var rthis = this;
            angular.forEach(columns, function (column) {
                if(column.visible){
                    column.enableHiding = true;
                }
                else{
                    column.enableHiding = false;
                    
                }
                if (!!pinnedColumns) {
                    if (_.includes(pinnedColumns, column.id)) {
                        column.pinnedLeft = true;
                        column.enableHiding = false;
                    }
                    else {
                        column.enablePinning = false;
                    }
                } else {
                     column.enablePinning = false;
                }
                
                column.field = column.id;        
                column.cellFilter = 'uppercase';
                // If this field is editable, set the editable template to the right input
                if (column.editable) {
                    rthis.makeEditable(column);
                }
                else{
                    column.enableCellEdit = false;
                }
                //If this field is a hyperlink, set the cell to a hyperlink
                if(column.hyperlink){
                    column.cellTemplate = "<div class='ui-grid-cell-contents'><a href='http://{{COL_FIELD}}'>{{COL_FIELD}}</a></div>";
                }
                
                // Merge with config passed in
                if (!_.isUndefined(this)) {
                    angular.extend(column, this);
                }
            }, config);

            return columns;
        }


       /*
        * Helper method to set a field to editable
        * 
        * @param column The column to be made editable
        * @returns {undefined}
        */
        function makeEditable(column) {
            var template = angular.injector(['canopi.templates']).get('ui-grid/' + column.fieldType);
            $templateCache.put('ui-grid/' + column.fieldType, template);

            column.editableCellTemplate = 'ui-grid/' + column.fieldType;

            // add a default blank value in dropdown
            if (column.fieldType === "dropdown") {
                column.fieldOptions.unshift({
                  "title":"",
                  "code":""
               });
            }
        
            column.editDropdownOptionsArray = column.fieldOptions;
           
            //column.editDropdownIdLabel = 'label';

            // Changed Dropdown 'label' & 'value' to 'title' and 'code' per COLM's request
            column.editDropdownIdLabel = 'title'; //'code';
            column.editDropdownValueLabel = 'title';

            column.cellEditableCondition = function ($scope) {
                return !$scope.grid.appScope.isEditing;
            };
        }

       /**
        * Helper method to build ng-grid's data property based on meta data row values
        * @param tableData Table metadata
        * @returns {Array} Data rows
        */
        function extractTableCellValues(tableData) {
            var localRowData = [];
            var cellsInRow = [];
            var removeNulls = {};

            var totalCols = tableData.rowMetadata.columnList.length;
            var totalRows = (!tableData.rowValueList) ? 0 : tableData.rowValueList.length;

            var columns = _.uniq(tableData.rowMetadata.columnList, 'id');


            for (var i = 0; i < totalRows; i++) {
                removeNulls = removeDataNullValues(tableData.rowValueList[i]);
                //cellsInRow = tableData.rowValueList[i].cellValues;
                cellsInRow = removeNulls.cellValues;
                //console.log(cellsInRow);
                var obj = {};
                for (var j = 0; j < totalCols; j++) {
                    obj[tableData.rowMetadata.columnList[j]['id']] = cellsInRow[j];
                    //Check if cell should have a tooltip
                    if(cellsInRow[j] && cellsInRow[j].length > 10){
                        columns[j].cellTooltip = true;
                    }
                    else{
                        columns[j].cellTooltip = false;
                    }
                }
                localRowData.push(obj);
            }

            return localRowData;
        }

       /*
        * Helper method to get the columns that don't have cell values
        * @param tableData Table metadata
        * @returns {Array} column names
        */
        function getEmptyColumns(tableData){
            var isEmpty=[];
            var emptyCount = 0;
            var count = 0;
            var emptyColumnNames = [];
            var cellsInRow=[];
            var totalCols = tableData.rowMetadata.columnList.length;
            var totalRows = (!tableData.rowValueList) ? 0 : tableData.rowValueList.length;
            for(var j = 0; j<totalCols; j++){
                for (var i = 0; i < totalRows; i++) {
                        //Get the cells in one row
                        cellsInRow = tableData.rowValueList[i].cellValues;                        
                        //Check if the cell value in each column is empty
                        if(cellsInRow[j] === "" || cellsInRow[j] === null){
                                    //Store this inside of isEmpty array and increment count
                                    isEmpty[i]=true;
                                    emptyCount++;
                        }
                        else{

                            isEmpty[i]=false;
                        } 
                }
                //If we have checked all the rows store the column id of the ones that have empty cell values
                if(emptyCount === totalRows){
                    emptyColumnNames[count]=tableData.rowMetadata.columnList[j]['id'];
                    count++;

                }
                //Reset emptyCount to check for the next column
                emptyCount=0;
            }        
            return emptyColumnNames;
        }
        
        /*
        * Helper method to get all initially visible/enabled columns
        * @param tableData Table metadata
        * @returns {Array} enabled column names
        */
        function getEnabledColumns(tableData){
            var enabledColumnNames = _.pluck(_.where(tableData.rowMetadata.columnList, {'visible': true}), 'id');
            return enabledColumnNames;
        }

       /**
        * Helper method to verify if there exists empty row in the table 
        *
        * @param gridData {Array} ui-grid's gridOptions.data (all the rows in table)
        * @returns boolean empty row found
        */
        function isEmptyRowFound(gridOptions) {
            var gridData = gridOptions.data;
            var columnDefs = gridOptions.columnDefs;
            var columnsToOmit = _.pluck(_.where(columnDefs, {'visible': false}), 'id');
            //$log.debug("columnsToOmit => " + angular.toJson(columnsToOmit)); 
            
            if(gridData !== null && gridData !== undefined){
                
                    
                    for (var i=0; i < gridData.length; i++) {
                        // Extract property values from Object
                        // Create an array with all the falsey values removed
                        var ommittedData ={};
                        ommittedData = (_.omit(gridData[i], columnsToOmit));
                        ommittedData = (_.omit(ommittedData, "$$hashKey"));  
                        if (_.compact(_.values(ommittedData)).length === 0) {
                            return true;
                        }
                    }
                

            }
            return false;
        }

        
       /**
        * Helper method to verify if the newly added row is a duplicate of any of the existing rows 
        *
        * @param gridOptions{Object} ui-grid's gridOptions (gridOptions.columnDefs: column definitions
        *                                                   gridOptions.data: all the rows in table)
        * @param unsavedData {Object} dirty rows
        * @param uniqueColumns {Array} contains an array of columns which should be compared for uniqueness 
        *                              (if this argument is not passed from the calling function
        *                               the entire row is compared for the uniqueness)
        *                               For example:  ["carrier_name"]
        * @returns boolean duplicate row
        */
        
        function isDuplicateCheck(gridOptions, unsavedData, uniqueColumns){
            var gridData = gridOptions.data;
            var columnDefs = gridOptions.columnDefs;
            var duplicateRowIndices = [];
            var count = 0;
            if (!gridData || !unsavedData) return false;
            var totalCountOfIdenticalRow = 0;
            
            // fetch the id values for the columns which contain 'visible': false property value
            // these columns will be exclued from duplicate checking
            var columnsToOmit = _.pluck(_.where(columnDefs, {'visible': false}), 'id');
            
            $log.debug("columnsToOmit => " + angular.toJson(columnsToOmit));            
            
            if (!!uniqueColumns) {
                $log.debug("UniqueColumns:" + angular.toJson(uniqueColumns));
            }
            
            for(var row = 0; row<unsavedData.length; row++){
                //Get the single dirty row
                var dirtyRow = unsavedData[row].entity;
                //$log.debug("dirtyrow:" + angular.toJson(dirtyRow));
                var newRowDataWithoutIdField = {};

                newRowDataWithoutIdField = _.omit(dirtyRow, columnsToOmit);
                newRowDataWithoutIdField = _.omit(newRowDataWithoutIdField, "$$hashKey");                    
                newRowDataWithoutIdField = removeDataNullValues(newRowDataWithoutIdField);                    
                newRowDataWithoutIdField = convertDataUppercase(newRowDataWithoutIdField);
                $log.debug("New Row Data: " + angular.toJson(newRowDataWithoutIdField));

                //Case 1: If the entire row needs to be unique such that uniqueColumns:[]
                if (!uniqueColumns || uniqueColumns.length === 0) {   //0
                    $log.debug("Checking entire row uniqueness");
                    for (var i=0; i < gridData.length; i++) {
                        //$log.debug("gridData: " + angular.toJson(gridData[i]));
                        var omittedGridData = {};

                        omittedGridData = (_.omit(gridData[i], columnsToOmit));
                        omittedGridData = (_.omit(omittedGridData, "$$hashKey"));              
                        omittedGridData = removeDataNullValues(omittedGridData);
                        omittedGridData = convertDataUppercase(omittedGridData);

                        if (angular.equals(omittedGridData, newRowDataWithoutIdField)) {     
                        //if (angular.equals(_.omit(gridData[i], "id"), newRowDataWithoutIdField)) {
                            ++totalCountOfIdenticalRow;
                        }
                    }
                }

                //Case 2: If a particular column needs to be unique
                else {
                    $log.debug("Checking specific column");
                    var newRowDataWithUniqueColumns = _.pick(dirtyRow, uniqueColumns);
                    newRowDataWithUniqueColumns = removeDataNullValues(newRowDataWithUniqueColumns);
                    newRowDataWithUniqueColumns = convertDataUppercase(newRowDataWithUniqueColumns);
                    $log.debug("newRowData: " + angular.toJson(newRowDataWithUniqueColumns));

                    var currentRowData;   

                    //$log.debug("newRowData  => " + angular.toJson(dirtyRow));
                    //$log.debug("uniqueColumns  => " + angular.toJson(uniqueColumns));
                    //$log.debug("newRowDataWithUniqueColumns  => " + angular.toJson(newRowDataWithUniqueColumns));
                    var columnVal = '';
                    var x;
                    for(x in newRowDataWithUniqueColumns){
                        columnVal = newRowDataWithUniqueColumns[x];                            
                    }
                    if(columnVal !== ''){
                        for (var i=0; i < gridData.length; i++) {

                            // select the unique columns for duplicate comparison
                            currentRowData = _.pick(gridData[i], uniqueColumns);
                            currentRowData = removeDataNullValues(currentRowData);
                            currentRowData = convertDataUppercase(currentRowData);
                            //$log.debug("Current row data " + angular.toJson(currentRowData));
                            if (angular.equals(currentRowData, newRowDataWithUniqueColumns)) {
                                ++totalCountOfIdenticalRow;

                            }                        

                        }
                    }

                }
                //$log.debug("total count for the duplicate rows = " + totalCountOfIdenticalRow);
                if (totalCountOfIdenticalRow > 1) {   
                    var indexValue = gridData.lastIndexOf(dirtyRow);
                    if(indexValue !== -1){
                        duplicateRowIndices[count] = indexValue;                            
                        count++;
                    }
                }
                //Reset the count for checking the next dirty row
                totalCountOfIdenticalRow = 0;
            } // end for loop     
     
            return duplicateRowIndices;
        }
        
        
        /*
         * Helper function to convert all grid cell values to uppercase
         */
        function convertDataUppercase(o){
            var r = {};
            var columnVal = '';
            for (var p in o){
                columnVal = o[p];
                r[p] = columnVal.toUpperCase();
            }
            return r;
        }
        
        /*
         * Helper function to convert all grid cell values originally as null to ""
         */
        function removeDataNullValues(o){
            var r = {};
            var columnVal = '';
            for (var p in o){
                columnVal = o[p];
                if(columnVal === null){
                    columnVal = "";
                    
                }
                r[p] = columnVal;
            }
            return r;
        }
        
        
        // For Backhaul Product - GUI needs to copy title value to ref_id value before sending
        // data to COLM per COLM team's request
        // This is generic function.  We only need to update the meta property in mock data if
        // we need to support the same for the other tables in the future
        function copyValuesToHiddenFields(rowEntity, valuesToCopy) {
        
            // do nothing if this property is not set
            if (!valuesToCopy) return;
            
            angular.forEach(valuesToCopy, function (valueToCopy) {
                rowEntity[valueToCopy.destination] = rowEntity[valueToCopy.source];
            });
        }
        
            
        
        // This function needs to be called before displaying cell value for dropdown type 
        // convert from 'code' to 'title' for GUI dropdown display
        // 'code' is what is being stored in COLM DB
        function convertCellValueFromCodeToTitleForDropdownType(response) {
            
            var columns = response.rowMetadata.columnList;
            var rows = response.rowValueList;
            
            var fieldOptions = [];
            var cellsInRow = [];
            
            for (var i=0, totalColumns = columns.length; i < totalColumns; i++) {
                
                if (columns[i].fieldType === 'dropdown') {
                    
                    fieldOptions = columns[i].fieldOptions;
                    
                    for (var j=0, totalRows = rows.length; j < totalRows; j++) {
                        
                        cellsInRow = rows[j].cellValues;
            
                        // perform a deep comparison between each element in collection and the source object, returning
                        // an array of all elements that equivelent property values
                        var filteredArray = _.pluck(_.where(fieldOptions, {'code': cellsInRow[i]}), 'title');
                                    
                        //$log.debug("cellsInRow["+ i + "] => " + cellsInRow[i] + ", filteredArray (for row " + j + ") => " + angular.toJson(filteredArray));
                        
                        //if found, set the title value. otherwise, set it to blank
                        cellsInRow[i] = filteredArray.length > 0 ? filteredArray[0]: '';
                    };
                }
            }
          
            return response;
        }


        // This function needs to be called before updating record in COLM db
        // convert from 'title' value selected in GUI dropdown to 'code' value
        // 'code' is what is being stored in COLM DB
        function convertCellValueFromTitleToCodeForDropdownType(rowEntity, columns) {
        
            var fieldOptions = [];
            
            angular.forEach(columns, function (column) {
                fieldOptions = column.fieldOptions;
                
                if (column.fieldType === 'dropdown') {
                    
                    var columnIdValue = column['id'];
                    // perform a deep comparison between each element in collection and the source object, returning
                    // an array of all elements that equivelent property values
                    var filteredArray = _.pluck(_.where(fieldOptions, {'title': rowEntity[columnIdValue]}), 'code');
              
                    //$log.debug("columnValue => " + columnValue);
                    //$log.debug("filteredArray => " + angular.toJson(filteredArray));
                    
                    //if found, set the code value. otherwise, set it to blank
                    rowEntity[columnIdValue] = filteredArray.length > 0 ? filteredArray[0]: '';
                }
            
            });
           
            return rowEntity;
        }
        
        //
        
        function validateEmptyColumnValidationRule(gridOptions, unsavedData, rule){ 
            var gridData = gridOptions.data; 
            var columnDefs = gridOptions.columnDefs; 
            var ruleInvalidRowIndices = []; 
            var count = 0; 
            
            if (!gridData || !unsavedData || !rule) return []; 
 
            // fetch the id values for the columns which contain 'visible': false property value 
            // these columns will be exclued from duplicate checking 
            var columnsToOmit = _.pluck(_.where(columnDefs, {'visible': false}), 'id'); 
 
            $log.debug("columnsToOmit => " + angular.toJson(columnsToOmit)); 
 
            if (!!rule.invalidCondition.emptyColumns) { 
                $log.debug("matchColumns:" + angular.toJson(rule.invalidCondition.emptyColumns)); 
            } 
 
            for(var row = 0; row<unsavedData.length; row++){ 
                 //Get the single dirty row 
                var dirtyRow = unsavedData[row].entity; 
                //$log.debug("dirtyrow:" + angular.toJson(dirtyRow)); 
                var rowDataColumnsToCheckForEmpty = _.pick(dirtyRow, rule.invalidCondition.emptyColumns); 
 
                rowDataColumnsToCheckForEmpty = removeDataNullValues(rowDataColumnsToCheckForEmpty);                 
                $log.debug("rowDataWithMatchColumns: " + angular.toJson(rowDataColumnsToCheckForEmpty)); 
 
                var dirtyColumnVal = true; 
                var y; 
                for(y in rowDataColumnsToCheckForEmpty){ 
                    if(!rowDataColumnsToCheckForEmpty[y]) 
                        dirtyColumnVal = false; 
                } 
 
                if(!dirtyColumnVal) { 
                    var indexValue = gridData.lastIndexOf(dirtyRow); 
                    if(indexValue !== -1){ 
                        ruleInvalidRowIndices[count] = indexValue; 
                        count++; 
                    } 
                } 
            } 
            return ruleInvalidRowIndices; 
        }
        
        //
        
        ////////////////////
        
        /**
        * Validation Rule for Task Delegation 
        *
        * @param gridOptions{Object} ui-grid's gridOptions (gridOptions.columnDefs: column definitions
        *                                                   gridOptions.data: all the rows in table)
        * @param unsavedData {Object} dirty rows
        * @param rule {Object} contains a rule meta info
        * 
        * @returns boolean validated
        */
        
        function validateTaskDelegationRule(gridOptions, unsavedData, rule){
            var gridData = gridOptions.data;
            var columnDefs = gridOptions.columnDefs;
            var ruleInvalidRowIndices = [];
            var count = 0;
            
            if (!gridData || !unsavedData || !rule) return [];
            
            var totalCountOfRuleInvalid = 0;
            
            // fetch the id values for the columns which contain 'visible': false property value
            // these columns will be exclued from duplicate checking
            var columnsToOmit = _.pluck(_.where(columnDefs, {'visible': false}), 'id');
            
            $log.debug("columnsToOmit => " + angular.toJson(columnsToOmit));
            
            if (!!rule.invalidCondition.matchColumns) {
                $log.debug("matchColumns:" + angular.toJson(rule.invalidCondition.matchColumns));
            }
            if (!!rule.invalidCondition.unmatchColumns) {
                $log.debug("unmatchColumns:" + angular.toJson(rule.invalidCondition.unmatchColumns));
            }
            
            for(var row = 0; row<unsavedData.length; row++){
                //Get the single dirty row
                var dirtyRow = unsavedData[row].entity;
                //$log.debug("dirtyrow:" + angular.toJson(dirtyRow));
                var rowDataWithMatchColumns = _.pick(dirtyRow, rule.invalidCondition.matchColumns);

                rowDataWithMatchColumns = removeDataNullValues(rowDataWithMatchColumns);
                rowDataWithMatchColumns = convertDataUppercase(rowDataWithMatchColumns);
                $log.debug("rowDataWithMatchColumns: " + angular.toJson(rowDataWithMatchColumns));
                
                var rowDataWithUnmatchColumns = _.pick(dirtyRow, rule.invalidCondition.unmatchColumns);

                rowDataWithUnmatchColumns = removeDataNullValues(rowDataWithUnmatchColumns);
                rowDataWithUnmatchColumns = convertDataUppercase(rowDataWithUnmatchColumns);
                $log.debug("rowDataWithUnmatchColumns: " + angular.toJson(rowDataWithUnmatchColumns));
                
                var currentRowDataToMatch;
                var currentRowDataToUnmatch;
                
                var dirtyMatchColumnVal = true;
                var x;
                for(x in rowDataWithMatchColumns){
                    if(!rowDataWithMatchColumns[x])
                        dirtyMatchColumnVal = false;                            
                }
                
                var dirtyUnmatchColumnVal = true;
                var y;
                for(y in rowDataWithUnmatchColumns){
                    if(!rowDataWithUnmatchColumns[y])
                        dirtyUnmatchColumnVal = false;                            
                }
                
                if(dirtyMatchColumnVal && dirtyUnmatchColumnVal){
                    for (var i=0; i < gridData.length; i++) {
                        // select the unique columns for duplicate comparison
                        currentRowDataToMatch = _.pick(gridData[i], rule.invalidCondition.matchColumns);
                        currentRowDataToMatch = removeDataNullValues(currentRowDataToMatch);
                        currentRowDataToMatch = convertDataUppercase(currentRowDataToMatch);
                        if (angular.equals(currentRowDataToMatch, rowDataWithMatchColumns)) {
                            currentRowDataToUnmatch = _.pick(gridData[i], rule.invalidCondition.unmatchColumns);
                            currentRowDataToUnmatch = removeDataNullValues(currentRowDataToUnmatch);
                            currentRowDataToUnmatch = convertDataUppercase(currentRowDataToUnmatch);
                            if(!angular.equals(currentRowDataToUnmatch, rowDataWithUnmatchColumns)){
                                ++totalCountOfRuleInvalid;
                            }
                        }
                    }
                }
                //$log.debug("total count for the duplicate rows = " + totalCountOfIdenticalRow);
                if (totalCountOfRuleInvalid > 0) {   
                    var indexValue = gridData.lastIndexOf(dirtyRow);
                    if(indexValue !== -1){
                        ruleInvalidRowIndices[count] = indexValue;                            
                        count++;
                    }
                }
                //Reset the count for checking the next dirty row
                totalCountOfRuleInvalid = 0;
            }

            return ruleInvalidRowIndices;
        }
        
        
        
        function resetNextIdValue() {
            $localStorage.newRowId = '';
        }
        
        
        function getNextIdValue() {
       
            if (!$localStorage.newRowId) {
                $localStorage.newRowId = 'GUI_1';
                return $localStorage.newRowId;
            }
            else {
                var str = $localStorage.newRowId;
                var idx = str.indexOf("_");
                var nextIdValue = parseInt(str.substr(idx+1), 10) + 1;

                $localStorage.newRowId = "GUI_" + nextIdValue;

                return $localStorage.newRowId;
            }
            
        }
        
    }

})(); 
    
