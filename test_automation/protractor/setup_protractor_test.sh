#!/bin/bash
set -e

PROJ_DIR=protractor_mocha_project

echo "[INFO] Creating project directory $PROJ_DIR"
mkdir -p "$PROJ_DIR"
cd "$PROJ_DIR"

echo "[INFO] Initializing npm project..."
npm init -y > /dev/null

echo "[INFO] Installing protractor and mocha locally..."
npm install protractor mocha --save-dev > /dev/null

echo "[INFO] Updating webdriver-manager..."
npx webdriver-manager update > /dev/null

# Protractor 설정 파일 생성
cat > protractor.conf.js <<'EOF'
exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [ './test_spec.js' ],
  mochaOpts: {
    timeout: 30000
  }
};
EOF

# Mocha 테스트 샘플 생성
cat > test_spec.js <<'EOF'
describe('Protractor Mocha sample', function() {
  it('should have a title', async function() {
    await browser.get('https://angular.io');
    var title = await browser.getTitle();
    console.log('Title is: ' + title);
    if (!title.includes('Angular')) throw new Error('Title does not contain Angular');
  });
});
EOF

echo "[INFO] Starting selenium server in background..."
npx webdriver-manager start > /dev/null 2>&1 &
SELENIUM_PID=$!

sleep 5

echo "[INFO] Running protractor tests via mocha framework..."
npx protractor protractor.conf.js

echo "[INFO] Stopping selenium server..."
kill $SELENIUM_PID

echo "[✅ DONE] All tasks completed."

