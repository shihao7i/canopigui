angular.module('canopi.app', ['ngGrid', 'ngRoute', 'ngResource', 'ui.bootstrap', 
                       'ngSanitize', 'angularSpinner', 'ui.router', 'ngCookies', 'ui.utils', 
                       'angularBootstrapNavTree', 'drag', 'cgBusy', 
                       'canopi.service', 'canopi.filter', 'canopi.directive', 'maxmedia.directive']);
                  


// Better Error Handling in AngularJS
// http://odetocode.com/blogs/scott/archive/2014/04/21/better-error-handling-in-angularjs.aspx
// $exceptionHandler function will be invoked if throw ({message}) is called from the application

//angular.module('canopi.app').config(['$provide', function($provide){
//	 
//    $provide.decorator("$exceptionHandler", ['$delegate', '$inject', function($delegate, $injector){
//        return function(exception, cause){
//            var $rootScope = $injector.get("$rootScope");
//            $rootScope.addError({message:"Exception", reason:exception});
//            $delegate(exception, cause);
//        };
//    }]);
// 
//}]);



angular.module('canopi.app').config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
	
	 // $urlRouterProvider.otherwise('dashboard');
	  //$urlRouterProvider.otherwise('/');
          
	  $stateProvider
	    .state('canopimaingui', {
                abstract: true,
                url: '/maingui',
                templateUrl: 'app/canopi-app/canopimain.html'
	    })
	    .state('canopimaingui.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/canopi-app/dashboard/views/dashboard.html',
                controller : 'DashboardController',
                controllerAs: 'dashboard'   
	    })
	    .state('canopimaingui.equipmentSearch', {
                url: '/equipmentsearch',
                templateUrl: 'app/canopi-app/telco/network/views/equipmentSearch.html',
                controller : 'EquipmentSearchController',
                controllerAs: 'equipmentsearch'
	    })
	    .state('equipmentModify', {
	      url: '/equipmentmodify',
	      templateUrl: 'app/canopi-app/telco/network/views/equipmentModify.html',
	      controller : 'EquipmentModifyController',
          controllerAs: 'equipmentsearch'
	    })
	    .state('deviceDetails', {
	      url: '/devicedetails',
	      templateUrl: 'app/canopi-app/telco/network/views/deviceDetails.html',
	      controller : 'DeviceDetailsController',
          controllerAs: 'devicedetails'	   
	    })
	    .state('networkDiscovery', {
	      url: '/networkdiscovery',
	      templateUrl: 'app/canopi-app/telco/network/views/networkDiscovery.html',
	      controller : 'NetworkDiscoveryController',
          controllerAs: 'networkdiscovery'	   
	    })
	    .state('topologyView', {
	      url: '/topologyview',
	      templateUrl: 'app/canopi-app/telco/network/views/topologyView.html',
	      controller : 'TopologyViewController',
          controllerAs: 'topologyview'   
	    })
	    .state('equipmentBuild', {
	      url: '/build/equipmentbuild',
	      templateUrl: 'app/canopi-app/telco/network/views/build/equipmentBuild.html',
	      controller : 'EquipmentBuildController',
          controllerAs: 'equipmentbuild'
	    })
	    .state('equipmentReview', {
	      url: '/build/equipmentreview',
	      templateUrl: 'app/canopi-app/telco/network/views/build/equipmentReview.html',
	      controller : 'EquipmentReviewController',
          controllerAs: 'equipmentreview'
	    })
	    .state('serviceSearch', {
	      url: '/servicesearch',
	      templateUrl : 'app/canopi-app/telco/inventory/views/serviceSearch.html',
	      controller : 'ServiceSearchController',
          controllerAs: 'servicesearch'
	    })
	    .state('projectOrderSearch', {
              url: '/search/projectordersearch',
              templateUrl : 'app/canopi-app/telco/orders/views/search/projectOrderSearch.html',
              controller : 'ProjectOrderSearchController',
              controllerAs: 'projectordersearch'
            })		 
            .state('technicalOrderSearch', {
                 url: '/search/technicalordersearch',
                 templateUrl : 'app/canopi-app/telco/orders/views/search/technicalOrderSearch.html',
                 controller : 'TechnicalOrderSearchController',
                 controllerAs: 'technicalordersearch'
            })
            .state('relatedOrdersSearch', {
                 url: '/search/relatedorderssearch',
                 templateUrl : 'app/canopi-app/telco/orders/views/search/relatedOrdersSearch.html',
                 controller : 'RelatedOrdersSearchController',
                 controllerAs: 'relatedorderssearch'

            })
            .state('newUniPO', {
                 url: '/unipo/newunipo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniPO/newUniPO.html',
                 controller : 'NewUniPOController',
                 controllerAs: 'newunipo'
            })
            .state('changeUniPO', {
                 url: '/unipo/changeunipo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniPO/changeUniPO.html',
                 controller : 'ChangeUniPOController',
                 controllerAs: 'hangeunipo'
            })
            .state('disconnectUniPO', {
                 url: '/unipo/disconnectunipo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniPO/disconnectUniPO.html',
                 controller : 'DisconnectUniPOController',
                 controllerAs: 'disconnectunipo'

            })
            .state('newUniASEBBPO', {
                 url: '/uniasebbpo/newuniasebbpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniASEBBPO/newUniASEBBPO.html',
                 controller : 'NewUniASEBBPOController',
                 controllerAs: 'newuniasebbpo'
            })
            .state('changeUniASEBBPO', {
                 url: '/uniasebbpo/changeuniasebbpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniASEBBPO/changeUniASEBBPO.html',
                 controller : 'ChangeUniASEBBPOController',
                 controllerAs: 'changeuniasebbpo'
            })
            .state('disconnectUniASEBBPO', {
                 url: '/uniasebbpo/disconnectuniasebbpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/uniASEBBPO/disconnectUniASEBBPO.html',
                 controller : 'DisconnectUniASEBBPOController',
                 controllerAs: 'disconnectuniasebbpo'
            })
            .state('newMultiPointEVCPO', {
                 url: '/multipointevcpo/newmultipointevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/multiPointEVCPO/newMultiPointEVCPO.html',
                 controller : 'NewMultiPointEVCPOController',
                 controllerAs: 'newmultipointevcpo'
            })
            .state('disconnectMultiPointEVCPO', {
                 url: '/multipointevcpo/disconnectmultipointevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/multiPointEVCPO/disconnectMultiPointEVCPO.html',
                 controller : 'DisconnectMultiPointEVCPOController',
                 controllerAs: 'disconnectmultipointevcpo'
            })
            .state('changeMultiPointEVCPO', {
                 url: '/multipointevcpo/changemultipointevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/multiPointEVCPO/changeMultiPointEVCPO.html',
                 controller : 'ChangeMultiPointEVCPOController',
                 controllerAs: 'changemultipointevcpo'

            })
            .state('newInlCNLLAGPO', {
                 url: '/inlcnllagpo/newinlcnllagpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/inlCNLLAGPO/newInlCNLLAGPO.html',
                 controller : 'NewINLCNLLAGPOController',
                 controllerAs: 'newinlcnllagpo'
            })
            .state('disconnectInlCNLPO', {
                 url: '/inlcnllagpo/disconnectinlcnlpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/inlCNLLAGPO/disconnectInlCNLPO.html',
                 controller : 'DisconnectINLCNLPOController',
                 controllerAs: 'disconnectinlcnlpo'
            })
            .state('disconnectLagPO', {
                 url: '/inlcnllagpo/disconnectlagpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/inlCNLLAGPO/disconnectLagPO.html',
                 controller : 'DisconnectLAGPOController',
                 controllerAs: 'disconnectlagpo'
            })
            .state('newAafCNLPO', {
                 url: '/inlcnllagpo/newaafcnlpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/inlCNLLAGPO/newAafCNLPO.html',
                 controller : 'NewAAFCNLPOController',
                 controllerAs: 'newaafcnlpo'
            })
            .state('changeLagPO', {
                 url: '/inlcnllagpo/changelagpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/inlCNLLAGPO/changeLagPO.html',
                 controller : 'ChangeLAGPOController',
                 controllerAs: 'changelagpo'
            })
            .state('newP2PEVCPO', {
                 url: '/p2pevcpo/newp2pevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/p2pEVCPO/newP2PEVCPO.html',
                 controller : 'NewP2PEVCPOController',
                 controllerAs: 'newp2pevcpo'
            })
            .state('disconnectP2PEVCPO', {
                 url: '/p2pevcpo/disconnectp2pevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/p2pEVCPO/disconnectP2PEVCPO.html',
                 controller : 'DisconnectP2PEVCPOController',
                 controllerAs: 'disconnectp2pevcpo'
            })
            .state('changeP2PEVCPO', {
                 url: '/p2pevcpo/changep2pevcpo',
                 templateUrl : 'app/canopi-app/telco/orders/views/p2pEVCPO/changeP2PEVCPO.html',
                 controller : 'ChangeP2PEVCPOController',
                 controllerAs: 'changep2pevcpo'
            })
            .state('newDeviceSwap', {
                 url: '/deviceswap/newdeviceswap',
                 templateUrl : 'app/canopi-app/telco/orders/views/deviceSwap/newDeviceSwap.html',
                 controller : 'NewDeviceSwapController',
                 controllerAs: 'newdeviceswap'
            })
            .state('manageUsers', {
                url: '/help/manageusers',
                templateUrl : 'app/canopi-app/admin/views/manageUsers/manageUsers.html',
                controller : 'ManageUsersAdminController',
                controllerAs: 'manageusers'
            })
            .state('manageGroups', {
                url: '/help/managegroups',
                templateUrl : 'app/canopi-app/admin/views/manageGroups/manageGroups.html',
                controller : 'ManageGroupsAdminController',
                controllerAs: 'managegroups'
            });
	}]);


