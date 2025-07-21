#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// 1. 프로젝트 폴더 생성
const appName = 'my-angularjs-app';
if (!fs.existsSync(appName)) {
  fs.mkdirSync(appName);
}
process.chdir(appName);

// 2. package.json 초기화
execSync('npm init -y', { stdio: 'inherit' });

// 3. 필수 패키지 설치
execSync('npm install express angular angular-ui-router cpx --save', { stdio: 'inherit' });

// 4. 폴더 구조 생성
fs.mkdirSync('app');
fs.mkdirSync('app/lib');
fs.mkdirSync('app/js');

// 5. 기본 서버 파일 생성
fs.writeFileSync('server.js', `
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'app')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
`);

// 6. 기본 index.html 생성
fs.writeFileSync('app/index.html', `
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS 1.x + UI-Router App</title>
  <script src="lib/angular/angular.js"></script>
  <script src="lib/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="js/app.js"></script>
</head>
<body>
  <div ui-view></div>
</body>
</html>
`);

// 7. 기본 app.js 생성 (AngularJS + UI-Router)
fs.writeFileSync('app/js/app.js', `
angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<h2>Welcome to AngularJS 1.x SPA!</h2><p>Edit app/js/app.js to get started.</p>'
    });
});
`);

// 8. package.json scripts 및 cpx로 라이브러리 복사
const pkg = JSON.parse(fs.readFileSync('package.json'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['copy-libs'] = 'cpx "node_modules/angular/angular.js" app/lib/angular && cpx "node_modules/angular-ui-router/release/angular-ui-router.js" app/lib/angular-ui-router';
pkg.scripts['start'] = 'node server.js';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// 9. 라이브러리 복사
execSync('npm run copy-libs', { stdio: 'inherit' });

console.log('\n설치 완료! 아래 명령어로 앱을 실행하세요:\n');
console.log('cd', appName);
console.log('npm start');
console.log('\n브라우저에서 http://localhost:3000 접속\n');


