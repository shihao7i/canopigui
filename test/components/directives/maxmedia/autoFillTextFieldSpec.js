describe('Testing Maxmedia autoFillTextField directive', function () {

    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
    }));


    beforeEach(function () {
        scope.languageList = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
        ];
    });

    function complileDirective(html) {

        elem = angular.element(html);

        //compile the directive and run the compiled view
        compile(elem)(scope);

        //call digest on the scope!
        scope.$digest();
    }

    it('Should have source value populated', function () {
        var keyEvent = $.Event('keydown');
        var htmlToTest = '<div auto-fill-text-field ng-model="selectedValue" name="autocomplete1" label="Autocomplete Field" source="languageList"></div>';

        complileDirective(htmlToTest);

        expect(elem.isolateScope().source).toBe(scope.languageList);

        expect(elem.find('input')).toBeDefined();

        // Focus the first item
        elem.find('input').val('a');
        keyEvent.keyCode = $.ui.keyCode.DOWN;

        /**
        * Triggers an jquery plugin event. The first time it is necessary to fire trigger twice so the UI has time to update after
        * the keydown has been pressed. (http://stackoverflow.com/a/15466735/478699)
        */
        elem.find('input').trigger(keyEvent);
        elem.find('input').trigger(keyEvent);
        expect(elem.find('input').val()).toBe('ActionScript');

        // Clear the value and blur the field
        elem.find('input').val('z');
        elem.find('input').trigger('blur');

        expect(scope.selectedValue).toBe(null);

        // Select the second item
        elem.find('input').val('a');
        elem.find('input').trigger(keyEvent);
        elem.find('input').trigger(keyEvent);
        elem.find('input').trigger(keyEvent);
        keyEvent.keyCode = $.ui.keyCode.ENTER;
        elem.find('input').trigger(keyEvent);
        expect(scope.selectedValue).toBe('AppleScript');

        // Change to the item
        elem.find('input').trigger('blur');
        expect(scope.selectedValue).toBe('AppleScript');
    });
});


