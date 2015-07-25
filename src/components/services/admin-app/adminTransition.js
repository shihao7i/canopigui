(function() {
    'use strict';
    
    angular.module('admin.service')
           .factory('TransitionData', transitionDataService);
	
    function transitionDataService() {
        
        var modals = {
            moreThanOneDisplay: 0
        };

        var dirtyRows = {
            exist: "no"
        };

        return {
            getNumberOfModalsDisplayed: function () {
                return modals.moreThanOneDisplay;
            },
            setNumberOfModalsDisplayed: function (moreThanOneDisplay) {
                modals.moreThanOneDisplay = moreThanOneDisplay;
            },
            getDirtyRows: function () {
                return dirtyRows.exist;
            },
            setDirtyRows: function (dirtyRowsExist) {
                dirtyRows.exist = dirtyRowsExist;
            }
        };
    }
    
})();

