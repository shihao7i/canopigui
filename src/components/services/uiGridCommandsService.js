(function() {
    'use strict';

    angular.module('canopi.service')
           .factory('UiGridCommands', uiGridCommandsService);
	
    uiGridCommandsService.$inject = ['$log'];    
        
    function uiGridCommandsService($log) {
        
        var observerCallbacks = [];
        var commandStack = [];
        var commands = [];
        
        var notifyObservers = function () {
            angular.forEach(observerCallbacks, function (callback) {
                callback();
            });
        };

        var Command = function (execute, unexecute, options) {
            this.execute = execute;
            this.unexecute = unexecute;
            this.options = options;
        };
        
        commands['RowAdd'] = function (options) {
            return new Command(rowAdd, rowSplice, options);
        };

        commands['RowRemove'] = function (options) {
            return new Command(rowRemove, rowAdd, options);
        };

        commands['CellEdit'] = function (options) {
            return new Command(cellEdit, cellRestore, options);
        };

        commands['RowDuplicate'] = function (options) {
            return new Command(rowDuplicate, rowDuplicateRemove, options);
        };


        return {
            execute: function (command, context, options) {
                options.context = context;
                var current = commands[command](options);
                current.execute(options);
                commandStack.push(current);
                notifyObservers();
            },
            undo: function () {
                var command = commandStack.pop();
                command.unexecute(command.options);
                notifyObservers();
            },
            getCommandStack: function () {
                return commandStack;
            },
            registerCallbacks: function (callback) {
                observerCallbacks.push(callback);
            },
            resetCallbacks: function () {
                while(commandStack.length) {
                    commandStack.pop();
                }
                while(observerCallbacks.length) {
                    observerCallbacks.pop();
                }
            }
        };   
        
        
        /**
        * Adds a row
        * @param {object} options - An object containing the grid context, and input values for this command
        * @param {object} options.context - An object consisting of the grid context (gridOptions and gridApi)
        * @param {number} options.index - The index of where to put the new row
        * @param {object} options.data (optional) - Optional parameter to fill in the new row with a data object
        */
        function rowAdd(options) {
            var data = _.isUndefined(options.data) ? {} : angular.copy(options.data);
            options.context.gridOptions.data.splice(options.index, 0, data);
            options.context.gridApi.core.queueRefresh().then(function () {

                options.context.gridApi.cellNav.scrollToFocus(options.context.gridOptions.data[options.index], options.context.gridOptions.columnDefs[0]);
                options.context.gridApi.selection.selectRow(options.context.gridOptions.data[options.index]);
            });
        }

        /**
        * Remove a row
        *
        * @param {object} options - An object containing the grid context, and input values for this command
        * @param {object} options.context - An object consisting of the grid context (gridOptions and gridApi)
        * @param {number} options.index - The index of the row to remove
        */
        function rowRemove(options) {
            // 1. Save the row data in options
            // 2. Remove the row
        };

        function rowSplice(options) {
            options.context.gridOptions.data.splice(options.index, 1);
            options.context.gridApi.selection.clearSelectedRows();
            options.context.gridApi.core.queueRefresh();
     //       options.context.gridApi.core.refreshRows().then(function(){
     //           options.context.gridApi.selection.raise.rowSelectionChanged;
     //       })
        }

        /**
         * Duplicate a row
         * @param {object} options - An object containing the grid context, and input values for this command
         * @param {object} options.context - An object consisting of the grid context (gridOptions and gridApi)
         * @param {number} options.index - The index of the row to duplicate
         */
        function rowDuplicate(options) {
            //var data = angular.copy(options.context.gridOptions.data[options.index]);
            var data = angular.copy(options.data);

            options.context.gridOptions.data.splice(options.index + 1, 0, data);
            //options.context.gridApi.core.refreshRows();
            //options.context.gridApi.core.refreshRows().then(function () {
            options.context.gridApi.core.queueRefresh().then(function () {
                options.context.gridApi.selection.selectRow(options.context.gridOptions.data[options.index + 1]);
            });
     //       $interval(function(){
     //            options.context.gridApi.rowEdit.setRowsDirty( options.context.gridApi.grid, [options.context.gridOptions.data[options.index+1]] );
     //       }, 1, 1);
        }

        function rowDuplicateRemove(options) {
            options.index += 1;
            rowSplice(options);
        }

        /**
         * Save row state
         * @note This gets called every time there is a cellEdit because ui-grid doesn't fire any events when a row is being
         * edited. Therefore, the result is that users are unable to undo operations on a per-cell basis.
         * @param {object} options - An object containing the grid context, and input values for this command
         * @param {object} options.context - An object consisting of the grid context (gridOptions and gridApi)
         * @param {number} options.index - The index of the row that is being edited
         * @param {RowEntity} options.rowEntity - The row being edited
         */
        function cellEdit(options) {
            options.oldRowEntity = angular.copy(options.rowEntity);
     //       options.oldRowEntity.$$hashKey = options.rowEntity.$$hashKey;
            options.context.gridApi.selection.clearSelectedRows();
            options.context.gridApi.selection.selectRow(options.rowEntity);
        }

        function cellRestore(options) {
            _.merge(options.rowEntity, options.oldRowEntity);
            options.context.gridOptions.data[options.index] = options.oldRowEntity;
            
     //       delete options.oldRowEntity.$$hashKey;
            options.context.gridApi.core.queueRefresh().then(function () {
            //options.context.gridApi.core.refreshRows().then(function () {
                 options.context.gridApi.selection.selectRow(options.oldRowEntity);
            });
        }
    }

})();
    
    
