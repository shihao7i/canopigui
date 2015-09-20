angular.module('canopi.app').controller('DashboardController', [
  '$http',
  '$scope',
  '$log',
  '$location',
  '$rootScope',
  '$state',
  'CommonUtilJsonService',
  'Cache',
  '$filter',
  function(
    $http,
    $scope,
    $log,
    $location,
    $rootScope,
    $state,
    CommonUtilJsonService,
    Cache,
    $filter
  ) {
    'use strict';

    init();

    function init() {
      initializeScopeVariables();

      setupScopeMethods();

      setupWatchers();

      //setupEventListeners();
    }

    function initializeScopeVariables() {
      $scope.name = 'Dashboard';

      // test model data for checkbox directive
      $scope.isChecked = false;

      // test model data for checkboxGroup directive
      $scope.checkboxList = [
        { id: 'checkbox1', value: 'Checkbox 1', isChecked: false },
        { id: 'checkbox2', value: 'Checkbox 2', isChecked: false },
        { id: 'checkbox3', value: 'Checkbox 3', isChecked: false }
      ];

      // test model data for radiobuttonGroup directive
      $scope.radiolist = [
        { id: 'radio1', value: 'Radio Button 1', isSelected: false },
        { id: 'radio2', value: 'Radio Button 2', isSelected: false },
        { id: 'radio3', value: 'Radio Button 3', isSelected: false }
      ];

      // test model data for simpleGroupAssignment directive
      $scope.listGroup = {
        leftItems: [
          { id: 'left1', value: 'IDIS_ADMIN_GROUP' },
          { id: 'left2', value: 'LPS_IDIS' },
          { id: 'left3', value: 'MOBILITY' },
          { id: 'left4', value: 'SUPER_GROUP_ADMIN' },
          { id: 'left5', value: 'SUPER_USER_ADMIN' }
        ],

        rightItems: [
          { id: 'right1', value: 'CANOPI_RETAIL_GROUP' },
          { id: 'right2', value: 'IDIS_SUPPORT_GROUP' },
          { id: 'right3', value: 'LNS OOR' },
          { id: 'right4', value: 'MEI_GROUP' },
          { id: 'right5', value: 'SERVICE_ASSURANCE_GROUP' },
          { id: 'right6', value: 'MIC_VENDOR' },
          { id: 'right7', value: 'TELCO_ACNA_GROUP' },
          { id: 'right8', value: 'TELCO_ACNA_GROUP_ATX' },
          { id: 'right9', value: 'MOBILITY_SUPPORT_GROUP' }
        ]
      };

      // test model data for autoFillTextField directive

      $scope.languageList = [
        'ActionScript',
        'AppleScript',
        'Asp',
        'BASIC',
        'C',
        'C++',
        'Clojure',
        'COBOL',
        'ColdFusion',
        'Erlang',
        'Fortran',
        'Groovy',
        'Haskell',
        'Java',
        'JavaScript',
        'Lisp',
        'Perl',
        'PHP',
        'Python',
        'Ruby',
        'Scala',
        'Scheme'
      ];

      // test model data for notificationPopover directive

      $scope.messageList = ['Message 1', 'Message 2', 'Message 3', 'Message 4'];

      // test model data for dialogBox directive

      $scope.dialogContent =
        'Lorem ipsum: dolor sit amet, consectetur adipisicing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
        'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
        'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
        'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

      // test model data for treeTable directive

      $scope.columnDefinition = {
        tableRows: {
          rowMetaData: {
            columnList: [
              { hyperlink: false, id: 'cardName', displayName: 'Card Name' },
              {
                hyperlink: false,
                id: 'parentCardName',
                displayName: 'Parent Card Name'
              },
              { hyperlink: false, id: 'port', displayName: 'Port' },
              {
                hyperlink: false,
                id: 'portStatus',
                displayName: 'Port Status'
              },
              { hyperlink: false, id: 'portRole', displayName: 'Port Role' }
            ]
          },

          rowValueList: [
            {
              id: 0,
              cellValues: [
                'AT_SFP_SM-A.1',
                'SM2GE_SM-A',
                '1',
                'In Service',
                ''
              ],
              children: [
                {
                  cellValues: [
                    'A.1.1 child',
                    'A.1.1 child',
                    'A.1.1',
                    'A.1.1',
                    'A.1.1'
                  ]
                },
                {
                  cellValues: [
                    'A.1.2 child',
                    'A.1.2 child',
                    'A.1.2',
                    'A.1.2',
                    'A.1.2'
                  ]
                }
              ]
            },

            {
              id: 1,
              cellValues: [
                'AT_SFP_SM-A.2',
                'SM2GE_SM-A',
                '2',
                'In Service',
                ''
              ],
              children: [
                {
                  cellValues: [
                    'A.2.1 child',
                    'A.2.1 child',
                    'A.2.1',
                    'A.2.1',
                    'A.2.1'
                  ]
                },
                {
                  cellValues: [
                    'A.2.2 child',
                    'A.2.2 child',
                    'A.2.2',
                    'A.2.2',
                    'A.2.2'
                  ]
                }
              ]
            },

            {
              id: 2,
              cellValues: [
                'AT_SFP_SM-B.1',
                'SM2GE_SM-B',
                '1',
                'In Service',
                ''
              ],
              children: []
            },

            {
              id: 3,
              cellValues: [
                'AT_SFP_SM-B.2',
                'SM2GE_SM-B',
                '2',
                'In Service',
                ''
              ],
              children: [
                {
                  cellValues: [
                    'B.2.1 child',
                    'B.2.1 child',
                    'B.2.1',
                    'B.2.1',
                    'B.2.1'
                  ]
                }
              ]
            }
          ]
        },
        errorStaus: 'Success',
        errorMessage: '',
        errorCode: '0'
      };

      //        $http.get('app/mock/admin/getAllWorkGroups.json').success(function(data){
      //            $scope.groupGridData = data;
      //
      //           // $log.debug("data => " + angular.toJson($scope.groupGridData.workGrouplist));
      //        });

      $scope.userInfoData = { workGroup: null };

      $scope.leftToRightSelections = [];
      $scope.rightToLeftSelections = [];

      $scope.columnDefs = [
        {
          field: 'name',
          displayName: 'Name'
        },
        {
          field: 'affiliate',
          displayName: 'Affiliate'
        }
      ];

      $scope.gridOptions = {
        enableColumnResize: true,
        enableRowSelection: true,
        multiSelect: true
      };

      $scope.accordionOpen = {
        table: true,
        search: false,
        test: false,
        test2: false,
        test3: false
      };
    }

    function setupScopeMethods() {
      //        // test function for editField directive
      //        $scope.validateName = function(value)
      //        {
      //            //$log.debug("Inside validateName => value " + value);
      //
      //            if (value !== undefined && value !== null && value.length >= 6) {
      //	            return {
      //	            	success: true,
      //	            	message: ""
      //	            };
      //            }
      //            else {
      //	            return {
      //	            	success: false,
      //	            	message: "Please enter at least 6 characters"
      //	            };
      //            }
      //        };
      //
      //        // test functions for simpleGroupAssignment directive
      //        $scope.addItems = function(itemsToBeAdded) {
      //            $log.debug("itemsToBeAdded => " + angular.toJson(itemsToBeAdded));
      //            // assuming the Restful call returns success (i.e. true)
      //            return true;
      //        }
      //
      //        $scope.deleteItems = function(itemsToBeRemoved) {
      //            $log.debug("itemsToBeRemoved => " + angular.toJson(itemsToBeRemoved));
      //            // assuming the Restful call returns success (i.e. true)
      //            return true;
      //        }
      //
      //        // test function for autoFillTextField directive
      //        $scope.getSelectedValue = function(selectedValue) {
      //            $log.debug("Selected Value => " + selectedValue);
      //        }
      //
      //
      //
      //        $scope.save = function() {
      //            $log.debug("Dialog Box Save operation invoked.");
      //        }
    }

    function setupWatchers() {
      // watch model data for changes via autoFillTextField directive
      // $scope.$watch("selectedValue", function(newValue, oldValue) {
      //    $log.debug("New Value => " + newValue);
      //    $log.debug("Old Value => " + oldValue);
      //});
    }

    //    function setupEventListeners() {

    //selections
    //        (function ($) {
    //            $(function () {
    //
    //                var selectFormGroup = function (event) {
    //                    event.preventDefault();
    //
    //                    var $selectGroup = $(this).closest('.input-group-select');
    //                    var param = $(this).attr("href").replace("#","");
    //                    var concept = $(this).text();
    //
    //                    $selectGroup.find('.concept').text(concept);
    //                    $selectGroup.find('.input-group-select-val').val(param);
    //
    //                };
    //
    //                $(document).on('click', '.dropdown-menu a', selectFormGroup);
    //
    //            });
    //        })(jQuery);
    //    }
  }
]);
