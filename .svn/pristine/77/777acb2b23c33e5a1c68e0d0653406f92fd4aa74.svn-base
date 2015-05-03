'use strict';

function Dialog($modal) {
    return {
        confirm: function (message) {
            return $modal.open({
                templateUrl: 'components/services/dialog/dialog.tmpl.html',
                controller: ['message', function(message){
                    this.message = message;
                }],
                controllerAs: "dialog",
                resolve: {
                    message: function(){
                        return message;
                    }
                }
            }).result;
        }
    };
}

angular.module('canopi.service').factory('Dialog', ['$modal', Dialog]);