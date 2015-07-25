/**
 * This directive has dependencies on Angular UI's ng-grid library.
 * It also uses the styles defined in att-gui.css created by MaxMedia.
 *
 * This directive supports the Group Assignment by moving items from left to right panel and vice versa
 * 
 * 
   [Examples of the directive usage in html]:

    <div group-assignment
         leftboxtitle="User Group List"
         rightboxtitle="Group List"
         left-items="userInfoData.workGroup"
         right-items="groupGridData.workGrouplist"
         cols="columnDefs"
         grid-custom-options="gridOptions"
         move-left="moveToLeft()"
         move-right="moveToRight()">
    </div>

         or

     <div group-assignment
         leftboxtitle="User Group List"
         rightboxtitle="Group List"
         left-items="userInfoData.workGroup"
         right-items="groupGridData.workGrouplist"
         cols="columnDefs"
         grid-custom-options="gridOptions"
         add-items="addItems(itemsToBeAdded)"
         delete-items="deleteItems(itemsToBeRemoved)"
         move-left="moveToLeft()"
         move-right="moveToRight()">
     </div>


   [Example of the model data set in the controller]:

    // For Group Assignment
    $http.get('app/mock/admin/getAllWorkGroups.json').success(function(data){
                $scope.groupGridData = data;
        });

    $scope.userInfoData = {workGroup: null};

    $scope.leftToRightSelections = [];
    $scope.rightToLeftSelections = [];

    $scope.columnDefs = [
    {
         field: 'name',
         displayName: 'Name'
    },
    {
         field: 'affiliate',
         displayName:'Affiliate'
    }];

    $scope.gridOptions = {
                enableColumnResize: true,
                enableRowSelection: true,
                multiSelect: true
            };
     
 *  
 */

