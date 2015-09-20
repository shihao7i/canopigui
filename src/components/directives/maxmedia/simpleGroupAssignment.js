/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support Group Assignment is commented out in module.js before using this directive.
 * 
 * This directive supports the Group Assignment by moving items from left to right panel and vice versa
 * 
 * 
   [Examples of the directive usage in html]:

   <div simple-group-assignment ng-model="vm.listGroup"></div>

        or

   <div simple-group-assignment ng-model="vm.listGroup" leftboxtitle="User Group List" rightboxtitle="Group List" add-items="vm.addItems(itemsToBeAdded)" delete-items="vm.deleteItems(itemsToBeRemoved)"></div>


   [Example of the model data set in the controller]:

    // For Group Assignment
    vm.listGroup = {
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

(function() {
  'use strict';

  angular
    .module('maxmedia.directive')
    .directive('simpleGroupAssignment', simpleGroupAssignment);

  simpleGroupAssignment.$inject = ['$log'];

  function simpleGroupAssignment($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        leftboxtitle: '@?', // optional
        rightboxtitle: '@?', // optional
        listGroup: '=ngModel',
        addItems: '&?', // optional
        deleteItems: '&?' // optional
      },
      template:
        '<div class="row">' +
        '  <div class="col-xs-4">' +
        '     <label></laebl><strong>{{vm.leftboxtitle}}</strong></label>' +
        '     <div class="list-selection" role="menu" ng-repeat="item in vm.listGroup.leftItems track by item.id">' +
        '        <label for="{{item.value}}" ng-class="{active: item.selected}" ng-click="vm.toggle(item)">' +
        '          <input type="checkbox" name="{item.value}}" value="{{item.value}}">{{item.value}}' +
        '        </label>' +
        '     </div>' +
        '  </div>' +
        '  <div class="col-xs-1">' +
        '     <div class="group-assignment-nav">' +
        '         <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="vm.listGroup.leftItems.length == 0" ng-click="vm.moveToRight()"><span class="icon-ICON_CHEVRON_RIGHT"></span></a>' +
        '         <a role="button" class="btn btn-gray group-assignment-nav-button" ng-disabled="vm.listGroup.rightItems.length == 0" ng-click="vm.moveToLeft()"><span class="icon-ICON_CHEVRON_LEFT"></span></a>' +
        '    </div>' +
        '  </div>' +
        '  <div class="col-xs-4">' +
        '     <label><strong>{{vm.rightboxtitle}}</strong></label>' +
        '     <div class="list-selection" role="menu" ng-model="vm.rightlist" ng-repeat="item in vm.listGroup.rightItems track by item.id">' +
        '        <label for="{{item.value}}"  ng-class="{active: item.selected}" ng-click="vm.toggle(item)">' +
        '          <input type="checkbox" name="{{item.value}}" value="{{item.value}}">{{item.value}}' +
        '        </label>' +
        '     </div>' +
        '  </div>' +
        '</div>',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    ////
  }

  controller.$inject = ['$log', '$attrs'];

  function controller($log, $attrs) {
    var vm = this;

    // Moving the selected items from left to right panel.
    // Check all the left item/s that have been selected. If selected push them to right and delete it from left panel
    vm.moveToRight = function() {
      vm.leftSelectedItems = [];

      var i;

      var success = true;

      for (i = vm.listGroup.leftItems.length - 1; i >= 0; i--) {
        if (vm.listGroup.leftItems[i].selected === true) {
          vm.leftSelectedItems.push(vm.listGroup.leftItems[i]);
        }
      }

      // call the controller's function to remove a list of items
      if ($attrs.deleteItems !== undefined) {
        success = vm.deleteItems({ itemsToBeRemoved: vm.leftSelectedItems });
      }

      // only move the items when the successful restful call is made in the controller
      if (success || $attrs.deleteItems === undefined) {
        for (i = vm.listGroup.leftItems.length - 1; i >= 0; i--) {
          if (vm.listGroup.leftItems[i].selected === true) {
            vm.listGroup.rightItems.push(vm.listGroup.leftItems[i]);
            vm.listGroup.leftItems[i].selected = false;
            vm.listGroup.leftItems.splice(i, 1);
          }
        }
      }
    };

    // Moving the selected items from right to left panel.
    // Check all the right item/s that have been selected. If selected push them to left and delete it from right panel
    vm.moveToLeft = function() {
      vm.rightSelectedItems = [];

      var i;

      var success = true;

      for (i = vm.listGroup.rightItems.length - 1; i >= 0; i--) {
        if (vm.listGroup.rightItems[i].selected === true) {
          vm.rightSelectedItems.push(vm.listGroup.rightItems[i]);
        }
      }

      if ($attrs.addItems !== undefined) {
        success = vm.addItems({ itemsToBeAdded: vm.rightSelectedItems });
      }
      // call the controller's function to add a list of items
      // var success = vm.addItems({itemsToBeAdded: vm.rightSelectedItems});

      // only move the items when the successful restful call is made in the controller
      if (success || $attrs.addItems === undefined) {
        for (i = vm.listGroup.rightItems.length - 1; i >= 0; i--) {
          if (vm.listGroup.rightItems[i].selected === true) {
            vm.listGroup.leftItems.push(vm.listGroup.rightItems[i]);
            vm.listGroup.rightItems[i].selected = false;
            vm.listGroup.rightItems.splice(i, 1);
          }
        }
      }
    };

    // Everytime a user selects or de-selects an item, toggle the selected flag.
    vm.toggle = function(item) {
      item.selected = !item.selected;
    };
  }
})();
