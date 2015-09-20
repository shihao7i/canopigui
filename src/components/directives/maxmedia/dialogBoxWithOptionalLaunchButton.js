/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia.
 *
 [Examples of the directive usage in html]:

 Notes: (1) The following is an example of the use of button to launch a modal dialog  (the value specified in data-target attribute
            must match the value specified in dialog-id attribute of the directive.
        (2) When actionButtonClicked() function is invoked, callback function will be called to perform the needed operation in the controller

 Usage #1: (directive only shows the Dialog Box - the launch button is created outside the directive)
 ---------
 <button class="btn btn-blue" data-toggle="modal" data-target="#myModal">
 Launch Modal
 </button>

 <div dialog-box-with-optional-launch-button dialog-id="myModal" title="Label Name" content="vm.dialogContent" action-button-label="Save" callback="vm.save()"></div>

 Usage #2: (this directive supports the display for both Push Button and Dialog Box)
 ---------

 <div dialog-box-with-optional-launch-button launch-button-label="Launch Model 2" dialog-id="myModal1" title="Label Name" content="vm.dialogContent" action-button-label="Save" callback="vm.save()"></div>


 [Example of the model data set in the controller]:

    vm.dialogContent = "Lorem ipsum: dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

 *
 */

/**
<button class="btn btn-blue" data-toggle="modal" data-target="#myModal">
    Launch Modal
</button>
**/

(function() {
  'use strict';

  angular
    .module('maxmedia.directive')
    .directive(
      'dialogBoxWithOptionalLaunchButton',
      dialogBoxWithOptionalLaunchButton
    );

  dialogBoxWithOptionalLaunchButton.$inject = ['$log'];

  function dialogBoxWithOptionalLaunchButton($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        launchButtonLabel: '@?', // optional
        dialogId: '@',
        title: '@',
        content: '=',
        actionButtonLabel: '@',
        callback: '&'
      },
      template:
        '<div><button class="btn btn-blue" ng-show="vm.launchButtonLabel !== undefined" data-toggle="modal" data-target="#{{vm.dialogId}}">{{vm.launchButtonLabel}}</button>' +
        '   <div class="modal fade" id="{{vm.dialogId}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '      <div class="modal-dialog dialogbox">' +
        '         <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <button type="button" class="close modal-button-close" data-dismiss="modal" aria-hidden="true"><span class="icon-ICON_X_CLOSEWINDOW"></span></button>' +
        '                <h4 class="modal-title" id="myModalLabel">{{vm.title}}</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <strong>{{vm.content}}</strong>' +
        '            </div>' +
        '<div class="modal-footer">' +
        '                <button type="button" class="btn btn-black" data-dismiss="modal">Cancel</button>' +
        '                <button type="button" class="btn btn-orange" data-dismiss="modal" ng-click="vm.actionButtonClicked()">{{vm.actionButtonLabel}}</button>' +
        '             </div>' +
        '         </div>' +
        '       </div>' +
        '   </div>' +
        '</div>',

      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    ////
  }

  function controller() {
    var vm = this;

    vm.actionButtonClicked = function() {
      vm.callback();
    };
  }
})();
