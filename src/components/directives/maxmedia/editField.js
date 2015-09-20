/**
 * This directive uses the styles defined in att-gui.css created by MaxMedia 
 * 
 * This input field directive can support the following functions:
 * (1) validation function
 * (2) show message right below the input field with help-block style if the validation failed
 * (3) editable: true/false
 * (4) required attribute 
 * 
 * 
   [Examples of the directive usage in html]:
      
   If validation is not needed:   
      
   <div edit-field id="name" label="User Name" state="vm.isValid" placeholder="Please enter your name ..."></div>
   
        or 
        
   If validation is needed:  (Note: see the example of the scope function defined in the controller below)
        
   <div edit-field id="name" label="User Name" state="vm.isValid" validate="vm.validate(value)" placeholder="Please enter your name ..."></div>
   
       or
       
   For Readonly:
       
   <div edit-field id="name" label="User Name" state="vm.isValid" placeholder="Please enter your name ..." editable="vm.isEditable"></div>
    
   
     
   [Example of validate's alias function defined in the controller]:
   
       vm.validate = function(value)
       {
           if (value !== undefined && value !== null && value.length >= 6) {
                return {
                    success: true,
                    message: ""
                };
            }
            else {
                return {
                    success: false,
                    message: "Please enter at least 6 characters"
                };
            }
        };
     
 *  
 */

(function() {
  'use strict';

  angular.module('maxmedia.directive').directive('editField', editField);

  editField.$inject = ['$log'];

  function editField($log) {
    var directive = {
      restrict: 'EA',
      scope: {
        editable: '=?', // optional
        required: '=?', // optional
        isValid: '=state',
        validate: '&?', // optional - this is used to invoke contoller's validate's alias function
        placeholder: '@?', // optional
        id: '@?', // optional
        label: '@?' // optional
      },
      template:
        '<div class="form-group col-lg-4 col-md-4 col-sm-12" ng-class="{\'has-error\': !vm.isValid}">' +
        '<label for="{{vm.id}}" class="control-label">{{vm.label}}:</label>' +
        '<input name="{{vm.id}}" type="text" ng-mouseleave="vm.validateMe($event)" ng-disabled="!vm.editable" class="form-control" placeholder="{{vm.placeholder}}" {{vm.required}}>' +
        '<span class="help-block" ng-show="!vm.isValid">{{vm.message}}</span>' +
        '</div>',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    ////
  }

  controller.$inject = ['$scope', '$log', '$attrs'];

  function controller($scope, $log, $attrs) {
    var vm = this;

    if (vm.isValid === undefined) {
      vm.isValid = true;
    }

    if (vm.editable === undefined) {
      vm.editable = true;
    }

    // check if required attribute is set on the DOM element
    vm.required = $attrs.hasOwnProperty('required')
      ? 'required="required"'
      : '';

    // watch the return object after the controller's validate's alias function returns
    $scope.$watch(
      function() {
        return vm.retObj;
      },
      function(obj) {
        //$log.debug('inside $watch => ' + angular.toJson(obj));

        if (obj !== undefined) {
          vm.isValid = obj.success; // if this is false, the message will be shown right below the input field
          vm.message = obj.message; // this is the helper message set in contoller's vaidate's alias function
        }
      }
    );

    // this function is invoked when mouseleave event is triggered
    // this will then invoke contoller's validate's alias function
    vm.validateMe = function(e) {
      var elem = angular.element(e.currentTarget);

      //$log.debug("elem.val() => " + elem.val());

      // the parameter needs to be passed in object literal form
      vm.retObj = vm.validate({ value: elem.val() });
    };
  }
})();
