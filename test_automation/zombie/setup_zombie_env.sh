#!/bin/bash

# 프로젝트 디렉토리 이름
PROJECT_DIR="zombie_test_env"
TEST_FILE="$PROJECT_DIR/test/zombie_test.js"

# 1. 디렉토리 만들기
echo "[INFO] Creating project directory: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR/test"

cd "$PROJECT_DIR" || { echo "Failed to enter $PROJECT_DIR"; exit 1; }

# 2. npm 프로젝트 초기화
echo "[INFO] Initializing npm project..."
npm init -y > /dev/null

# 3. 필요한 패키지 설치
echo "[INFO] Installing mocha and zombie..."
npm install --save-dev mocha zombie > /dev/null

# 4. 테스트 코드 생성
echo "[INFO] Creating test/zombie_test.js with provided test code..."

cat <<'EOF' > test/zombie_test.js
const assert = require('assert');
const Browser = require('zombie');

describe('login', function() {
    const browser = new Browser();
    it('should load the signup form', function(done) {
        this.timeout(10000);
        browser.visit('https://ezoffice365.com:3004/admin/user/login', function(error) {
            if (error) {
                console.error('[Zombie error]', error);
                return done(error);
            }
            console.log('[test_automation] browser.visit');
            if (!browser.success) {
                console.error('Failed to load page, status:', browser.statusCode, 'errors:', browser.errors);
            }
            assert.ok(browser.success, 'page loaded');
            const form = browser.query('form');
            assert(form, 'form exists');
            done();
        });
    });
});
EOF

# 5. package.json에서 test 스크립트 설정
echo "[INFO] Registering mocha test command to package.json"
npx json -I -f package.json -e 'this.scripts.test="mocha"'

# 완료 안내
echo "[✅ DONE] Setup completed!"
echo ""
echo "▶ To run the test:"
echo "----------------------------"
echo "cd $PROJECT_DIR"
echo "npm test"
echo "----------------------------"

