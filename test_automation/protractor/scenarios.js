'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  it('should login with my ID/ PW', function() {
    browser.get('/admin/user/login/');
    browser.sleep(3000);
    browser.manage().window().maximize();
    element(by.id('email_address')).sendKeys('star_horse@naver.com');
    element(by.id('password')).sendKeys('ch1whdrb');
    //element(by.id('btnLogin')).click();
    //element(by.css('input[type="submit"]')).sendKeys(protractor.Key.ENTER);
    element(by.css('button[type="submit"]')).click();
    browser.sleep(10000) 
    expect(browser.getCurrentUrl()).toMatch("/?my_collection=mainGate&tbl_name=mainGate");
  });

});
