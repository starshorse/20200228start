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
  }); 
	
/*	
  var  vars = {}
  function sleep(ms){
	  const wakeUpTime = Date.now() + ms ;
	  while ( Date.now() < wakeUpTime ){} 
  }
  async function waitForWindow(timeout = 2) {
    await browser.sleep(timeout)
    const handlesThen = vars["windowHandles"]
    const handlesNow = await browser.getAllWindowHandles()
    if (handlesNow.length > handlesThen.length) {
      return handlesNow.find(handle => (!handlesThen.includes(handle)))
    }
    throw new Error("New window did not appear before timeout")
  }
  it('test from mocha', async function(){
		  // Test name: EZchemtech_newApp
		  // Step # | name | target | value
	          browser.waitForAngularEnabled(false);
		  // 1 | open | /homepage/ | 
		  await browser.get("http://34.64.240.149:3004/homepage/")
		  // 2 | setWindowSize | 1689x728 | 
//		  await browser.manage().window().setRect({ width: 1689, height: 728 })
                  await browser.manage().window().maximize();
		  // 3 | click | css=#menu-community > .item | 
		  await browser.findElement(By.css("#menu-community > .item")).click()
		  // 4 | click | id=email_address | 
		  await browser.findElement(By.id("email_address")).click()
		  // 5 | type | id=email_address | star_horse@naver.com
		  await browser.findElement(By.id("email_address")).sendKeys("star_horse@naver.com")
		  // 6 | type | id=password | ch1whdrb
		  await browser.findElement(By.id("password")).sendKeys("ch1whdrb")
		  // 7 | click | css=.btn-info | 
		  await browser.findElement(By.css(".btn-info")).click()
		  // 8 | click | css=.form-group:nth-child(4) .btn | 
		  vars["windowHandles"] = await browser.getAllWindowHandles()	  
		  sleep(3000) 	
		  // 9 | selectWindow | handle=${win1141} | 
		  await browser.findElement(By.css(".form-group:nth-child(4) .btn")).click()
		  // 10 | click | linkText=Design[collections] | 
		  vars["win1141"] = await waitForWindow(2000)
		  // 11 | click | css=#sidebarCollapse > span | 
		  await browser.switchTo().window(vars["win1141"])
		  sleep(3000) 	
		  // 12 | click | linkText=#[NEW App] | 
		  await browser.findElement(By.linkText("Design[collections]")).click()
		  sleep(3000) 	
		  // 13 | click | id=app_name | 
		  await browser.findElement(By.css("#sidebarCollapse > span")).click()
		  sleep(3000) 	
                  browser.executeScript('window.stop();');
		  // 14 | type | id=app_name | 1234
		  await browser.findElement(By.linkText("#[NEW App]")).click()
		  sleep(3000) 	
		  // 15 | click | css=.btn-secondary | 
		  await browser.findElement(By.id("app_name")).click()
		  await browser.findElement(By.id("app_name")).sendKeys("1234")
		  await browser.findElement(By.css(".btn-secondary")).click()
  })
*/
});

