#!/bin/bash

echo "🚀 SQLite3 + Sequelize 자동 설치 및 설정 시작..."

# 0. npm init
if [ ! -f "package.json" ]; then
  npm init -y
fi

# 1. 패키지 설치
npm install sequelize sqlite3
npm install --save-dev sequelize-cli

# 2. Sequelize 초기화
npx sequelize-cli init

# 3. DB 디렉토리 생성
for dir in database/config database/ezoffice database/ezchemtech; do
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
  fi
done

# 4. config/config.json 생성
mkdir -p config
cat <<EOF > config/config.json
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database/config/database.sqlite"
  }
}
EOF

# 5. TB_Admin 모델/마이그레이션 생성
npx sequelize-cli model:generate --name TB_Admin --attributes dbName:string,authOrgUserSeq:integer,name:string,position:string,level:integer,password:string,email:string,important:integer,약칭:string,jandi_id_map:string,depart:string,configuration:string,createdAt:date,updatedAt:date,userSeq:integer,RegDate:date,UpdateDate:date,passcode:string

# 6. Seed 생성
npx sequelize-cli seed:generate --name seed-tb-admin

# 7. 시더 내용 수정
seed_file=$(ls -1 seeders/*seed-tb-admin.js | head -n 1)
cat <<EOF > "$seed_file"
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
EOF

# 8. 마이그레이션 수행
npx sequelize-cli db:migrate

# 9. 시딩 수행
npx sequelize-cli db:seed:all

# 10. 테스트 스크립트 작성
cat <<'EOF' > test-admin.js
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
    console.log('📊 TB_Admins 테이블 레코드 수:', admins.length);
    admins.forEach((a, i) => {
      console.log(`#${i + 1}: ${a.name} / ${a.email} / ${a.password}`);
    });
  } catch (e) {
    console.error('❌ 오류:', e);
  } finally {
    await sequelize.close();
  }
})();
EOF

# 11. 테스트 실행
echo
echo "🧪 테스트 실행..."
node ./test-admin.js

echo
echo "✅ 모든 작업 완료!"

