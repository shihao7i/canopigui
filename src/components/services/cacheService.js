(function() {
  'use strict';

  angular.module('canopi.service').factory('Cache', cacheService);

  cacheService.$inject = ['$cacheFactory'];

  function cacheService($cacheFactory) {
    var cache = $cacheFactory('myCache');

    return cache;
  }
})();
