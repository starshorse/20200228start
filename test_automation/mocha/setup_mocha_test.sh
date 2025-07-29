#!/bin/bash

FILE=test_mocha_spec.js

echo "[INFO] Creating test file..."

cat > $FILE <<'EOF'
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('EZchemtech_newApp', function() {
  this.timeout(30000);
  let driver;

  before(async function() {
    const options = new chrome.Options();
    // 자동화 탐지 우회(최신 JS API 방식)
    options.excludeSwitches('enable-automation');
    options.addArguments('--disable-extensions');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('basic test example', async function() {
    await driver.get('https://example.com');
    const title = await driver.getTitle();
    console.log('[TEST] Title:', title);
    assert.strictEqual(title, 'Example Domain');
  });
});
EOF

echo "[INFO] Installing npm dependencies: selenium-webdriver mocha assert ..."
npm install selenium-webdriver mocha assert --save-dev

echo "[INFO] Running mocha test ..."
npx mocha $FILE


