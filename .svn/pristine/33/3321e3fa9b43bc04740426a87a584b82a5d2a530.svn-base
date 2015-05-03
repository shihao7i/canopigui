'use strict';

/**
 * @namespace: GlobalOptions
 * @desc Default global component options
 * @memberOf Services
 */
function GlobalOptions(uiGridConstants) {
    var components = {
        'ui-grid': {
            enableSelectAll: false,
            enableHorizontalScrollbar: uiGridConstants.NEVER,
            enableColumnMenus: false,
            enableGridMenu: true,
            multiSelect: false,
            exporterCsvFilename: vm.lookupType.value + '.csv',
            exporterMenuPdf: false,
            exporterMenuCsv: false
        }
    };

    return {
        /**
         * @desc Get the global options for a particular componnent
         * @param component {String} The component options to retrieve
         * @returns {Object} Object of options
         * @example
         * // Get the options for a component
         * GlobalOptions.get('ui-grid')
         * @memberOf Services.GlobalOptions
         */
        get: function (component) {
            return components[component];
        }
    }
}

/**
 * GlobalOptions Service
 * @namespace Services
 */
//angular.module('admin.service').factory('GlobalOptions', ['uiGridConstants', uiGridConstants]);