// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'src/lib/jquery/jquery.js',
            'src/lib/jquery-ui/jquery-ui.js',
            'src/lib/angular/angular.js',
            'src/lib/angular-mocks/angular-mocks.js',
            'src/lib/angular-animate/angular-animate.js',
            'src/lib/angular-ui-router/angular-ui-router.js',
            'src/lib/angular-route/angular-route.js',
            'src/lib/angular-resource/angular-resource.js',
            'src/lib/angular-sanitize/angular-sanitize.js',
            'src/lib/angular-cookies/angular-cookies.js',
            'src/lib/angular-loader/angular-loader.js',
            'src/lib/angular-touch/angular-touch.js',
            'src/lib/lodash/lodash.min.js',
            'src/lib/i18next/i18next.js',
            'src/lib/ng-i18next/ng-i18next.js',
            'src/lib/jquery-cookie/jquery.cookie.js',
            'src/lib/jquery-validate/jquery.validate.js',
            'src/lib/spin/spin.js',
            'src/lib/angular-spinner/angular-spinner.js',

            'src/lib/angular-ui-utils/ui-utils.js',

            //<!-- ngGrid Libs-->
            'src/lib/angular-ui-ng-grid/ng-grid-csv-export.js',
            'src/lib/angular-ui-ng-grid/ng-grid.js',

            //<!-- DataTables JS Libs-->
            'src/lib/datatables/jquery.dataTables.js',
            'src/lib/datatables/dataTables.colVis.js',
            'src/lib/datatables/dataTables.tableTools.js',
            'src/lib/datatables/jquery.dataTables.editable.js',
            'src/lib/datatables/jquery.jeditable.js',
            'src/lib/datatables/dataTables.bootstrap.js',

            'src/lib/atmosphere/atmosphere.js',
            'src/lib/atmosphere/jquery-atmosphere.js',

            //<!-- Angular Busy -->
            'src/lib/angular-busy/angular-busy.js',

            //<!-- UI Libs -->
            'src/lib/bootstrap/bootstrap.js',
            'src/lib/angular-ui-bootstrap/ui-bootstrap-tpls-0.12.1.js',

            //<!--  MaxMedia Libs -->
            'src/lib/maxmedia/module.js',

            //<!-- JSPlumb lib -->
            'src/lib/jquery-jsplumb/jquery.jsPlumb-1.4.1-all-min.js',

            //<!-- Nav Tree lib -->
            'src/lib/abntree/abn_tree_directive.js',

            //<!-- Jasmine-Jquery lib-->
            'src/lib/jasmine-jquery/jasmine-jquery-1.7.js',
            
            // fixtures
            {pattern: 'src/app/canopi-app/mock/telco/orders/*.json', watched: true, served: true, included: false},          
            
            // App libs 
            'src/app/canopi-app/constants.js',
        
            'src/components/services/serviceModule.js',
            'src/components/services/cacheService.js',
            'src/components/services/helperUtilService.js',
            'src/components/services/messagesService.js',
            'src/components/services/httpInterceptorService.js',
            'src/components/services/commonUtilJsonService.js',
            'src/components/services/uamJsonService.js',
            'src/components/services/orderSearchJsonService.js',
            //'src/components/services/lookupSearchJsonService.js',

            'src/components/directives/maxmedia/maxmediaModule.js',
            'src/components/directives/maxmedia/activityIndicator.js',
            'src/components/directives/maxmedia/autoFillTextField.js',
            'src/components/directives/maxmedia/checkbox.js',
            'src/components/directives/maxmedia/checkboxGroup.js',
            'src/components/directives/maxmedia/dialogBoxWithOptionalLaunchButton.js',
            'src/components/directives/maxmedia/editField.js',
            'src/components/directives/maxmedia/notificationPopover.js',
            'src/components/directives/maxmedia/radiobuttonGroup.js',            
            'src/components/directives/maxmedia/simpleGroupAssignment.js',  
            'src/components/directives/maxmedia/treeTable.js',                 
            
            'src/components/directives/directiveModule.js',            
            'src/components/directives/alertMessages.js',
            'src/components/directives/bootstrapDatepicker.js',
            'src/components/directives/gridViewDt.js',
            'src/components/directives/groupAssignment.js',
            'src/components/directives/modalDialog.js',
            'src/components/directives/multiSelectDropdownAngular.js',            
            'src/components/directives/resultsTable.js',  
            'src/components/directives/treeView.js',   
            'src/components/directives/userMessage.js',      
            
            'src/components/directives/draggable.js',  
 
            'src/components/filters/filterModule.js',  
            'src/components/filters/isObjectEmpty.js',  
            'src/components/filters/partition.js',  
            
            'src/app/canopi-app/canopiapp.js',

            'src/app/canopi-app/dashboard/**/*.js',
            'src/app/canopi-app/about/**/*.js',           
            'src/app/canopi-app/admin/**/*.js',
            'src/app/canopi-app/telco/**/*.js',
            'test/components/services/*.js' ,
            'test/components/filters/*.js' ,
            'test/components/directives/**/*.js' ,
            'test/stateMock.js',
            'test/app/canopi-app/canopiappSpec.js',
            'test/app/canopi-app/dashboard/**/*.js',
            'test/app/canopi-app/about/controllers/aboutControllerSpec.js',
            'test/app/canopi-app/telco/orders/controllers/search/projectOrderSearchControllerSpec.js'

        ],
        
        // list of files / patterns to exclude
        exclude: [
        ],
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            'src/components/services/*.js': ['coverage'],
            'src/components/directives/**/*.js': ['coverage'],
            'src/components/filters/*.js': ['coverage'],
            'src/app/canopi-app/canopiapp.js': ['coverage'],
            'src/app/canopi-app/dashboard/**/*.js': ['coverage'],
            'src/app/canopi-app/about/**/*.js': ['coverage'],            
            'src/app/canopi-app/admin/**/*.js': ['coverage'],
            'src/app/canopi-app/telco/**/*.js': ['coverage'],
            'test/components/services/*.js': ['coverage'],
            'test/components/filters/*.js': ['coverage'],
            'test/components/directives/**/*.js': ['coverage'],
            'test/app/canopi-app/canopiappSpec.js' : ['coverage'],
            'test/app/canopi-app/dashboard/**/*.js': ['coverage'],
            'test/app/canopi-app/about/controllers/aboutControllerSpec.js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'coverage/html'},
                {type: 'cobertura', dir: 'coverage/cobertura'},
                {type: 'lcov', dir: 'coverage/lcov'}
            ]
        },
        junitReporter: {
            outputFile: 'coverage/TESTS-xunit.xml'
        },
        // web server port
        port: 8080,
        
        // enable / disable colors in the output (reports and logs)
        colors: true,
        
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO ||
        // LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],
        
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
