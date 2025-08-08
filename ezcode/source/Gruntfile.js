// Generated on 2015-08-13 using generator-angular-fullstack 2.0.13    
'use strict';	
module.exports = function(grunt){
	var localConfig; 
	localConfig = {}
	require('time-grunt')(grunt);
        grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha-test'); 
	grunt.loadNpmTasks('grunt-concurrent'); 
//	grunt.loadNpmTasks(['grunt-nodemon','grunt-node-inspector']) 
	grunt.loadNpmTasks('grunt-nodemon') 
	grunt.loadNpmTasks('grunt-karma'); 
	grunt.initConfig({
		// Project settings 
		pkg: grunt.file.readJSON('package.json'), 
		connect : {
		    dev:{}
		   ,local:{
	//              options : {port : 8001 ,base : 'dist'}
		      options : { port : 7000 , base : './angularJS-ui'}
		   }
		},
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
		nodemon:{
			debug:{	
				script:'server/app.js', 
				options:{
//					nodeArgs:['--inspect-brk'],
//					env:{ PORT: process.env.PORT || 9000 }
				},
				callback: function (nodemon) {
					nodemon.on('log', function (event) {
					  console.log(event.colour);
					});
				}
			}
		},
		concurrent:{
			debug:{
	//			tasks:['nodemon', 'node-inspector']
				tasks:['nodemon:debug'],
				options: {
					      logConcurrentOutput: true
					   }
			}
		}
	})
        grunt.registerTask('conn', ['connect:local:keepalive'])
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
	grunt.registerTask('serve',function( target ){
		if( target === 'debug'){
			return grunt.task.run([
				'concurrent:debug'
			])
		}
	})
}
