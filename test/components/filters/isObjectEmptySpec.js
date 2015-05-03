'use strict';

describe('Testing isObjectEmpty', function(){
    
    var _filter;
 
    beforeEach(module('canopi.filter'));
    
    beforeEach(inject(function ($filter) {
        _filter = $filter('isObjectEmpty');
    }));
    
    it('has a isObjectEmpty filter', function() {
        //Checking if filter is available.
        expect(_filter).not.toBeNull();
    });
    
    it("should return true if object is null or empty / should return false if not null or empty", function () {
        //Checking for null value
        expect(_filter()).toBe(true);
        //Checking an object.
        //Checking a number value.
        expect(_filter(new Number( 1 ))).toBe(true);
    });
});


