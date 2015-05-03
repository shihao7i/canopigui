angular.module('canopi.app').controller('ModalController', ['$scope', 'close',
                                                     function ($scope, close) {

	'use strict';

	init();


	function init() {

		setupScopeValuesAndMethods();

	}


	function setupScopeValuesAndMethods(){

	}

	$scope.close = function() {
		
		close();
	};


}]);