(function() {
    'use strict';
  
    angular.module('canopi.directive')
           .directive('groupAssignment', groupAssignment);

    groupAssignment.$inject = ['$log', '$compile'];    

    function groupAssignment($log, $compile) {
        var directive = {
            restrict: 'EA',
            scope: {
                leftboxtitle: '@?',   // optional
                rightboxtitle: '@?',  // optional
                leftItems: "=",       // data objects to be filled in the left panel
                rightItems: "=",      // data objects to be filled in the right panel
                cols: "=",            // column definitions
                gridCustomOptions: "=",
                addItems: "&?",       // optional ==> callback function used to invoke restful call in the controller to add items
                deleteItems: "&?",    // optional ==> callback function used to invoke restful call in the controller to delete items
                // the following two scope variables are used to resolve the isolated scope issue with ng-click by passing the function reference to the directive (the explanation is in the link below)
                // http://stackoverflow.com/questions/17567383/why-doesnt-ng-click-work-in-my-directive-and-how-do-i-add-a-toggle-class
                moveLeft: "&",
                moveRight: "&"
            },
            link: link
        };
	
        return directive;
        
        ////
        
        function link(scope, element, attrs) {

            // make sure all the data are ready for ng-grid before rendering the DOM
            scope.dataReady = {
                leftGroupListOptionsReady: false,
                rightGroupListOptionsReady: false
            };

            // arrays to hold selected items in the left and right panels
            scope.leftSelectedItems = [];
            scope.rightSelectedItems = [];

            // combined ng-grid options for the left and right panels
            scope.leftGroupListOptions = {};
            scope.rightGroupListOptions = {};

            // common custom options for left and right panels
            var customOptions = scope.gridCustomOptions;

            // specific options for left and right panels
            var leftGridOptions;
            var rightGridOptions;

            // this template needs to be compiled to interpolate ng-grid options into left and right panels
            var template =  '<div class="row">' +
                            '    <div class="col-xs-5 col-sm-5 col-md-5">' +
                            '        <label>{{leftboxtitle}}:</label>' +
                            '        <div class="table-responsive">' +
                            '        	<div class="gridStyle-userMgmt-group" ng-grid="leftGroupListOptions"></div>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="col-xs-2 col-sm-2 col-md-2">' +
                            '        <div class="group-assignment-nav">' +
                            '            <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="leftItems === null || leftItems.length === 0 || leftSelectedItems.length === 0" ng-click="moveToRight()"><span class="icon-ICON_CHEVRON_RIGHT"></span></a>' +
                            '            <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="rightItems === null || rightItems.length === 0 || rightSelectedItems.length === 0" ng-click="moveToLeft()"><span class="icon-ICON_CHEVRON_LEFT"></span></a>' +
                            '        </div>' +
                            '   </div>' +
                            '   <div class="col-xs-5 col-sm-5 col-md-5">' +
                            '        <label>{{rightboxtitle}}:</label>' +
                            '        <div class="table-responsive">' +
                            '        	<div class="gridStyle-userMgmt-group" ng-grid="rightGroupListOptions" ></div>' +
                            '        </div>' +
                            '   </div>' +
                            '</div>';


            // wait till data is ready for the left panel before building the ng-grid options
            scope.$watch("leftItems", function() {

                if (scope.leftItems !== undefined) {
                    leftGridOptions = {
                        columnDefs: scope.cols,
                        data: 'leftItems',
                        selectedItems: scope.leftSelectedItems,
                        afterSelectionChange: function (row, event) {
                            $log.debug("leftGridOptions selectedItems length = " + scope.leftSelectedItems.length);
                        }
                    };

                    angular.extend(scope.leftGroupListOptions, customOptions);
                    angular.extend(scope.leftGroupListOptions, leftGridOptions);

                    scope.dataReady["leftGroupListOptionsReady"] = true;

                    //$log.debug("scope.leftGroupListOptions = " + angular.toJson(scope.leftGroupListOptions));
                }
            });

            // wait till data is ready for the right panel before building the ng-grid options
            scope.$watch("rightItems", function() {

                //$log.debug("rightItems = " + angular.toJson(scope.rightItems));

                if (scope.rightItems !== undefined) {
                    rightGridOptions = {
                        columnDefs: scope.cols,
                        data: 'rightItems',
                        selectedItems: scope.rightSelectedItems,
                        afterSelectionChange: function (row, event) {
                            $log.debug("rightGridOptions selectedItems length = " + scope.rightSelectedItems.length);
                            
                        }
                    };

                    angular.extend(scope.rightGroupListOptions, customOptions);
                    angular.extend(scope.rightGroupListOptions, rightGridOptions);

                    scope.dataReady["rightGroupListOptionsReady"] = true;

                    // $log.debug("scope.rightGroupListOptions = " + angular.toJson(scope.rightGroupListOptions));

                }
            });


            // make sure both the ng-grid options for left and right panels are populated before compiling the template
            // and get the DOM ready
            scope.$watch("dataReady.leftGroupListOptionsReady+dataReady.rightGroupListOptionsReady", function () {

                if (scope.dataReady["leftGroupListOptionsReady"] && scope.dataReady["rightGroupListOptionsReady"]) {

                    var appendTemplate = $compile(template)(scope);
                    element.append(appendTemplate);
                    // $log.debug("dataReady called!");
                }
            });



            // Moving the selected items from left to right panel.
            // Check all the left item/s that have been selected. If selected push them to right and delete it from left panel
            scope.moveToRight = function() {

                if (scope.leftItems === undefined || scope.leftItems === null) {
                    scope.leftItems = [];
                };

                if (scope.rightItems === undefined || scope.rightItems === null) {
                    scope.righttItems = [];
                };

                // call the controller's function to remove a list of items
                var success = scope.deleteItems({itemsToBeRemoved: scope.leftSelectedItems});

                if (success || attrs.deleteItems === undefined) {
                    for (var i = 0; i < scope.leftSelectedItems.length; i++) {

                        for (var j = scope.leftItems.length - 1; j >= 0; j--) {

                            if (scope.leftSelectedItems[i] === scope.leftItems[j]) {
                                scope.rightItems.push(scope.leftItems[j]);
                                scope.leftItems.splice(j, 1);
                            }
                        }
                    }

                    scope.leftSelectedItems.splice(0, scope.leftSelectedItems.length);
                }
            };

                // Moving the selected items from right to left panel.
            // Check all the right item/s that have been selected. If selected push them to left and delete it from right panel
            scope.moveToLeft = function() {

                if (scope.leftItems === undefined || scope.leftItems === null) {
                    scope.leftItems = [];
                };

                if (scope.rightItems === undefined || scope.rightItems === null) {
                    scope.righttItems = [];
                };

                // call the controller's function to add a list of items
                var success = scope.addItems({itemsToBeAdded: scope.rightSelectedItems});

                if (success || attrs.addItems === undefined) {
                    for (var i = 0; i < scope.rightSelectedItems.length; i++) {

                        for (var j = scope.rightItems.length - 1; j >= 0; j--) {

                            if (scope.rightSelectedItems[i] === scope.rightItems[j]) {
                                scope.leftItems.push(scope.rightItems[j]);
                                scope.rightItems.splice(j, 1);
                            }
                        }
                    }

                    scope.rightSelectedItems.splice(0, scope.rightSelectedItems.length);
                }
            };
        }  
    }
	
})();

