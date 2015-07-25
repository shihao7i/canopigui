(function() {
    'use strict';
    
    angular.module('canopi.service')
           .factory('MessagesService', messagesService);

    messagesService.$inject = ['$log', 'HelperUtilService'];    

    function messagesService($log, HelperUtilService) {
        
        var messageList = [];
        
        var service = {
            addMessage: addMessage,
            getMessages: getMessages,
            removeMessage: removeMessage,
            clearMessages: clearMessages,
            checkMessgeList: checkMessgeList
        };
        
        return service;
        
        /////////

        function addMessage(message, type) {
            messageList.push(HelperUtilService.getMessageAndType(message, type));
	}
	
	function getMessages() {
            return messageList;
	}
	
	function removeMessage(index) {
            messageList.splice(index, 1);
                
	}
	
	function clearMessages() {
            messageList = [];
	}
        
        function checkMessgeList() {
            if(messageList.length === 1) {
                angular.element('.admin-app-container').css('margin-top', '100px');            
            }
        }
    }
    
})();
