//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './client',

    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-cookies/angular-cookies.js',
      'lib/socket.io/client-dist/socket.io.js', 
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/angular-resource/angular-resource.min.js',
      '../node_modules/angular-messages/angular-messages.min.js',
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
