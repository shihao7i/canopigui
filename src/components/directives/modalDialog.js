(function() {
    'use strict';

    angular.module('canopi.directive')
           .directive('modalDialog', modalDialog);
 

    function modalDialog() {
        var directive = {
            restrict: 'EA',
            scope: {
                dialogId: "=",
                titleId: "=",
                bodyId: "=",
                title: "@",
                message:"@",
                buttonLabel: "@"
            },
            template : '<div class="modal fade" id="{{dialogId}}" draggable tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
		'<div class="modal-dialog">' +
		'<div class="modal-content">' + 
		'<div class="modal-header" style="height: 45px;">' +
		'<button type="button" class="close modal-button-close" data-dismiss="modal" aria-hidden="true"><span class="icon-ICON_X_CLOSEWINDOW"></span></button>' +
		'<h4 class="modal-title" id="{{titleId}}">{{title}}</h4>' +
		'</div>' +
		'<div id="{{bodyId}}" class="modal-body"><p>{{message}}</p></div>' +
		'<div class="modal-footer">' +
		'<button type="button" class="btn btn-blue" data-dismiss="modal">{{buttonLabel}}</button>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>',
            link: link
        };
	
	return directive;
        
        ////
        
        function link(scope, element, attrs) {
            scope.dialogId = attrs.dialogId;
            scope.titleId = attrs.titleId;
            scope.bodyId = attrs.bodyId;
        }     
    }
	
})();

