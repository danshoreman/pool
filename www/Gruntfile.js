'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'library/css/style.css': 'library/scss/style.scss',
					'library/css/critical.css': 'library/scss/critical.scss',
					'library/css/ie.css': 'library/scss/ie.scss'
				}
			}
		},		
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
		      livereload: 35729
		    }
			}
		},
		imageoptim: {
		  myTask: {
		    options: {
		      jpegMini: true,
		      imageAlpha: true,
		      quitAfter: true
		    },
		    src: ['library/images']
		  }
		}
	});
	// Load the Grunt plugins.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-imageoptim');
	
	// Register the default tasks.
	grunt.registerTask('dev', ['sass:dist', 'watch']);
	grunt.registerTask('imageoptim', ['imageoptim']);

};
