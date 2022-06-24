// Generated on 2015-08-13 using generator-angular-fullstack 2.0.13    
'use strict';	
module.exports = function(grunt){
	var localConfig; 
	localConfig = {}
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-mocha-test'); 
	grunt.initConfig({
		// Project settings 
		pkg: grunt.file.readJSON('package.json'), 
		watch: {
			injectJs:{
				files: [
					'./app/**/*.spec.js',
				],
				tasks:['injector:scripts']
			}
		},
		karma:{
			unit:{
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		mochaTest:{
			option:{
				reporter: 'spec' 
			},
			src:['server/**/*.spec.js'] 
		},
	})
	grunt.loadNpmTasks('grunt-karma'); 
	grunt.registerTask('test',function( target ){
		if( target === 'server' ){
			return grunt.task.run([
				'mochaTest'
			]);
		}
		else if( target === 'client'){
			return grunt.task.run([
				'karma'
			]);
		}
		else grunt.task.run([
			'test:server',
			'test:client'
		]);
	})
}
