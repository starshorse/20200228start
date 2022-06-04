module.exports = function( grunt ){
// 작업을 위한 설정
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    	connect : {
	    dev:{}
           ,local:{
//              option : {port : 8001 ,base : 'dist'}
              option : {port : 8001 ,base : '.'}
           }
	}
  });
 
  // 플러그인 등록
  grunt.loadNpmTasks('grunt-contrib-connect');
  //keepalive grunt가 종료된후에도 웹서버가 종료되지 않는다.
  grunt.registerTask('conn', ['connect:dev:keepalive']);
};
