(function() {
  'use strict';

  /**
   * ModalRowEdit Service
   * @namespace Services
   */
  angular.module('admin.service').factory('ModalRowEdit', modalRowEditService);

  modalRowEditService.$inject = ['$modal'];

  /**
   * @namespace ModalRowEdit
   * @desc Generic modal window for editing/adding rows in a table
   * @memberOf Services
   */
  function modalRowEditService($modal) {
    return {
      /**
       * @param columnDefs {Array} Column definitions for configuring form elements
       * @param data {Object} Data to bind fields to. If not set, its assumed that this is a new item
       * @param config {Object}Configuration parameters for the $modal service. These parameters are merged with predefined default parameters
       * @returns {Promise} modalInstance.result
       * @example
       * // Add Item
       * ModalRowEdit.open(columnDefs).then(function(newItem)){
       * // Do something with newItem
       * }
       * @example
       * // Edit item
       * ModalRowEdit.open(columnDefs, selectedItem).then(function(updatedItem){
       * // Save the updated item
       * });
       * @memberOf Services.ModalRowEdit
       */
      open: function(columnDefs, data, config) {
        var defaults = {
          templateUrl: 'components/services/admin-app/modalRowEdit/modal.html',
          controller: 'ModalRowEditServiceController as modal',
          resolve: {
            data: _.isUndefined(data)
              ? function() {
                  return null;
                }
              : function() {
                  return data;
                },
            columnDefs: function() {
              return columnDefs;
            }
          }
        };

        // Merge options
        var options = angular.extend(defaults, config);

        return $modal.open(options).result;
      }
    };
  }
})();
