'use strict';

angular.module('canopi.filter')
    .filter('debug', function () {
        return function (obj) {
            console.log(obj);
        };
    });
