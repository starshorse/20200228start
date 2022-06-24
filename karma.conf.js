//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-cookies/angular-cookies.js',
      'lib/socket.io/client-dist/socket.io.js', 
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/angular-resource/angular-resource.min.js',
      '../node_modules/angular-messages/angular-messages.min.js',
	  'company/main/0/app.js',	
	  'company/main/0/view/*.js',	
	  'rest_api/rest_api_service.js',	
	  'company/main/0/app.spec.js',	
	  'company/workspace/app.js', 	
	  'company/workspace/app.spec.js', 	
	  'db_edit/exists/app.js',	
	  'db_edit/exists/app.spec.js',	
      'parts/**/*.js',
      'parts/**/*.spec.js',
      'service/**/*.js',
      'service/**/*.spec.js',
      '../designv0.31/Admin_angular/app_admin.js',	    
      '../designv0.31/Dt/**/*.js'	    
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

//    browsers: ['Chrome'],
    browsers: ['ChromeHeadless'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
