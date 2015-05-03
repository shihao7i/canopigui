/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support Group Assignment is commented out in module.js before using this directive.
 * 
 * This directive supports the Group Assignment by moving items from left to right panel and vice versa
 * 
 * 
   [Examples of the directive usage in html]:

   <div simple-group-assignment ng-model="listGroup"></div>

        or

   <div simple-group-assignment ng-model="listGroup" leftboxtitle="User Group List" rightboxtitle="Group List" add-items="addItems(itemsToBeAdded)" delete-items="deleteItems(itemsToBeRemoved)"></div>


   [Example of the model data set in the controller]:

    // For Group Assignment
$scope.listGroup = {
      leftItems:  [ { id: 'left1', value: 'IDIS_ADMIN_GROUP'},
                    { id: 'left2', value: 'LPS_IDIS'},
                    { id: 'left3', value: 'MOBILITY'},
                    { id: 'left4', value: 'SUPER_GROUP_ADMIN'},
                    { id: 'left5', value: 'SUPER_USER_ADMIN'}  ],

      rightItems: [ { id: 'right1', value: 'CANOPI_RETAIL_GROUP'},
                    { id: 'right2', value: 'IDIS_SUPPORT_GROUP'},
                    { id: 'right3', value: 'LNS OOR'},
                    { id: 'right4', value: 'MEI_GROUP'},
                    { id: 'right5', value: 'SERVICE_ASSURANCE_GROUP'},
                    { id: 'right6', value: 'MIC_VENDOR'},
                    { id: 'right7', value: 'TELCO_ACNA_GROUP'},
                    { id: 'right8', value: 'TELCO_ACNA_GROUP_ATX'},
                    { id: 'right9', value: 'MOBILITY_SUPPORT_GROUP'}]
};
     
 *  
 */


angular.module('maxmedia.directive').directive('simpleGroupAssignment', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',	
		scope: {
            leftboxtitle: '@?',   // optional
            rightboxtitle: '@?',  // optional
            listGroup: "=ngModel",
            addItems: "&?",       // optional
            deleteItems: "&?"     // optional
		},
	
        template:  '<div class="row">' +
                   '  <div class="col-xs-4">' +
                   '     <label></laebl><strong>{{leftboxtitle}}</strong></label>' +
                   '     <div class="list-selection" role="menu" ng-repeat="item in listGroup.leftItems track by item.id">' +
                   '        <label for="{{item.value}}" ng-class="{active: item.selected}" ng-click="toggle(item)">' +
                   '          <input type="checkbox" name="{item.value}}" value="{{item.value}}">{{item.value}}' +
                   '        </label>' +
                   '     </div>' +
                   '  </div>' +
                   '  <div class="col-xs-1">' +
                   '     <div class="group-assignment-nav">' +
                   '         <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="listGroup.leftItems.length == 0" ng-click="moveToRight()"><span class="icon-ICON_CHEVRON_RIGHT"></span></a>' +
                   '         <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="listGroup.rightItems.length == 0" ng-click="moveToLeft()"><span class="icon-ICON_CHEVRON_LEFT"></span></a>' +
                   '    </div>' +
                   '  </div>' +
                   '  <div class="col-xs-4">' +
                   '     <label><strong>{{rightboxtitle}}</strong></label>' +
                   '     <div class="list-selection" role="menu" ng-model="rightlist" ng-repeat="item in listGroup.rightItems track by item.id">' +
                   '        <label for="{{item.value}}"  ng-class="{active: item.selected}" ng-click="toggle(item)">' +
                   '          <input type="checkbox" name="{{item.value}}" value="{{item.value}}">{{item.value}}' +
                   '        </label>' +
                   '     </div>' +
                   '  </div>' +                   
                   '</div>',
                                  
                           
	    link: function (scope, element, attrs) {

            // Moving the selected items from left to right panel.
            // Check all the left item/s that have been selected. If selected push them to right and delete it from left panel
            scope.moveToRight = function() {

                scope.leftSelectedItems = [];

                var i;

                for(i = scope.listGroup.leftItems.length -1; i >= 0 ; i--) {
                    if(scope.listGroup.leftItems[i].selected == true){
                        scope.leftSelectedItems.push(scope.listGroup.leftItems[i]);
                    }
                }

                // call the controller's function to remove a list of items
                var success = scope.deleteItems({itemsToBeRemoved: scope.leftSelectedItems});

                // only move the items when the successful restful call is made in the controller
                if (success || attrs.deleteItems === undefined) {
                    for (i = scope.listGroup.leftItems.length - 1; i >= 0; i--) {
                        if (scope.listGroup.leftItems[i].selected == true) {
                            scope.listGroup.rightItems.push(scope.listGroup.leftItems[i]);
                            scope.listGroup.leftItems[i].selected = false;
                            scope.listGroup.leftItems.splice(i, 1);
                        }
                    }
                }

           };

            // Moving the selected items from right to left panel.
            // Check all the right item/s that have been selected. If selected push them to left and delete it from right panel
            scope.moveToLeft = function() {

                scope.rightSelectedItems = [];

                var i;

                for(i = scope.listGroup.rightItems.length -1; i >= 0 ; i--){
                    if(scope.listGroup.rightItems[i].selected == true) {
                        scope.rightSelectedItems.push(scope.listGroup.rightItems[i]);
                    }
                }

                // call the controller's function to add a list of items
                var success = scope.addItems({itemsToBeAdded: scope.rightSelectedItems});

                // only move the items when the successful restful call is made in the controller
                if (success || attrs.addItems === undefined) {
                    for (i = scope.listGroup.rightItems.length - 1; i >= 0; i--) {
                        if (scope.listGroup.rightItems[i].selected == true) {
                            scope.listGroup.leftItems.push(scope.listGroup.rightItems[i]);
                            scope.listGroup.rightItems[i].selected = false;
                            scope.listGroup.rightItems.splice(i, 1);
                        }
                    }
                }
           };

            // Everytime a user selects or de-selects an item, toggle the selected flag. 
            scope.toggle = function (item) {
                item.selected = !item.selected;
            };
            

        }
	};
}]);

