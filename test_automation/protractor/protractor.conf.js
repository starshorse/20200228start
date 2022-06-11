//jshint strict: false
exports.config = {

  allScriptsTimeout: 50000,
  specs: [
    '*.js'
  ],
  capabilities: {
    browserName: 'chrome',
   'goog:chromeOptions': {
      'excludeSwitches': [ 'enable-automation' ],
      'useAutomationExtension': false
   }
  },
 baseUrl: 'http://ez-office.co.kr:3004',
 framework: 'jasmine',
 jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  }

};
