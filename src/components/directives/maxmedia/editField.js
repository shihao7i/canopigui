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
      
   <div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..."></div>
   
        or 
        
   If validation is needed:  (Note: see the example of the scope function defined in the controller below)
        
   <div edit-field id="name" label="User Name" state="isValid" validate="validateName(value)" placeholder="Please enter your name ..."></div>
   
       or
       
   For Readonly:
       
   <div edit-field id="name" label="User Name" state="isValid" placeholder="Please enter your name ..." editable="false"></div>
    
   
     
   [Example of validate's alias function defined in the controller]:
   
       $scope.validateName = function(value)
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


angular.module('maxmedia.directive').directive('editField', ['$log', function($log) {
	'use strict';
	
	return {
		restrict : 'EA',	
		scope: {
			ngModel: '=?',     // optional
			editable: "=?",    // optional
                        isValid : "=state",
			validate: "&?"     // optional - this is used to invoke contoller's validate's alias function
		},
		
		template:  '<div class="form-group col-lg-4 col-md-4 col-sm-12" ng-class="{\'has-error\': !isValid}">' +
                   '<label for="{{id}}" class="control-label">{{label}}:</label>' +
                   '<input name="{{id}}" type="text" ng-model="ngModel" ng-mouseleave="validateMe($event)" ng-disabled="!editable" class="form-control" placeholder="{{placeholder}}" {{required}}>' +
                   '<span class="help-block" ng-show="!isValid">{{message}}</span>' +
                   '</div>',

	    link: function (scope, element, attrs) {
	    	
	    	scope.placeholder = attrs.placeholder;
	    	scope.id = attrs.label;
	    	scope.label = attrs.label;
	    	if (scope.isValid === undefined) {
	            scope.isValid = true;
	    	}
	    	
	    	if (scope.editable === undefined) {
	            scope.editable = true;
	    	}
	    		
	    	//$log.debug("isValid = " + scope.isValid);
	    	//$log.debug("editable = " + scope.editable);
	    
	    	// check if required attribute is set on the DOM element
	    	scope.required = attrs.hasOwnProperty('required') ? 'required="required"' : '';
	   
	    	// watch the return object after the controller's validate's alias function returns
	    	scope.$watch("retObj", function(obj) {
	    		
	    		//$log.debug('inside $watch => ' + angular.toJson(obj));
	    		
	    		if (obj !== undefined) {

        			scope.isValid = obj.success;  // if this is false, the message will be shown right below the input field
	    			scope.message = obj.message;  // this is the helper message set in contoller's vaidate's alias function
	    		}
	    		
	    	});
	    
	    	
	    	// this function is invoked when mouseleave event is triggered 
	    	// this will then invoke contoller's validate's alias function
	    	scope.validateMe = function(e) {
	    		
	    		var elem = angular.element(e.currentTarget);
	    	
	    		// the parameter needs to be passed in object literal form 
	    		scope.retObj = scope.validate({value: elem.val()});
	    	
	    	};

		}
	};
}]);

