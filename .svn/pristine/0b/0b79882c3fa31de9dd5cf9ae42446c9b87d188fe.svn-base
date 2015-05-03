'use strict';

describe('Testing MessagesService', function(){
    var _service;
    
    beforeEach(module('canopi.service')); 
    
    beforeEach(inject(function ($injector) {
        _service = $injector.get('MessagesService');
    }));

    it('should be able to get a list of messages', function() {
        expect(_service.getMessages().length).toBe(0);
    });

    it('should be able to add a new message', function() {
       _service.addMessage('test message', 'info');
        expect(_service.getMessages().length).toBe(1);
    });

    it('should be able to remove a message', function() {
        _service.addMessage('test message', 'info');
        _service.removeMessage(0);
        expect(_service.getMessages().length).toBe(0);
    });

    it('should be able to clear all messages', function() {
        _service.addMessage('test message 1', 'info');
        _service.addMessage('test message 2', 'info');

        _service.clearMessages();
        expect(_service.getMessages.length).toBe(0);
    });
});
