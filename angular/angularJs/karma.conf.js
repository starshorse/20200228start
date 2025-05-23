//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: './app',
    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-resource/angular-resource.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(lib)/**/*!(.module|.spec).js',
      '**/*.spec.js',
    ],
    autoWatch: true,
    frameworks: ['jasmine'],
//    browsers: ['Chrome', 'Firefox'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
