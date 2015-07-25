angular.module('canopi.app').controller('EquipmentBuildController', ['$scope', '$location', '$rootScope', '$state', 'Cache', '$filter','$http','$timeout',
                                       function ($scope, $location, $rootScope, $state, Cache, $filter, $http, $timeout) {
	'use strict';
	
    init();
 
    
    function init() {
       
    	setupScopeValuesAndMethods();
       
    }  
        
    
    function setupScopeValuesAndMethods() {
    	
    	$scope.name = "EquipmentBuild";
    	
    	$scope.accordionOpen = {
    			search: true,
			    details: true
    	};
    
    
    	$scope.equipmentElementsData = {};
    	$scope.my_data = {};
    	
    	$scope.shelvesInfoData = {};
    	
    	$http.get('app/mock/telco/network/equipmentElementsResponse.json')
		.then(function(res){
			$scope.equipmentElementsData = res.data;
		});
    	
    	updateTreeData();
        	
    }
    
    function updateTreeData() {
    	//Simple Data
    	$scope.my_data = [{
  		  label: 'Languages',
  		  children: ['Jade','Less','Coffeescript']
    	}];
    	
        var apple_selected, tree, treedata_avm, treedata_geography;
        $scope.my_tree_handler = function(branch) {
        	
        	$http.get('app/mock/telco/network/shelvesInfoResponse.json')
				.then(function(res){
					$scope.shelvesInfoResponseData = res.data;
					processResponseResult($scope.shelvesInfoData, $scope.shelvesInfoResponseData);
			});
          var _ref;
          $scope.output = "You selected: " + branch.label;
          if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
          }

        };
        apple_selected = function(branch) {
          return $scope.output = "APPLE! : " + branch.label;
        };
        
        $scope.my_tree = tree = {};
    	
    	//
        $scope.treedata_avm = [
    	                {
    	                  label: 'TA5000_ATLNGASSH04_000000.00_00',
    	                  children: [
    	                    {
    	                      label: 'AT5000_Fan_Shelf.0 (Cramer)',
    	                      data: {
    	                        description: ""
    	                      }
    	                    }, {
    	                      label: 'AT5000_PW_Supply_Shelf.0 (Cramer)',
    	                      data: {
    	                        description: ""
    	                      }
    	                    }, {
    	                      label: 'AT5000_Card_Shelf.0 (Cramer)',
    	                      children: ['SM2GE_SM-A', 'SM2GE_SM-B']
    	                    }
    	                  ]
    	                }, {
						label: 'TA5000_ATLNGASSH04_000000.00_00',
						data: {
							definition: "",
							data_can_contain_anything: true
						},
						onSelect: function(branch) {
							$scope.doing_async = true;
	      	      	        return $timeout(function() { 
	      	                	var b;
		      	      	        b = tree.get_selected_branch();
	      	      	        	tree.add_branch(b, {
	      	                      label: 'AT5000_Card_Shlef.0',
	    	                      children: [
	    	                        {
	    	                          label: 'SM2GE_SM-A(Cramer)',
	    	                          onSelect: function(branch) {
	    	                        	  $http.get('app/mock/telco/network/shelvesInfoResponse.json')
		    	              				.then(function(res){
		    	              					$scope.shelvesInfoResponseData = res.data;
		    	              					processResponseResult($scope.shelvesInfoData, $scope.shelvesInfoResponseData);
	    	              					});
	    	                          }
	    	                        }, {
	    	                          label: 'SM2GE_SM-B(Cramer)'
	    	                        }, {
	    	                          label: 'SM2GE_SM-C(Cramer)'
	    	                        }
	    	                      ]
	      	      	        });
	      	      	        $scope.doing_async = false;
	      	      	        }, 1000);
      	                  },
      	                  children: [
      	                    {
      	                      label: 'AT5000_Fan_Shelf.0 (Cramer)'
      	                    }, {
      	                      label: 'AT5000_PW_Supply_Shelf.0 (Cramer)',
      	                    }
      	                  ]
      	                }, {
    	                  label: 'LGX Panel_ATLNGASSH04_000000.00_00',
    	                  children: [
    	                    {
    	                      label: 'Port Data 1',
    	                      children: ['LGX Back.1 (Cramer)', 'LGX Back.2 (Cramer)', 'LGX Back.3 (Cramer)']
    	                    },{
    	                      label: 'Port Data 1',
    	                      children: ['LGX Front.1 (Cramer)', 'LGX Front.2 (Cramer)', 'LGX Front.3 (Cramer)']
    	                    }
    	                  ]
    	                }
    	              ];
    	
    	
    		$scope.try_changing_the_tree_data = function() {
    	      if ($scope.my_data === treedata_avm) {
    	        return $scope.my_data = treedata_geography;
    	      } else {
    	        return $scope.my_data = treedata_avm;
    	      }
    	    };
    	    
    	    $scope.try_async_load = function() {
    	        $scope.my_data = [];
    	        $scope.doing_async = true;
    	        return $timeout(function() {
    	          if (Math.random() < 0.5) {
    	            $scope.my_data = treedata_avm;
    	          } else {
    	            $scope.my_data = treedata_geography;
    	          }
    	          $scope.doing_async = false;
    	          return tree.expand_all();
    	        }, 1000);
    	      };
    	    
    	    $scope.try_adding_a_branch = function() {
    	        var b;
    	        b = tree.get_selected_branch();
    	        return tree.add_branch(b, {
    	          label: 'New Branch',
    	          data: {
    	            something: 42,
    	            "else": 43
    	          }
    	        });
    	      };
    }
    
    function processResponseResult(resultData, responseData) {
		resultData.tableDefinition={};
		resultData.loadTrigger = 0;
		resultData.tableDefinition=responseData.tableRows;
		resultData.loadTrigger++;

    }
}]);