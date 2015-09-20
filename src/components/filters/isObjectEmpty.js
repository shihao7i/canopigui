(function() {
  'use strict';

  angular.module('canopi.filter').filter('isObjectEmpty', isObjectEmptyFilter);

  function isObjectEmptyFilter() {
    return function(obj) {
      return _.isEmpty(obj);
    };
  }
})();
