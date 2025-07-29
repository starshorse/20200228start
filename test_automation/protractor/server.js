// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 4000;

// Express 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));

// 로그인 페이지 제공
app.get('/admin/user/login', (req, res) => {
  res.send(`
    <html>
    <body>
      <h2>간단 로그인 폼</h2>
      <form method="POST" action="/admin/user/login">
        <input id="email_address" name="email" type="email" placeholder="Email" required/><br/>
        <input id="password" name="password" type="password" placeholder="Password" required/><br/>
        <button type="submit">로그인</button>
      </form>
    </body>
    </html>
  `);
});

// 로그인 처리
app.post('/admin/user/login', (req, res) => {
  const { email, password } = req.body;
  // 간단한 하드코딩 인증 (테스트용)
  if (email === 'star_horse@naver.com' && password === 'ch1whdrb') {
    res.redirect('/company/workspace?my_collection=mainGate&tbl_name=mainGate');
  } else {
    res.send('<h1>로그인 실패</h1><a href="/admin/user/login">다시 로그인</a>');
  }
});

// 로그인 성공 후 메인 페이지
app.get('/company/workspace', (req, res) => {
  res.send(`
    <html>
    <body>
      <h1>환영합니다!</h1>
      <button id="nextButton">다음 페이지로 이동</button>
      <script>
        document.getElementById('nextButton').addEventListener('click', () => {
          window.location.href = '/company/main/0';
        });
      </script>
    </body>
    </html>
  `);
});

// 다음 페이지
app.get('/company/main/0', (req, res) => {
  res.send(`
    <html>
    <body>
      <nav id="navbarSupportedContent">
        <ul>
          <li><a href="#" id="menu1">메뉴1</a></li>
          <li><a href="#" id="menu2">메뉴2</a></li>
          <li><a href="#" id="menu3">메뉴3</a></li>
        </ul>
      </nav>
      <button id="sidebarCollapse">사이드바 접기</button>
      <div id="sidebar">
        <div>
          <ul>
            <li class="active"><a href="#">활성 메뉴</a></li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`테스트용 서버가 http://localhost:${PORT} 에서 실행 중`);
});

