// login.spec.js
describe('my app', function() {
  it('should login and navigate through pages', async function() {
    await browser.get('http://localhost:4000/admin/user/login');
    await browser.sleep(1000);
    await browser.manage().window().maximize();

    await element(by.id('email_address')).sendKeys('star_horse@naver.com');
    await element(by.id('password')).sendKeys('ch1whdrb');
    await element(by.css('button[type="submit"]')).click();
    await browser.sleep(2000);

    expect(await browser.getCurrentUrl()).toContain('/company/workspace');

    await element(by.id('nextButton')).click();
    await browser.sleep(2000);

    expect(await browser.getCurrentUrl()).toContain('/company/main/0');

    await element(by.id('menu3')).click();
    await browser.sleep(2000);

    await element(by.id('sidebarCollapse')).click();
    await browser.sleep(2000);

    // 여기서 추가 동작 가능
  });
});