angular.module('canopi.app').run(['$state', '$rootScope', '$log', '$http', '$timeout', '$sanitize', 'CommonUtilJsonService', '$cookieStore', '$cookies', 
                           function ($state, $rootScope, $log, $http, $timeout, $sanitize, CommonUtilJsonService, $cookieStore, $cookies) {

    
//		//Fired at the start of a state change
//		$rootScope.$on('$stateChangeStart',	function(event, toState, toParams, fromState, fromParams) {
//			
//	
//		});
//
//		
//		//Fired when all state change has been completed
//		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//		   
//		
//		});


		
	    loadUser();

            // Load all the picklist values for CANOPI GUI 
            loadPickLists();
	
	    //$state.transitionTo('dashboard');
		   
	    function loadUser() {

            // this method is only called from here if the root controller is
            // restarted, in which case user
            // will be undefined. So, if we've gotten it once, no need to ever get
            // it again

            if ($rootScope.user === undefined) {

                // set it to Kathy as default for testing locally
                // When Single Signon is turned on, the correct attuid value will be
                // set on the global user object
                // This will be set by the servlet that forces a global login so
                // it's somewhat guaranteed to be there

        		
        	$rootScope.attUid='pb154j';

                if (localStorage.getItem('attuid')) {	        		
                    $rootScope.attUid = localStorage.attuid;
                };	


                $log.debug("attuid in localStorage =>"+ $rootScope.attUid);

                CommonUtilJsonService.getUser($rootScope.attUid).then(function(user) {

                    // set userName to be displayed on title bar
                    $rootScope.user = user;
                    $rootScope.userName = user.firstName + ' ' + user.lastName;

                });
                
            } // if user undefined
        } // loadUser()

		
		
        function loadPickLists() {

            if ($rootScope.picklists === undefined) {

                CommonUtilJsonService.getPicklistValues().then(function(data) {

                //   console.log("[Picklists] device type/subtypes => " + angular.toJson(data.deviceTypeAndSubtypesList));

                //   console.log("[Picklists] device statuses => " + angular.toJson(data.metaStatusesList));

                //   console.log("[Picklists] lata => " + angular.toJson(data.lataList));

                    $rootScope.picklists = data;
                });
            } 
        } // loadPickLists()

		
}]);
