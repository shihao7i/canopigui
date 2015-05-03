'use strict';

module.exports = function(grunt) {

	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    
	    karma: {
	    	unit: {
                configFile: 'karma.conf.js',
                options: {
                    background: true
                }
	    	}
	    	
	    },
	    
	    watch: {
	  	    files: ['src/**/*.js',  'test/**/*.js'],
	  	    tasks: ['karma:unit']
	    },

        connect: {
            server: {
                options: {
                    hostname: "0.0.0.0",
                    port: 8080,
                    base: '.',
                    keepalive: false
                }
            }

        },

         jshint: {
	      all: ['Gruntfile.js', 'src/app/**/*.js', 'src/components/**/*.js', 'test/**/*.js']
	      //options: {
	        // options here to override JSHint defaults
	       // globals: {
	       //   jQuery: true,
	       //   console: true,
	       //   module: true,
	       //   document: true
	      //  }
	      }
	    }
	  //  watch: {
	  //    files: ['<%= jshint.files %>'],
	  //    tasks: ['jshint', 'qunit']
	  //  }
	  );
    
	  /*
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-qunit');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-contrib-concat');

	  grunt.registerTask('test', ['jshint', 'qunit']);

	  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	  
	  */

      grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-karma');
	  grunt.registerTask('default', [ 'connect', 'karma:unit', 'watch']);
	  
	};
	