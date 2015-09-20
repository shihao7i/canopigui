(function() {
  'use strict';

  angular
    .module('canopi.directive')
    .directive(
      'uiGridSelectionRowHeaderButtonsCanopi',
      uiGridSelectionRowHeaderButtonsCanopi
    );

  uiGridSelectionRowHeaderButtonsCanopi.$inject = [
    '$templateCache',
    'uiGridSelectionService',
    'Dialog',
    '$log'
  ];

  function uiGridSelectionRowHeaderButtonsCanopi(
    $templateCache,
    uiGridSelectionService,
    Dialog,
    $log
  ) {
    var directive = {
      replace: true,
      restrict: 'E',
      template: $templateCache.get('ui-grid/selectionRowHeaderButtonsCanopi'),
      scope: true,
      require: '^uiGrid',
      link: link
    };

    return directive;

    ///////////

    function link(scope, element, attrs, uiGridCtrl) {
      var self = uiGridCtrl.grid;

      scope.exclusive = false;
      self.api.selection.on.rowSelectionChanged(scope, function(row) {
        scope.exclusive = !scope.exclusive;
      });

      scope.selectButtonClick = function(row, evt) {
        if (evt.shiftKey) {
          uiGridSelectionService.shiftSelect(
            self,
            row,
            evt,
            self.options.multiSelect
          );
        } else if (evt.ctrlKey || evt.metaKey) {
          uiGridSelectionService.toggleRowSelection(
            self,
            row,
            evt,
            self.options.multiSelect,
            self.options.noUnselect
          );
        } else {
          uiGridSelectionService.toggleRowSelection(
            self,
            row,
            evt,
            self.options.multiSelect && !self.options.modifierKeysToMultiSelect,
            self.options.noUnselect
          );
        }
      };

      scope.edit = function(row, event) {
        scope.isEditing = true;
        uiGridSelectionService.toggleRowSelection(
          self,
          row,
          event,
          self.options.multiSelect
        );
      };

      scope.remove = function(row, event) {
        Dialog.confirm('Are you sure you want to delete this item?').then(
          function() {
            //Remove the row, and fire an event so the controller knows to also update backend
            // Or just delegate the whole operation to controller
          }
        );
      };

      scope.save = function(row, event) {};

      scope.cancel = function(row, event) {
        scope.isEditing = false;
        uiGridSelectionService.toggleRowSelection(
          self,
          row,
          event,
          self.options.multiSelect && !self.options.modifierKeysToMultiSelect,
          self.options.noUnselect
        );
      };

      scope.setIntent = function(intent) {
        scope.intent = intent;
        $log.info(intent);
      };
    }
  }
})();
