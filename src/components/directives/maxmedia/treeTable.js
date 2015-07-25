/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support tree table is commented out in module.js before using this directive.
 * 
   [Example of the directive usage in html]:
   
   <div tree-table column-definition="vm.columnDefinition"></div>
   
   [Example of the model data that the directive expects in JSON format]:

        vm.columnDefinition = {
            tableRows: {
                rowMetadata:
                    { columnList:   [{hyperlink:false,	id:"cardName",	displayName:"Card Name"},
                                     {hyperlink:false,	id:"parentCardName", displayName:"Parent Card Name"},
                                     {hyperlink:false,	id:"port", displayName:"Port"},
                                     {hyperlink:false,	id:"portStatus", displayName:"Port Status"},
                                     {hyperlink:false,	id:"portRole", displayName:"Port Role"}] 
                    },
		    		
                rowValueList:     [{id: 0,
                                    cellValues:["AT_SFP_SM-A.1","SM2GE_SM-A","1","In Service",""],
                                        children: [{cellValues:["A.1.1 child","A.1.1 child","A.1.1","A.1.1","A.1.1"]},
                                                   {cellValues:["A.1.2 child","A.1.2 child","A.1.2","A.1.2","A.1.2"]} ]},

                                   {id: 1,
                                    cellValues:["AT_SFP_SM-A.2","SM2GE_SM-A","2","In Service",""],
                                        children: [{cellValues:["A.2.1 child","A.2.1 child","A.2.1","A.2.1","A.2.1"]},
                                                   {cellValues:["A.2.2 child","A.2.2 child","A.2.2","A.2.2","A.2.2"]} ]},

                                   {id: 2,
                                    cellValues:["AT_SFP_SM-B.1","SM2GE_SM-B","1","In Service",""],
                                        children: [] },

                                   {id: 3,
                                    cellValues:["AT_SFP_SM-B.2","SM2GE_SM-B","2","In Service",""],
                                        children: [{cellValues:["B.2.1 child","B.2.1 child","B.2.1","B.2.1","B.2.1"]}]}]

	        },
            errorStaus: "Success",
            errorMessage: "",
            errorCode: "0"
        };
          
 *  
 */

(function() {
    'use strict';
    
    angular.module('maxmedia.directive')
           .directive('treeTable', treeTable);

    treeTable.$inject = ['$log'];    

    function treeTable($log) {
         var directive = {
            restrict: 'EA',
            scope: {
                columnDefinition: "="
            },
            template:   '<div class="table-responsive" id="treeTable">' +
        	        '   <table class="table tree-table">' +
                        '       <thead class="table-head-gray">' +
                        '          <tr>' +
                        '              <th class="tree-table-nav-reset" ng-click="vm.treeTableNavResetClicked($event)">' +
                        '                   <span class="icon-ICON_EXPAND_ALL_wht"></span>' +
                        '              </th>' +
                        '              <th ng-repeat="column in ::vm.columnDefinition.rowMetadata.columnList">{{column.displayName}}</th>' +
                        '          </tr>' +
                        '      </thead>' +
                        '      <tbody ng-repeat="row in ::vm.columnDefinition.rowValueList track by row.id">' +
                        '          <tr>' +
                        '              <td id="tree-table-content-{{row.id}}" class="tree-table-nav" ng-click="vm.treeTableNavClicked($event)">' +
                        '                   <span class="icon-ICON_ARROW_NODE_RIGHT"></span>' +
                        '                   <span class="icon-ICON_ARROW_NODE_DOWN"></span>' +
                        '              </td>' +
                        '              <td ng-repeat="cell in row.cellValues">{{cell}}</td>' +
                        '          </tr>' +
                        '          <tr ng-repeat="childNode in row.children" class="tree-table-content tree-table-content-{{row.id}}" >' +
                        '              <td class="tree-table-nav-accent"><span></span></td>' +
                        '              <td ng-repeat="childCell in ::childNode.cellValues track by $index">{{childCell}}</td>' +
                        '          </tr>' +
                        '     </tbody>' +
                        '  </table>' +
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
        
        vm.treeTableNavClicked = function(e) {

            var elem = angular.element(e.currentTarget);

            var id = elem.attr('id');

            if(elem.hasClass('active')){
                    angular.element("."+id).removeClass('active').fadeOut(300, function(){
                    elem.removeClass('active');
                });
            } else {
                elem.addClass('active');
                angular.element("."+id).addClass('active').fadeIn(300);
                angular.element(".tree-table-nav-reset").removeClass('active');
            }

        };


        vm.treeTableNavResetClicked = function(e) {

            var elem = angular.element(e.currentTarget);

            var ourTableId = '#' + elem.parent().parent().parent().parent().attr('id');

            if(elem.hasClass('active')){
                angular.element(ourTableId +' .tree-table-content').removeClass('active').fadeOut(300, function(){
                angular.element(ourTableId +' .tree-table-nav').removeClass('active');
            });
               elem.removeClass('active');
            } else {
                angular.element(ourTableId +' .tree-table-content').addClass('active').fadeIn(300);
                angular.element(ourTableId +' .tree-table-nav').addClass('active');
                elem.addClass('active');
            }
        };	
    }
   
})();

