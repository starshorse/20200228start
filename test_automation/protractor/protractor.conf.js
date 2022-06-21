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
   },
   'chromeOptions': {
 //  args: ['--disable-browser-side-navigation'] 
     args: ['--headless','--disable-gpu','--window-size=800,600'] 
   }   	  
  },
// baseUrl: 'http://ezoffice365.co.kr:3004',
 framework: 'jasmine',
 jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },
  restartBrowserBetweenTests: true,	
};
