<#
    PowerShell에서 유의사항
    bash의 cat <<EOF ... EOF 과 같은 멀티라인 문자열은 PowerShell의 here-string(@" ... "@)으로 변환.
    조건문/디렉터리 생성/파일 확인 등 bash 문법 차이에 주의.
    전체 흐름, 명령 실행 순서, 파일명 등 원문의 의도대로 재현함.
사용법
    이 코드를 setup-sequelize.ps1 등으로 저장한 뒤, PowerShell에서 실행하세요.
    (윈도우에서는 기본 terminal로 PowerShell을 쓰며, npm/node 환경이 미리 설치돼 있어야 합니다.)
#>
# Start Script
# 
Write-Host "?? SQLite3 + Sequelize 자동 설치 및 설정 시작..."

# 0. npm init
if (!(Test-Path "package.json")) {
  npm init -y
}

# 1. 패키지 설치
npm install sequelize sqlite3
npm install --save-dev sequelize-cli

# 2. Sequelize 초기화
npx sequelize-cli init

# 3. DB 디렉토리 생성
$dirs = @("database/config", "database/ezoffice", "database/ezchemtech")
foreach ($dir in $dirs) {
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
}

# 4. config/config.json 생성
if (!(Test-Path "config")) {
  New-Item -ItemType Directory -Force -Path "config" | Out-Null
}

@'
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database/config/database.sqlite"
  }
}
'@ | Set-Content -Encoding UTF8 "config/config.json"

# 5. TB_Admin 모델/마이그레이션 생성
npx sequelize-cli model:generate --name TB_Admin --attributes dbName:string,authOrgUserSeq:integer,name:string,position:string,level:integer,password:string,email:string,important:integer,약칭:string,jandi_id_map:string,depart:string,configuration:string,createdAt:date,updatedAt:date,userSeq:integer,RegDate:date,UpdateDate:date,passcode:string

# 6. Seed 생성
npx sequelize-cli seed:generate --name seed-tb-admin

# 7. 시더 내용 수정
$seedFile = Get-ChildItem "seeders" -Filter "*seed-tb-admin.js" | Select-Object -First 1
$seedContent = @"
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TB_Admins', [
      {
        dbName: 'config',
        name: '최종규',
        email: 'richard.choi@ez-office.co.kr',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dbName: 'config',
        name: '최종규',
        email: 'richard.choi@ez-office.co.kr',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TB_Admins', null, {});
  }
};
"@
if ($seedFile) {
  $seedContent | Set-Content -Encoding UTF8 $seedFile.FullName
}

# 8. 마이그레이션 수행
npx sequelize-cli db:migrate

# 9. 시딩 수행
npx sequelize-cli db:seed:all

# 10. 테스트 스크립트 작성
$testScript = @'
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/config/database.sqlite',
  logging: false
});

const TB_Admin = sequelize.define('TB_Admin', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  tableName: 'TB_Admins',
  timestamps: false
});

(async () => {
  try {
    const admins = await TB_Admin.findAll();
    console.log('?? TB_Admins 테이블 레코드 수:', admins.length);
    admins.forEach((a, i) => {
      console.log(`#${i + 1}: ${a.name} / ${a.email} / ${a.password}`);
    });
  } catch (e) {
    console.error('? 오류:', e);
  } finally {
    await sequelize.close();
  }
})();
'@
$testScript | Set-Content -Encoding UTF8 "test-admin.js"

# 11. 테스트 실행
Write-Host ""
Write-Host "?? 테스트 실행..."
node ./test-admin.js

Write-Host ""
Write-Host "? 모든 작업 완료!"

