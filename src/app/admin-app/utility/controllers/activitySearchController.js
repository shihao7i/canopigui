(function() {
    'use strict';
    
    angular.module('admin.app')
           .controller('ActivitySearchController', activitySearchController);

    activitySearchController.$inject = ['$scope', '$log', '$filter', 'picklists', 'AdminJsonService', 'UiGridUtilService'];    
	
    function activitySearchController($scope, $log, $filter, picklists, AdminJsonService, UiGridUtilService) {
	var vm = this;
        
        vm.woTypeCurrentSelection = [];

        // sort the rule category values in ascending order
        vm.activityTypes = $filter('orderBy')(picklists.activityTypes, 'name');

        var woTypeTitles = _.map(picklists.woTypes, function(woType) {
            return _.pick(woType, 'title');
        });

        vm.woTypes = $filter('orderBy')(woTypeTitles, 'title');

        vm.woTypeMultiselectPickList = vm.woTypes;
        vm.gridOptionsActivityResultsTable= setupGridOptionsForActivityResultsTable();

        vm.searchAccordionOpen = true;

        // set maxDate to today's date
        vm.maxDate = new Date();
        
        
        // ========================================================
        // Use Function Declarations to hide implementation details
        // and keep the bindable members up top
        // ========================================================
        
        vm.openActivitiesFromDate = openActivitiesFromDate;
        vm.openActivitiesToDate = openActivitiesToDate;
        vm.gridOptionsActivityResultsTable = setupGridOptionsForActivityResultsTable();
        vm.clear = clear;
        vm.activitySearch = activitySearch;
        vm.refreshData = refreshData;
        
        
        init();
        
        function init() {
 	   
        };
        
        
        function openActivitiesFromDate($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.openedFromDate = true;   
        };
            
        function openActivitiesToDate($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.openedToDate = true;
        };
        
        
        function setupGridOptionsForActivityResultsTable() {
            return {
                enableRowSelection: true,
                enableCellEditOnFocus:true,
                enableGridMenu:true,
                //enableRowSelection: true,
                //enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 1,
                multiSelect: false,
                rowHeight: 45,
                //showGridFooter:true,
                //enableFooterTotalSelected:true,
                enableSorting:false,
                exporterMenuPdf: false,
                exporterMenuCsv: false,
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
                      }
                    }
                ]    
            }; 
        }
        
        
        function clear() {
            vm.userid = '';
            vm.activityType = '';
            vm.fromDate = '';
            vm.toDate = '';
        };
            
            
        function activitySearch() {
                
            vm.displayActivitesResults = true;

            AdminJsonService.getActivitySearchResults().then(function(data) {

                vm.data = UiGridUtilService.extractTableCellValues(data);
                vm.gridOptionsActivityResultsTable.data = vm.data;

                var colDefs = UiGridUtilService.extractColumnDefs(data);
                colDefs = UiGridUtilService.autoColWidth(colDefs, data.rowMetadata);
                vm.gridOptionsActivityResultsTable.enableHorizontalScrollbar = UiGridUtilService.isHorizontalScrollbarNeeded(colDefs);
                vm.gridOptionsActivityResultsTable.columnDefs = colDefs;
                vm.gridOptionsActivityResultsTable.exporterCsvFilename = 'activities.csv';

                //HIDE ID COLUMN
                for (var i = 0; i < vm.gridOptionsActivityResultsTable.columnDefs.length; i++) {                      
                    if (vm.gridOptionsActivityResultsTable.columnDefs[i].id === 'id') {
                        vm.gridOptionsActivityResultsTable.columnDefs[i].enableHiding = false;
                        break;
                    }
                }
            });
        };
             
        
        
        /**
         * Workaround to filter on all columns
         * @todo Remove this when ui-grid provides it natively
         */
        function refreshData(filter) {
            vm.gridOptionsActivityResultsTable.data = vm.data;
            while (filter) {
                var oSearchArray = filter.split(' ');
                vm.gridOptionsActivityResultsTable.data = $filter('filter')(vm.gridOptionsActivityResultsTable.data, oSearchArray[0], undefined);
                oSearchArray.shift();
                filter = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
            }
        };


    }
    
})();



