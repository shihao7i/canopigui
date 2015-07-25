/**
 * This directive has dependencies on jquery-ui.css and jquery-ui.js library.
 * It also uses the styles defined in att-gui.css created by MaxMedia - please make sure the jQuery code to
 * support Auto Fill Text Field is commented out in module.js before using this directive.
 *
 *
 [Example of the directive usage in html]:

 <div auto-fill-text-field ng-model="vm.selectedValue" name="autocomplete1" label="Autocomplete Field" source="vm.languageList"></div>

[Example uaage in the controller to watch for the selected value]

$scope.$watch(function() 
     { return vm.selectedValue;}, 
     function(newValue) {

         if (!!newValue) {
             $log.debug("newValue => " + newValue);    // this is to display the value selected in the dropdown
         }
 });

[Example of the model data set in the controller]:

 vm.languageList = [
     "ActionScript",
     "AppleScript",
     "Asp",
     "BASIC",
     "C",
     "C++",
     "Clojure",
     "COBOL",
     "ColdFusion",
     "Erlang",
     "Fortran",
     "Groovy",
     "Haskell",
     "Java",
     "JavaScript",
     "Lisp",
     "Perl",
     "PHP",
     "Python",
     "Ruby",
     "Scala",
     "Scheme"
 ];

 *
 */

(function() {
    'use strict';
    
    angular.module('maxmedia.directive')
           .directive('autoFillTextField', autoFillTextField);

    autoFillTextField.$inject = ['$log'];    

    function autoFillTextField($log) {
         var directive = {
            restrict: 'EA',
          //  require: 'ngModel',
            scope : {
                ngModel: "=",
		name: "@",
                label: "@",
                source: "=?"   // optional
            },
            template :  '<div class="form-group">' +
                        '   <label for="{{vm.name}}">{{vm.label}}:</label>' +
                        '   <input class="form-control" name="{{vm.name}}">' +
                        '</div>',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        };
	
        return directive;
        
        ////
    }
    
    controller.$inject = ['$log', '$scope', '$element'];  
    
    function controller($log, $scope, $element) {
   
        var vm = this;
        
        var inputField = $element.find('input');
        inputField.autocomplete({
            source: vm.source,
            focus:function (event, ui) {
                inputField.val(ui.item.label);
                //$log.debug("focus => ui.item.label = " + ui.item.label);
                return false;
            },
            select:function (event, ui) {

                //$log.debug("select => ui.item.value = " + ui.item.value);
                vm.ngModel = ui.item.value;
                $scope.$apply();

                return false;
            },
            change:function (event, ui) {
                if (ui.item === null || ui.item === undefined) {
                    //$log.debug("change => ui.item.value = " + ui.item.value);
                    vm.ngModel = null;
                    $scope.$apply();
                }
            }
        });
    }
        
})();

