'use strict';

describe('Testing uamJsonService', function () {

    var _httpService, _httpBackend, _http, promise;
    var baseUrl = '/canopigui/rest/uam/';
    var successData = {};
    var responseData = {};
    var successCallback;
    var errorCallback;

    beforeEach(module('canopi.service'));


    //mock Application to allow us to inject our own dependencies
    beforeEach(inject(function ($injector, $http, $httpBackend) {
        _http = $http;
        _httpBackend = $httpBackend;
        _httpService = $injector.get('UamJsonService');
        successCallback = jasmine.createSpy('success');
        errorCallback = jasmine.createSpy('error');
        spyOn(_http, 'get').andCallThrough();
        responseData = {
            attUid: 'pb154j',
            firstName: 'PAUL',
            lastName: 'BERESUITA',
            email: 'pb154j@att.com',
            tn: '404-986-1111'
        };
        successData = {
            attUid: 'pb154j',
            firstName: 'PAUL',
            lastName: 'BERESUITA',
            email: 'pb154j@att.com',
            tn: '404-986-1111'
        };
    }));

    // makes sure all expected requests are made by the time the test ends
    afterEach(function () {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

    // tests start here
    // Testing the success getUser('pb154j'); function
    it('should make an ajax call to ' + baseUrl + 'user/get/', function () {
        _httpBackend.expectGET(baseUrl + 'user/get/vp881w').respond(200, successData);
        promise = _httpService.getUser('vp881w');
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(successCallback).toHaveBeenCalledWith(successData);
        expect(errorCallback).not.toHaveBeenCalled();
    });

    // Testing the success getAllUserNames(); function
    it('should make an ajax call to ' + baseUrl + 'allUserNames/get/', function () {
        _httpBackend.expectGET(baseUrl + 'allUserNames/get').respond(200, successData);
        promise = _httpService.getAllUserNames();
        promise.then(successCallback, errorCallback);
        _httpBackend.flush();
        expect(successCallback).toHaveBeenCalledWith(successData);
        expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should make an ajax call to ' + baseUrl + 'user/add', function () {
        _httpService.addUser({});

        _httpBackend.expectPOST(baseUrl + 'user/add').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to ' + baseUrl + 'user/delete', function () {
        _httpService.deleteUser({});

        _httpBackend.expectPOST(baseUrl + 'user/delete').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to ' + baseUrl + 'permissions/get/[workgroup]', function () {
        var workgroup = 'sample';
        _httpService.getPermissions(workgroup);

        _httpBackend.expectGET(baseUrl + 'permissions/get/' + workgroup).respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to ' + baseUrl + 'workGroup/add', function () {
        _httpService.addWorkGroup({});

        _httpBackend.expectPOST(baseUrl + 'workGroup/add').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'workGroups/get', function () {
        _httpService.listAllWorkGroups();

        _httpBackend.expectGET(baseUrl + 'workGroups/get').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissions/get', function () {
        _httpService.listAllPermissions();

        _httpBackend.expectGET(baseUrl + 'permissions/get').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'usersInWorkGroup/get[workgroup_id]', function () {
        var workgroup_id = 'sample';
        _httpService.getUsersInWorkGroup(workgroup_id);

        _httpBackend.expectGET(baseUrl + 'usersInWorkGroup/get/' + workgroup_id).respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'users/get', function () {
        _httpService.listAllUsers();

        _httpBackend.expectGET(baseUrl + 'users/get').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'userInfo/get/[attuid]', function () {
       var attuid = 'ei2074';
        _httpService.getUserFromWebPhone(attuid);

        _httpBackend.expectGET(baseUrl + 'userInfo/get/' + attuid).respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'workGroup/delete', function () {
        _httpService.removeWorkGroupFromUAM({});

        _httpBackend.expectPOST(baseUrl + 'workGroup/delete').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'groupMember/add', function () {
        _httpService.addMemberToGroupFromUAM({});

        _httpBackend.expectPOST(baseUrl + 'groupMember/add').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'groupMember/delete', function () {
        _httpService.removerMemberFromGroupFromUAM({});

        _httpBackend.expectPOST(baseUrl + 'groupMember/delete').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permission/add', function () {
        _httpService.addPermission({});

        _httpBackend.expectPOST(baseUrl + 'permission/add').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permission/delete', function () {
        _httpService.deletePermission({});

        _httpBackend.expectPOST(baseUrl + 'permission/delete').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'workGroup/update', function () {
        _httpService.updateWorkGroup({});

        _httpBackend.expectPOST(baseUrl + 'workGroup/update').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissionInGroup/add', function () {
        _httpService.addPermissionToGroup({});

        _httpBackend.expectPOST(baseUrl + 'permissionInGroup/add').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissionInGroup/delete', function () {
        _httpService.removePermissionFromGroup({});

        _httpBackend.expectPOST(baseUrl + 'permissionInGroup/delete').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissionsFromUser/get', function () {
        _httpService.getPermissionsFromUser({});

        _httpBackend.expectPOST(baseUrl + 'permissionsFromUser/get').respond(200, '');
        _httpBackend.flush();
    });

    it('should make an ajax call to ' + baseUrl + 'uamHistory/get', function () {
        _httpService.getUamHistory({});

        _httpBackend.expectPOST(baseUrl + 'uamHistory/get').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissions/get', function () {
        _httpService.getUserPermissions({});

        _httpBackend.expectPOST(baseUrl + 'permissions/get').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissionForUser/add', function () {
        _httpService.addPermissionToUser({});

        _httpBackend.expectPOST(baseUrl + 'permissionForUser/add').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'uamUsers/get/', function () {
        var permission_name = "sample";
        _httpService.getUserByPermissionName(permission_name);

        _httpBackend.expectGET(baseUrl + 'uamUsers/get/' + permission_name).respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'permissionForUser/delete', function () {
        _httpService.removePermissionFromUser({});

        _httpBackend.expectPOST(baseUrl + 'permissionForUser/delete').respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'acnaPermissions/add/[attuid]', function () {
        var attuid = 'ei2074';
        _httpService.addAcnaPermissions(attuid);

        _httpBackend.expectGET(baseUrl + 'acnaPermissions/add/' + attuid).respond(200, '');
        _httpBackend.flush();
    });
    
    it('should make an ajax call to ' + baseUrl + 'acnaPermissions/delete', function () {
        var attuid = 'ei2074';
        _httpService.removeAcnaPermissions(attuid);

        _httpBackend.expectGET(baseUrl + 'acnaPermissions/delete/' + attuid).respond(200, '');
        _httpBackend.flush();
    });
});