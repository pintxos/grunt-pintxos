module.exports = function (config) {

	'use strict';

	return function (grunt) {

		require('load-grunt-tasks')(grunt);

		grunt.initConfig({

			karma: {
				options: {
					basePath: '',
					files: config.testDependencies,
					frameworks: [
						'jasmine'
					]
				},
				dev: {
					browsers: ['Chrome']
				},
				ci: {
					browsers: ['PhantomJS'],
					singleRun: true
				}
			},

			jshint: {
				files: ['*.js'],
				options: {
					strict: true,
					es3: true,
					globals: {
						window: true,
						document: true,
						define: true
					}
				}
			},

			watch: {
				files: '**/*.js',
				tasks: ['jshint']
			}

		});

		grunt.registerTask('default', ['watch', 'karma:dev']);
		grunt.registerTask('test', ['jshint', 'karma:ci']);

	};
};
