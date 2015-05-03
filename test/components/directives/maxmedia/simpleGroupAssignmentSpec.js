describe('Testing Maxmedia simpleGroupAssignment directive', function () {

    var scope, compile, elem;

    beforeEach(module('maxmedia.directive'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
    }));


    beforeEach(function () {
        scope.listGroup =
        {
            leftItems: [
                {id: 'left1', value: 'IDIS_ADMIN_GROUP'},
                {id: 'left2', value: 'LPS_IDIS'},
                {id: 'left3', value: 'MOBILITY'},
                {id: 'left4', value: 'SUPER_GROUP_ADMIN'},
                {id: 'left5', value: 'SUPER_USER_ADMIN'}],
            rightItems: [
                {id: 'right1', value: 'CANOPI_RETAIL_GROUP'},
                {id: 'right2', value: 'IDIS_SUPPORT_GROUP'},
                {id: 'right3', value: 'LNS OOR'},
                {id: 'right4', value: 'MEI_GROUP'},
                {id: 'right5', value: 'SERVICE_ASSURANCE_GROUP'},
                {id: 'right6', value: 'MIC_VENDOR'},
                {id: 'right7', value: 'TELCO_ACNA_GROUP'},
                {id: 'right8', value: 'TELCO_ACNA_GROUP_ATX'},
                {id: 'right9', value: 'MOBILITY_SUPPORT_GROUP'}]
        };
    });

    function complileDirective(html) {

        elem = angular.element(html);

        //compile the directive and run the compiled view
        compile(elem)(scope);

        //call digest on the scope!
        scope.$digest();
    }

    it('Should move selected items between panels when using custom callbacks', function () {
            var htmlToTest = '<div simple-group-assignment ng-model="listGroup" leftboxtitle="User Group List" rightboxtitle="Group List" add-items="addItems(itemsToBeAdded)" delete-items="deleteItems(itemsToBeRemoved)"></div>';

            scope.addItems = function (itemsToBeAdded) {
                return false;
            };

            scope.deleteItems = function (itemsToBeRemoved) {
                return false;
            };

            var isolateScope;

            complileDirective(htmlToTest);
            isolateScope = elem.isolateScope();
            expect(isolateScope.listGroup).toBe(scope.listGroup);

            // Toggle a few items in the left panel
            isolateScope.toggle(isolateScope.listGroup.leftItems[2]);
            isolateScope.toggle(isolateScope.listGroup.leftItems[3]);

            // Fail to move items to the right
            isolateScope.moveToRight();
            expect(isolateScope.listGroup.leftItems.length).toBe(5);

            // Toggle a few items in the right panel
            isolateScope.toggle(isolateScope.listGroup.rightItems[2]);
            isolateScope.toggle(isolateScope.listGroup.rightItems[3]);

            // Fail to move items to the left
            isolateScope.moveToLeft();
            expect(isolateScope.listGroup.rightItems.length).toBe(9);
        }
    );

    it('Should move selected items between panels', function () {
        var htmlToTest = '<div simple-group-assignment ng-model="listGroup"></div>';
        var isolateScope;

        complileDirective(htmlToTest);
        isolateScope = elem.isolateScope();
        expect(isolateScope.listGroup).toBe(scope.listGroup);

        // Toggle a few items
        isolateScope.toggle(isolateScope.listGroup.leftItems[2]);
        isolateScope.toggle(isolateScope.listGroup.leftItems[3]);
        expect(isolateScope.listGroup.leftItems[2].selected).toBe(true);
        expect(isolateScope.listGroup.leftItems[3].selected).toBe(true);

        // Move selected items to the right panel
        isolateScope.moveToRight();
        expect(isolateScope.listGroup.leftItems.length).toBe(3);

        // Move selected items to the left panel
        isolateScope.toggle(isolateScope.listGroup.rightItems[2]);
        isolateScope.moveToLeft();
        expect(isolateScope.listGroup.rightItems.length).toBe(10);
    });
});


