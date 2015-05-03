angular.module('canopi.filter').filter('partition', function() {
    var filter = function(arr, size) {
        if (!arr) { return; }
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));        
        }
        return newArr;
    };
    return filter;
});