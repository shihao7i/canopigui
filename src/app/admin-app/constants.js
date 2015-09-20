// define all the constants used by Admin GUI here:
//
// ====================================================================================================================================================
// END_TO_END_REST_CALL: boolean variable used to determine if the Admin GUI is deployed with both FE and BE components in Weblogic Server environment
// MOCK_DATA_FLAG: boolean variable used to determine if mock JSON data should be used for testing
// ====================================================================================================================================================
//
//  The following are the 4 possible senacrios for testing:
//
//  (1) Use Mock JSON data - Admin GUI ear is deployed in Weblogic Server Environment
//  END_TO_END_REST_CALL:       true
//  MOCK_DATA_FLAG:             true
//
//  (2) Call COLM JSON Service - Admin GUI ear is deployed in Weblogic Server Environment
//  END_TO_END_REST_CALL:       true
//  MOCK_DATA_FLAG:             false
//
//  (3) Use Mock JSON data - Run in NetBeans IDE
//  END_TO_END_REST_CALL:       flase
//  MOCK_DATA_FLAG:             true
//
//  (4) Call COLM JSON Service - Run in NetBeans IDE (Notes: "Allow-Control-Allow-Origin" extension needs to be installed in Chrome browser
//                               to bypass CORS restriction in calling Restful Service in a differnet domain.)
//                               The target restful URL needs to be hard-coded in AdminJsonService for local testing only
//  END_TO_END_REST_CALL:       false
//  MOCK_DATA_FLAG:             false

angular.module('admin.constants', []).constant('AdminGuiConstants', {
  GUI_RELEASE_NUMBER: 'R1509',
  END_TO_END_REST_CALL: false, // replace this to false for development in NetBeans IDE
  MOCK_DATA_FLAG: true,
  HOSTNAME_PORT_SETTING_FOR_COLM_CALL_FROM_NETBEANS:
    'd5ibp1m1.snt.bst.bls.com:4030' // need to hardcode this for testing from NetBeans
});
