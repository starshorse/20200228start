module.exports = function( grunt ){
	grunt.initConfig({
	 	connect:{
			server:{
				options:{
					target:'http://localhost:8005/bs4t.html',
					base:'www',
                    port: 8005,
					appName:'firefox',
					keepalive: true ,
					callback: ()=>{
						console.log('server working on port 8005') 
					}
				}
			}
		}
	})
	grunt.registerTask('default',['connect:server']);
	grunt.loadNpmTasks('grunt-contrib-connect') 
}
