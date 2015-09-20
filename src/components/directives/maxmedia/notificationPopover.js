/**
 * This directive has dependencies on bootstrap.css and bootstrap.js library.
 * It also uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support Popover is commented out in module.js before using this directive.
 *
 *
 [Example of the directive usage in html]:

 <div notification-popover notification-text="Right Notification Popover" title="System Messages" placement="right" message-list="vm.messageList"></div>

 Note: the valid placement values are: top, bottom, left, right

 [Example of the model data set in the controller]:

 vm.messageList = [
     "Message 1",
     "Message 2",
     "Message 3",
     "Message 4"
 ];

 *
 */

(function() {
  'use strict';

  angular
    .module('maxmedia.directive')
    .directive('notificationPopover', notificationPopover);

  notificationPopover.$inject = ['$log'];

  function notificationPopover($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        ngModel: '=?', // optional
        notificationText: '@',
        title: '@',
        placement: '@', // top, bottom, left, right
        messageList: '='
      },
      template:
        '<p>{{vm.notificationText}}' +
        '   <span class="global-popover-{{vm.placement}}" data-container="body" ' +
        '         data-toggle="popover" data-placement="{{vm.placement}}"' +
        '         data-original-title="{{vm.title}}" ' +
        '         data-content="{{vm.content}}">' +
        '      <span class="icon-ICON_USER" ng-click="vm.popover()"></span>' +
        '   </span>' +
        '</p>',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    ////
  }

  function controller() {
    var vm = this;
    var content = '',
      index = 0,
      length = vm.messageList.length;

    angular.forEach(vm.messageList, function(message) {
      if (index !== 0 && index !== length) {
        content += '<hr>';
      }

      content += '<p>' + message + '</p>';
      ++index;
    });

    vm.content = content;

    vm.popover = function() {
      angular.element('.global-popover-' + vm.placement).popover({
        html: true
      });
    };
  }
})();

/////////////////////////////
