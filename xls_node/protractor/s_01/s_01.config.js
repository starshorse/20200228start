exports.config = {
//  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['s_01.spec.js'],
  capabilities:{
	  'browserName': 'chrome',
	  'goog:chromeOptions':{
		  'excludeSwitches':['enable-automation'],
		  'useAutomationExtension':false,
	  },
	  'chromeOptions': {
		  'args':['show-fps-counter=true', '--headless', '--window-size= 800,600']
	  },
  },
  framework: 'jasmine',
  onPrepare: function() {
		var jasmineReporters = require('jasmine-reporters');
		var junitReporter = new jasmineReporters.JUnitXmlReporter({
		  // setup the output path for the junit reports
		  savePath: './output/',
		  // conslidate all true:
		  //   output/junitresults.xml
		  //
		  // conslidate all set to false:
		  //   output/junitresults-example1.xml
		  //   output/junitresults-example2.xml
		  consolidateAll: false
		});
		console.log('now onPrepare') 
		jasmine.getEnv().addReporter(junitReporter);
	    browser.manage().window().maximize()
	    browser.manage().timeouts().implicitlyWait(5000)
  }
};

//jshint strict: false
/*
exports.config = {

  allScriptsTimeout: 50000,
  specs: [
    's_01.spec.js'
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
*/
