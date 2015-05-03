/**
 * This directive has dependencies on bootstrap.css and bootstrap.js library.
 * It also uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support Popover is commented out in module.js before using this directive.
 *
 *
 [Example of the directive usage in html]:

 <div notification-popover notification-text="Right Notification Popover" title="System Messages" placement="right" message-list="messageList"></div>

 Note: the valid placement values are: top, bottom, left, right

 [Example of the model data set in the controller]:

 $scope.messageList = [
     "Message 1",
     "Message 2",
     "Message 3",
     "Message 4"
 ];

 *
 */


angular.module('maxmedia.directive').directive('notificationPopover', ['$log', '$compile', function($log, $compile) {
    'use strict';

    return {
        restrict : 'EA',
        scope : {
            ngModel: "=?",  // optional
            notificationText: "@",
            title: "@",
            placement: "@",  // top, bottom, left, right
            messageList: "="
        },

        link: function (scope, element, attrs) {

            var content = "",
                index = 0,
                length = scope.messageList.length;

            angular.forEach(scope.messageList, function(message) {
                if (index !== 0 && index !== length) {
                    content += "<hr>";
                }

                content += ("<p>" + message + "</p>");
                ++index;
            });

            var templateInfo =  '<p>{{notificationText}}' +
                                '   <span class="global-popover-{{placement}}" data-container="body" ' +
                                '         data-toggle="popover" data-placement="{{placement}}"' +
                                '         data-original-title="{{title}}" ' +
                                '         data-content="' + content + '">' +
                                '      <span class="icon-ICON_USER" ng-click="popover()"></span>' +
                                '   </span>' +
                                '</p>';

            var appendTemplate = $compile(templateInfo)(scope);
            element.append(appendTemplate);

            scope.popover = function() {
                angular.element(".global-popover-" + scope.placement).popover({
                     html: true
                });
            };
        }
    };
}]);
