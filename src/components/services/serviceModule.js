(function() {
    'use strict';
    
    angular.module('canopi.service',['canopi.constants'])
           .config(config);

    config.$inject = ['$httpProvider'];  
 
    function config($httpProvider) {
        $httpProvider.interceptors.push('HttpInterceptorService');

        // Angular 1.3 feature - $appyAsync for better performance (deferring the resolution of  multiple $http calls to the next digest cycle
        // http://blog.thoughtram.io/angularjs/2015/01/14/exploring-angular-1.3-speed-up-with-applyAsync.html

        $httpProvider.useApplyAsync(true);
    }
    
})();

