(function() {
    'use strict';
    
    angular.module('canopi.directive')
           .directive('dataTable', dataTable);

    dataTable.$inject = ['$window', '$log'];    

    function dataTable($window, $log) {
        var directive = {
            restrict: 'EA',
            scope: {
                options: "=",
                control: "="
             },
            link: link
        };
	
        return directive;

        ////
        
        function link(scope, element, attrs) {
            $log.debug('Creating dataTable with column headers: ');
            for(var i=0; i<scope.options.aoColumns.length; i++) {
                var obj = scope.options.aoColumns[i];
                $log.debug(' ' + obj.sTitle);
            }

            var dataTable;

            scope.$watch('options.aaData', handleModelUpdates);

            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data.length) {
                    dataTable = element.dataTable(scope.options);
                    $log.debug('After element.dataTable');
                    $log.debug('Handle handleModelUpdates called: ' + data);
                    $log.debug("Datatable length is: " + data.length);
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }

            scope.internalControl = scope.control || {};

            scope.internalControl.hideCols = function(arrayOfColIndex) {
                for (i = 0; i < arrayOfColIndex.length; ++i) {
                    dataTable.fnSetColumnVis(arrayOfColIndex[i], false);
                }
            };

            scope.internalControl.showCols = function(arrayOfColIndex) {
                for (i = 0; i < arrayOfColIndex.length; ++i) {
                    dataTable.fnSetColumnVis(arrayOfColIndex[i], true);
                }
            };

            $(window).bind('resize', function() {
                dataTable.fnAdjustColumnSizing();
            });

            scope.$on('$destroy', function() {
                angular.element($window).unbind('resize');
            });
        }
    }
	
})();

