#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// 1. 프로젝트 폴더 생성
const appName = 'my-angularjs-app-v1';
if (!fs.existsSync(appName)) fs.mkdirSync(appName);
process.chdir(appName);

// 2. package.json 초기화
execSync('npm init -y', { stdio: 'inherit' });

// 3. 필수 패키지 설치
execSync('npm install express angular angular-ui-router bootstrap@4.6.0 bootstrap-icons@1.11.3 cpx --save', { stdio: 'inherit' });

// 4. 폴더 구조 생성
fs.mkdirSync('app');
fs.mkdirSync('app/lib');
fs.mkdirSync('app/js');
fs.mkdirSync('app/templates');
fs.mkdirSync('app/css');

// 5. Express 서버 파일 생성
fs.writeFileSync('server.js', `
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'app')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
`);

// 6. index.html 생성
fs.writeFileSync('app/index.html', `
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS 1.x + Bootstrap 4 SPA</title>
  <link rel="stylesheet" href="lib/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="lib/bootstrap-icons/bootstrap-icons.css">
  <link rel="stylesheet" href="css/style.css">
  <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
</head>
<body>
  <button id="sidebarToggle" class="btn btn-primary" style="position:fixed;top:20px;left:20px;z-index:2000;">
    <i class="bi bi-list"></i>
  </button>
  <div ng-include="'templates/sidebar.html'"></div>
  <div id="appWrapper" style="margin-left:260px; padding:2rem;">
    <div ui-view></div>
  </div>
  <script src="lib/angular/angular.js"></script>
  <script src="lib/angular-ui-router/angular-ui-router.js"></script>
  <script src="lib/bootstrap/bootstrap.min.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
`);

// 7. sidebar.html 생성
fs.writeFileSync('app/templates/sidebar.html', `
<nav id="sidebar">
  <div class="sidebar-header">
    <i class="bi bi-grid-1x2-fill"></i> App Management
  </div>
  <ul class="components">
    <li ui-sref-active="active"><a ui-sref="home"><i class="bi bi-house-door-fill"></i> Home</a></li>
    <li ui-sref-active="active"><a ui-sref="profile"><i class="bi bi-person-fill"></i> Profile</a></li>
    <li class="has-submenu">
      <a href="#"><i class="bi bi-folder-fill"></i> Projects <i class="bi bi-caret-down-fill submenu-arrow"></i></a>
      <ul class="submenu">
        <li><a ui-sref="projects"><i class="bi bi-file-earmark-text"></i> Project 1</a></li>
        <li><a ui-sref="projects"><i class="bi bi-file-earmark-text"></i> Project 2</a></li>
        <li><a ui-sref="projects"><i class="bi bi-plus-circle"></i> Add Project</a></li>
      </ul>
    </li>
    <li ui-sref-active="active"><a ui-sref="settings"><i class="bi bi-gear-fill"></i> Settings</a></li>
    <li><a href="#"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
  </ul>
</nav>
`);

// 8. 본문 템플릿 생성
fs.writeFileSync('app/templates/home.html', `
<div class="container">
  <h2>Home</h2>
  <p>Welcome to the Home page!</p>
</div>
`);
fs.writeFileSync('app/templates/profile.html', `
<div class="container">
  <h2>Profile</h2>
  <p>Your profile information goes here.</p>
</div>
`);
fs.writeFileSync('app/templates/projects.html', `
<div class="container">
  <h2>Projects</h2>
  <p>Project list and management.</p>
</div>
`);
fs.writeFileSync('app/templates/settings.html', `
<div class="container">
  <h2>Settings</h2>
  <p>Application settings page.</p>
</div>
`);

