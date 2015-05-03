'use strict';

describe('Testing HelperUtilService', function(){
    var _service;
    
    beforeEach(module('canopi.service')); 
    
    beforeEach(inject(function ($injector) {
        _service = $injector.get('HelperUtilService');

//        spyOn(Date.prototype,'getDate').andReturn(21);
//        spyOn(Date.prototype,'getMonth').andReturn(0);  // January 
//        spyOn(Date.prototype,'getFullYear').andReturn(2015);
    }));
   
    // tests start here
    // Testing the isEmpty function
    it('should check if the string is empty or not', function () {
        expect(_service.isEmpty()).toBe(true);
        expect(_service.isEmpty("test")).toBe(false);
    });
    
    it('should check for format date string (month and day with single-digits)', function () {

        var myDate = new Date();
        myDate.setHours(0, 0, 0, 0);
        myDate.setYear(2015);

        // January 5
        myDate.setDate(5);
        myDate.setMonth(0);

        expect(_service.getFormatDateString(myDate)).toEqual('01/05/2015');
    });
    
    
    it('should check for format date string (month and day with double-digits)', function () {

        var myDate = new Date();
        myDate.setHours(0, 0, 0, 0);
        myDate.setYear(2015);

        // Novmember 21
        myDate.setDate(21);
        myDate.setMonth(10);

        expect(_service.getFormatDateString(myDate)).toEqual('11/21/2015');
    });
    
    
    it('should check for format end date string (month and day with single-digits)', function () {
        
        var myDate = new Date();
        myDate.setHours(0, 0, 0, 0);
        myDate.setYear(2015);

         // January 5
        myDate.setDate(5);
        myDate.setMonth(0);
        
        expect(_service.getFormatEndDateString(myDate, 14)).toBe('01/19/2015');
    });
    


   it('should check for format end date string (month and day with double-digits)', function () {
        
        var myDate = new Date();
        myDate.setHours(0, 0, 0, 0);
        myDate.setYear(2015);

        // Novmember 21
        myDate.setDate(21);
        myDate.setMonth(10);
        
        expect(_service.getFormatEndDateString(myDate, 14)).toBe('12/05/2015');
    });
    


    it('should return the correct object for different message type', function() {
       
       // this will test the else path when no type value is passed in the second argument of the call
       expect(_service.getMessageAndType('Info Message', '')).toEqual({
           message: 'Info Message',
           type: 'info',
           icon: 'fa fa-info-circle'
       });
       
       expect(_service.getMessageAndType('Info Message', 'info')).toEqual({
           message: 'Info Message',
           type: 'alert alert-info',
           icon: 'fa fa-info-circle fa-lg'
       });
       
       expect(_service.getMessageAndType('Success Message', 'success')).toEqual({
           message: 'Success Message',
           type: 'alert alert-success',
           icon: 'fa fa-check-circle fa-lg'
       });
       
       expect(_service.getMessageAndType('Warning Message', 'warning')).toEqual({
           message: 'Warning Message',
           type: 'alert alert-warning',
           icon: 'fa fa-exclamation-triangle fa-lg'
       });
       
       expect(_service.getMessageAndType('Error Message', 'error')).toEqual({
           message: 'Error Message',
           type: 'alert alert-danger',
           icon: 'fa fa-ban fa-lg'
       });
        
    });
    
    
    it('should set the tableDefinition with tableRows data returned from the meta data', function() {
       
       var metaData = {"tableRows": 
                            {"rowMetaData":
                                    { "columnList":[{"hyperlink":false,	"id":"discoveryIsSupport",	"displayName":"Discovery isSupport"},
                                                    {"hyperlink":false,	"id":"deviceClli",			"displayName":"Device Clli"},
                                                    {"hyperlink":false,	"id":"deviceName",			"displayName":"Device Name"},
                                                    {"hyperlink":false,	"id":"status",				"displayName":"Status"},
                                                    {"hyperlink":false,	"id":"type",				"displayName":"Type"},
                                                    {"hyperlink":false,	"id":"subType",				"displayName":"SubType"}] },

                                    "rowValueList":[{"cellValues":["","LSVGNV99TT3","LGX Panel_LSVGNV99TT3_000000.00_00","In Service","LGX","LGX Panel"]},
                                                    {"cellValues":["","LSVGNV99TT3","TA5000_LSVGNV99TT3_000000.00_00","In Service","ADTRAN 5000 series","TA 5000"]},
                                                    {"cellValues":["","","","","",""]},
                                                    {"cellValues":["","","","","",""]}]},
                        "returnStaus": "Success",
                        "returnMessage": "",
                        "returnCode": "0",
                        "pageInfo" : {
                            "totalRecords" : "30",
                            "currentPage": "0",
                            "itemsPerPage": "100"
                        }
                };
      
       var results = {};

       _service.processResponseResultForDatatable(results, metaData);
               
       expect(results.tableDefinition).toEqual(metaData.tableRows);

    });

});