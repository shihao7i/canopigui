(function() {
  'use strict';

  angular.module('canopi.directive').directive('uppercase', uppercase);

  function uppercase() {
    var directive = {
      require: 'ngModel',
      restrict: 'A',
      link: link
    };

    return directive;

    ////

    function link(scope, element, attrs, modelCtrl) {
      var uppercase = function(inputValue) {
        if (inputValue === undefined) inputValue = '';
        var uppercased = inputValue.toUpperCase();
        if (uppercased !== inputValue) {
          modelCtrl.$setViewValue(uppercased);
          modelCtrl.$render();
        }
        return uppercased;
      };
      modelCtrl.$parsers.push(uppercase);
      uppercase(scope[attrs.ngModel]);
    }
  }
})();
