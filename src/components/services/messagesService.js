angular.module('canopi.service').service('MessagesService', ['$log', 'HelperUtilService', function ($log, HelperUtilService) {
	
	'use strict';
	
	var messageList = [];

    this.addMessage = function (message, type) {

        messageList.push(HelperUtilService.getMessageAndType(message, type));

	};
	
	this.getMessages = function () {
		return messageList;
	};
	
	this.removeMessage = function (index) {
		messageList.splice(index, 1);
	};
	
	this.clearMessages = function () {
		messageList = [];
	};

}]);
