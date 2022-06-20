'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  beforeAll(function(){
    browser.get('http://ezoffice365.co.kr:3004/admin/user/login/');
    browser.sleep(3000);
    browser.manage().window().maximize();
    element(by.id('email_address')).sendKeys('star_horse@naver.com');
    element(by.id('password')).sendKeys('ch1whdrb');
    //element(by.id('btnLogin')).click();
    //element(by.css('input[type="submit"]')).sendKeys(protractor.Key.ENTER);
    element(by.css('button[type="submit"]')).click();
    browser.sleep(5000) 
//    expect(browser.getCurrentUrl()).toMatch("http://ezoffice365.co.kr:3004/company/workspace/?my_collection=mainGate&tbl_name=mainGate");
    element(by.css('#appWrapper > div:nth-child(2) > my-dataedit > form > div:nth-child(3) > div.col-md-2 > button')).click()
//    browser.close() 	  
  })
	it('should login with my ID/ PW', async function( ) {
		try{
			let handles = await browser.getAllWindowHandles() 
			browser.driver.switchTo().window( handles[1] ) 
			browser.driver.close()
			browser.driver.switchTo().window( handles[0] )

			browser.waitForAngularEnabled(false);
			browser.get('http://ezoffice365.co.kr:3004/company/main/0');
			browser.sleep(3000) 
			//  element(by.css('#navbarSupportedContent > ul > li:nth-child(3) > a')).click() 
			element(by.css('#navbarSupportedContent > ul > li:nth-child(3) > a')).click() 
			browser.sleep(3000) 
			//    expect(browser.getCurrentUrl()).toMatch("/?my_collection=mainGate&tbl_name=mainGate");
			element(by.css('#sidebarCollapse')).click() 
			//browser.sleep(3000) 
			//    console.log( await browser.getCurrentUrl() ) 
			element(by.css('#sidebar > div:nth-child(3) > div > ul > li.active > a')).click() 
			browser.sleep(3000) 
		}catch(err){
			let jandiUrl = 'https://wh.jandi.com/connect-api/webhook/13487135/639bda448c308a1f8a484e3142b4dbd4'
			let jandiHeaders = { 'Accept': 'application/vnd.tosslab.jandi-v2+json',
				'Content-Type': 'application/json'
			}
			console.log('err:!!!!', err)
	//axios.post( jandiUrl , {'body': `Selenium auto-test#1 [ERROR]########### ${ JSON.stringify(err) }` } ,{ headers : jandiHeaders }).then((res_)=>{ console.log('err sent') })  
			axios.post( jandiUrl , {'body': `Selenium auto-test#1 [ERROR]########### ${ err }` } ,{ headers : jandiHeaders }).then((res_)=>{ console.log('err sent') })  

		}
	}); 
	
});

