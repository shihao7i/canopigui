angular.module('canopi.app').controller('AboutController', ['$scope', '$log', 'CommonUtilJsonService', function ($scope, $log, CommonUtilJsonService) {
	'use strict';
	
    init();
 
    
    function init() {

       getServerInfo();
   
    }  
    
    function getServerInfo() {
 
        var promise = CommonUtilJsonService.getServerInfo();

 	    promise.then(function(data) {
 			
             $scope.serverTimeStamp = data.serverTimeStamp;
             $scope.serverVersion = data.serverVersion;
             $scope.currentDate = data.currentDate;
             
       
        });
    };
  
      
}]);
