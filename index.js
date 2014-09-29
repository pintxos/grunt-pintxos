module.exports = function (options) {

	'use strict';

	return function (grunt) {

		var pluginName, tasks;

		tasks = [
			'grunt-contrib-watch',
			'grunt-contrib-jshint',
			'grunt-karma',
			'grunt-concurrent'
		];

		pluginName = 'grunt-pintxos';

		grunt.initConfig({

			karma: {
				options: {
					basePath: '',
					files: options.testDependencies,
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

			concurrent: {
				dev: {
					tasks: ['watch', 'karma:dev'],
					options: {
						logConcurrentOutput: true
					}
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
				files: '*.js',
				tasks: ['jshint']
			}

		});

		// load Grunt plugins from the plugin's node_modules/ dir instead of from the
		// Gruntfile's node_module dir. This way we can specify the dependencies in the package.json of this plugin.
		for (var i = 0; i < tasks.length; i ++ ) {
			grunt.loadTasks('node_modules/'+ pluginName +'/node_modules/' + tasks[i] + '/tasks');
		}

		grunt.registerTask('default', ['concurrent:dev']);
		grunt.registerTask('test', ['jshint', 'karma:ci']);

	};
};
