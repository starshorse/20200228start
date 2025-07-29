const express = require('express');
const Browser = require('zombie');

const PORT = 4000;

// 1. 간단한 Express 서버 구현
function createServer() {
  const app = express();
  app.use(express.urlencoded({ extended: false }));

  // 로그인 페이지
  app.get('/', (req, res) => {
    res.send(`
      <form method="post" action="/login">
        <input name="username" type="text" />
        <input name="password" type="password" />
        <button type="submit">로그인</button>
      </form>`);
  });

  // 로그인 처리 & 결과 페이지
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'password123') {
      res.send(`<h1>환영합니다, ${username}!</h1>`);
    } else {
      res.send('<h1>로그인 실패</h1>');
    }
  });

  return app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
  });
}

// 2. Zombie.js 테스트
async function runTest() {
  const browser = new Browser();
  await browser.visit(`http://localhost:${PORT}/`);
  await browser.fill('input[name="username"]', 'testuser');
  await browser.fill('input[name="password"]', 'password123');
  await browser.pressButton('로그인');
  const result = browser.text("h1");
  if(result.includes("환영합니다")) {
    console.log("✅ 자동화 테스트 성공:", result);
  } else {
    console.log("❌ 자동화 테스트 실패:", result);
  }
}

(async () => {
  // 서버 구동
  const server = createServer();

  // 서버가 완전히 시작되는 걸 기다림 (1초 대기)
  await new Promise(res => setTimeout(res, 1000));

  // Zombie.js 자동화 테스트
  await runTest();

  // 서버 종료
  server.close(() => {
    console.log("서버 종료됨");
  });
})();

