module.exports = ( grunt )=>{
	grunt.initConfig({
//		pkg: grunt.file.readJSON('../../package.json'),
		jshint:{
			// all: ['app.js'],
			js:{ src :['app.js'] }
		},
		watch:{
			files: ['app.js'],
			tasks: ['test']
		}
	})
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.registerTask('default',[ 'watch' ])
//	grunt.registerTask('default',[ 'jshint:js', 'watch' ])
	grunt.registerTask('test','custom test', function(){
          grunt.log.writeln('app.js file changed.!'); 
          grunt.log.writeln('custom test done'); 
	})
}
