(function() {
  'use strict';

  angular.module('canopi.service').factory('Dialog', dialogService);

  dialogService.$inject = ['$modal'];

  function dialogService($modal) {
    return {
      confirm: function(message, fromState, nextState) {
        return $modal.open({
          templateUrl: 'components/services/dialog/dialog.tmpl.html',
          controller: dialogController,
          controllerAs: 'dialog',
          resolve: {
            message: function() {
              return message;
            },
            nextState: function() {
              return nextState;
            },
            fromState: function() {
              return fromState;
            }
          }
        }).result;
      }
    };
  }

  dialogController.$inject = [
    'message',
    'nextState',
    '$state',
    'TransitionData'
  ];

  function dialogController(message, nextState, $state, TransitionData) {
    var vm = this;
    vm.message = message;

    vm.continueNextState = function() {
      TransitionData.setDirtyRows('no');
      if (!_.isEmpty(nextState)) $state.transitionTo(nextState.name);
    };

    vm.cancelNextState = function() {
      TransitionData.setDirtyRows('yes');
      TransitionData.setNumberOfModalsDisplayed(0);
    };
  }
})();
