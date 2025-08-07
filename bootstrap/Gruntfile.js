module.exports = function( grunt ){
	grunt.initConfig({
	 	connect:{
			server:{
				options:{
					target:'http://localhost:8000/bs4t.html',
					base:'www',
					appName:'firefox',
					keepalive: true ,
					callback: ()=>{
						console.log('server working on port 8000') 
					}
				}
			}
		}
	})
	grunt.registerTask('default',[])
	grunt.loadNpmTasks('grunt-contrib-connect') 
}
