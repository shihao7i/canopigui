'use strict';
angular
  .module('canopi.templates')
  // Overrides
  // support required column indicator (show * next to display name if columDef.required is set to ture for the required field)
  .value(
    'ui-grid/uiGridHeaderCell',
    '<div ng-class="{ \'sortable\': sortable }"><!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --><div class="ui-grid-cell-contents" col-index="renderIndex" title="TOOLTIP"><span>{{ col.displayName CUSTOM_FILTERS }}</span><span ng-if="col.colDef.required" style="color:white">&nbsp;&nbsp;*</span> <span ui-grid-visible="col.sort.direction" ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }">&nbsp;</span></div><div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}"><i class="ui-grid-icon-angle-down">&nbsp;</i></div><div ui-grid-filter></div></div>'
  )

  // Overrides
  .value(
    'ui-grid/selectionRowHeader',
    '<div class="ui-grid-disable-selection">' +
      '   <div class="text-center">' +
      '       <ui-grid-selection-row-header-buttons-canopi></ui-grid-selection-row-header-buttons-canopi>' +
      '   </div>' +
      '</div>'
  )

  // Custom
  .value(
    'ui-grid/selectionRowHeaderButtonsCanopi',
    '<div style="padding-top: 5px; height: 30px;">' +
      '   <div ng-if="isEditing" class="btn-group">' +
      '       <a class="btn btn-xs btn-primary" ng-click="save()">Save</a>' +
      '       <a class="btn btn-xs btn-warning" ng-click="cancel(row, $event)">Cancel</a>' +
      '   </div>' +
      '   <div ng-if="!isEditing">' +
      '       <button style="padding: 0px;" class="btn-link" ng-class="{disabled: exclusive}" ng-disabled="exclusive" tooltip="Copy" ng-click="copy(row, $event)"><i class="fa fa-fw fa-clipboard"></i></button>' +
      '       <button style="padding: 0px;" class="btn-link" ng-class="{disabled: exclusive}" ng-disabled="exclusive" tooltip="Edit" ng-click="edit(row, $event)"><i class="fa fa-fw fa-pencil-square-o"></i></button>' +
      '   </div>' +
      '</div>'
  )

  // (1) show external link icon on Task Queue, Task Duration and Task Escalation column headers
  // (2) navigate to Rule Administration screen by passing categoryType and woType params
  .value(
    'ui-grid/uiGridHeaderCellSpecial',
    '<div ng-class="{ \'sortable\': sortable }">' +
      "   <span ng-if=\"col.field == 'taskQueue' || col.field == 'taskDuration' || col.field == 'taskEscalation'\">&nbsp;&nbsp;{{col.displayName}}&nbsp;&nbsp;" +
      '       <a style="color: white" href="#/adminmain/ruleadmin/{{col.field}}/{{col.colDef.woType}}" target="_ruleadmin">' +
      '           <i class="fa fa-external-link"></i>' +
      '       </a>' +
      '   </span>' +
      '   <div class="ui-grid-cell-contents" col-index="renderIndex">' +
      '       <span>{{col.displayName CUSTOM_FILTERS}}</span>' +
      "       <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span>" +
      '   </div>' +
      '   <div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}">' +
      '       <i class="ui-grid-icon-angle-down">&nbsp;</i>' +
      '   </div>' +
      '   <div ng-if="filterable" class="ui-grid-filter-container" ng-repeat="colFilter in col.filters">' +
      '       <div ng-if="colFilter.type !== \'select\'">' +
      '           <input type="text" class="ui-grid-filter-input" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}">' +
      '           <div class="ui-grid-filter-button" ng-click="colFilter.term = null">' +
      '               <i class="ui-grid-icon-cancel" ng-show="!!colFilter.term">&nbsp;</i>' +
      "               <!-- use !! because angular interprets 'f' as false -->" +
      '           </div>' +
      '       </div>' +
      '   </div>' +
      '   <div ng-if="colFilter.type === \'select\'">' +
      '       <select class="ui-grid-filter-select" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" ng-options="option.value as option.label for option in colFilter.selectOptions"></select>' +
      '       <div class="ui-grid-filter-button-select" ng-click="colFilter.term = null">' +
      '           <i class="ui-grid-icon-cancel" ng-show="!!colFilter.term">&nbsp;</i>' +
      "           <!-- use !! because angular interprets 'f' as false -->" +
      '       </div>' +
      '   </div>' +
      '</div>'
  )

  // Input types
  .value(
    'ui-grid/dropdown',
    '<div>' +
      '   <form name="inputForm">' +
      '       <select ng-class="\'colt\' + col.uid" ng-init="MODEL_COL_FIELD = MODEL_COL_FIELD || editDropdownOptionsArray[0].title" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray | orderBy:\'title\'"></select>' +
      '   </form>' +
      '</div>'
  )

  .value(
    'ui-grid/input',
    '<div>' +
      '   <form name="inputForm">' +
      '       <div class="input-group has-success" style="width: 100%;">' +
      '           <span class="input-group-addon"><i class="fa fa-pencil"></i></span>' +
      '           <input uppercase type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor class="form-control" placeholder="{{col.displayName}}" ng-model="MODEL_COL_FIELD">' +
      '       </div>' +
      '   </form>' +
      '</div>'
  )

  .value(
    'ui-grid/hyperlink',
    '<div>' +
      '   <form name="inputForm">' +
      '       <div class="input-group has-success" style="width: 100%;">' +
      '           <span class="input-group-addon"><i class="fa fa-pencil"></i></span>' +
      '           <input type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor class="form-control" placeholder="{{col.displayName}}" ng-model="MODEL_COL_FIELD">' +
      '       </div>' +
      '   </form>' +
      '</div>'
  );

//    //Tooltip
//            .value('ui-grid/tooltip',
//    "   <div ng-if='COL_FIELD.length > 10' class='ui-grid-cell-contents' tooltip='{{COL_FIELD CUSTOM_FILTERS}}'>{{COL_FIELD CUSTOM_FILTERS}}</div>" +
//    "   <div ng-if='COL_FIELD.length <= 10' class='ui-grid-cell-contents'>{{COL_FIELD CUSTOM_FILTERS}}</div>")
//
//    //Hyperlink
//    .value('ui-grid/hyperlink',
//    '<div class='ui-grid-cell-contents'><a href='http://{{COL_FIELD}}'>{{COL_FIELD}}</a></div>');
