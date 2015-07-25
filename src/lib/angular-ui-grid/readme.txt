Note: Changes applied to the following ui-grid version:  (Please update the line numbers for the changes after 
updating ui-grid file to a newer version)

============================================================ 
Current Version: ui-grid - v3.0.1 - 2015-07-17
============================================================


(1) post link function inside uiGridRenderContainer directive:
===============================================================
line 13955 - for IE scrolling issue - if condition was added to make sure we retain the current focus behavior in chrome and mozilla but disable it for IE since
the scrollbar would go to the center of the table when focusing on a cell
if(gridUtil.detectBrowser() === 'chrome' || gridUtil.detectBrowser() === 'mozilla') {
                    $elm.append(focuser);
}

(2) inside ui-grid/selectionRowHeaderButtons templateCache:
=============================================================
line 25823 - for IE scrolling issue - the element was changed from <div></div> to <button></button> due to the clicking event not working properly on first click in IE
$templateCache.put('ui-grid/selectionRowHeaderButtons',
  "<button class=\"ui-grid-selection-row-header-buttons ui-grid-icon-ok\" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" ng-click=\"selectButtonClick(row, $event)\">&nbsp;</button>"
);