// 9. style.css 생성
fs.writeFileSync('app/css/style.css', `
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
body { font-family: 'Poppins', sans-serif; background: #f6f6fa; }
#sidebar {
  min-width: 250px; max-width: 250px; min-height: 100vh;
  background: #7b2ff2; color: #fff; position: fixed; top: 0; left: 0;
  border-top-right-radius: 1.5rem; border-bottom-right-radius: 1.5rem;
  overflow-y: auto; transition: margin-left 0.3s; z-index: 1000; padding-top: 2rem;
}
#sidebar.active { margin-left: -260px; }
@media (max-width: 768px) {
  #sidebar { margin-left: -260px; }
  #sidebar.active { margin-left: 0; }
}
#sidebarToggle {
  background: #7b2ff2; border: none; color: #fff; border-radius: 50%;
  width: 48px; height: 48px; font-size: 1.6rem;
}
.sidebar-header {
  padding: 1.5rem; font-size: 1.5rem; font-weight: 700; text-align: center; color: #e0e0ff;
}
ul.components { padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,0.10);}
ul.components > li { padding: 0.5rem 1rem; border-radius: 0.8rem; margin: 0.3rem 0;}
ul.components > li > a { color: #f7f7ff; font-weight: 500; font-size: 1rem; display: flex; align-items: center;}
ul.components > li > a i { margin-right: 0.8rem; font-size: 1.2rem; color: #d1b3ff;}
ul.components > li.has-submenu .submenu { display: none; background: #6a1ab6; border-radius: 0.8rem; }
ul.components > li.has-submenu.open .submenu { display: block; }
.submenu li a { font-size: 0.95rem; padding-left: 2.2rem; color: #e0d8ff; }
.submenu li a:hover { color: #fff; background: #7b2ff2; }
`);

// 10. app.js 생성
fs.writeFileSync('app/js/app.js', `
var app = angular.module('myApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home',     { url: '/home',     templateUrl: 'templates/home.html' })
    .state('profile',  { url: '/profile',  templateUrl: 'templates/profile.html' })
    .state('projects', { url: '/projects', templateUrl: 'templates/projects.html' })
    .state('settings', { url: '/settings', templateUrl: 'templates/settings.html' });
});
app.run(function($rootScope, $injector) {
  $rootScope.$on('$includeContentLoaded', function(event, templateName) {
    var sidebarToggle_ft = function(e) {
      e.preventDefault();
      document.getElementById('sidebar').classList.toggle('active');
    };
    if (!$rootScope.sidebarToggle_flag) {
      var btn = document.getElementById('sidebarToggle');
      if(btn){
        btn.removeEventListener('click', sidebarToggle_ft);
        btn.addEventListener('click', sidebarToggle_ft);
        $rootScope.sidebarToggle_flag = true;
      }
    }
    if (!$rootScope.submenuSidebarToggle_flag) {
      document.querySelectorAll('#sidebar .has-submenu > a').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          el.parentElement.classList.toggle('open');
        });
      });
      $rootScope.submenuSidebarToggle_flag = true;
    }
  });
});
`);

// 11. package.json scripts 및 라이브러리 복사
const pkg = JSON.parse(fs.readFileSync('package.json'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['copy-libs'] =
  'cpx "node_modules/angular/angular.js" app/lib/angular && ' +
  'cpx "node_modules/angular-ui-router/release/angular-ui-router.js" app/lib/angular-ui-router && ' +
  'cpx "node_modules/bootstrap/dist/css/bootstrap.min.css" app/lib/bootstrap && ' +
  'cpx "node_modules/bootstrap/dist/js/bootstrap.min.js" app/lib/bootstrap && ' +
  'cpx "node_modules/bootstrap-icons/font/bootstrap-icons.css" app/lib/bootstrap-icons && ' +
  'cpx "node_modules/bootstrap-icons/font/fonts/*" app/lib/bootstrap-icons/fonts';
pkg.scripts['start'] = 'node server.js';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// 12. 라이브러리 복사
execSync('npm run copy-libs', { stdio: 'inherit' });

console.log('\n설치 완료! 아래 명령어로 앱을 실행하세요:\n');
console.log('cd', appName);
console.log('npm start');
console.log('\n브라우저에서 http://localhost:3000 접속\n');

