///////////////////////////////////////////////////////
//  install: npm install sequelize sqlite3 
//  node testUserModel.js
//
/*
✅ 성공적으로 데이터베이스에 연결되었습니다.
✅ 모든 모델이 성공적으로 동기화되었습니다.
✅ 사용자 생성 성공: { id: 1, firstName: 'Jane', lastName: 'Doe', ... }
✅ 사용자 조회 결과: { id: 1, firstName: 'Jane', lastName: 'Doe', ... }
❌ 예상된 에러 발생 (firstName 누락): notNull Violation: User.firstName cannot be null
👥 전체 사용자 수: 1
*/
///////////////////////////////////////////////////////
const { Sequelize, DataTypes } = require('sequelize');

// In-memory SQLite database
const sequelize = new Sequelize('sqlite::memory:');

// User 모델 정의
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING // allowNull defaults to true
  }
}, {
  freezeTableName: true // 테이블 이름을 모델명으로 고정
});

// 테스트 실행 함수
async function runTests() {
  try {
    // 1. 데이터베이스 연결 테스트
    await sequelize.authenticate();
    console.log('✅ 성공적으로 데이터베이스에 연결되었습니다.');

    // 2. 모델 동기화
    await sequelize.sync({ force: true });
    console.log('✅ 모든 모델이 성공적으로 동기화되었습니다.');

    // 3. 사용자 생성 테스트
    const user = await User.create({ firstName: 'Jane', lastName: 'Doe' });
    console.log('✅ 사용자 생성 성공:', user.toJSON());

    // 4. 사용자 찾기 테스트
    const foundUser = await User.findOne({ where: { firstName: 'Jane' }});
    console.log('✅ 사용자 조회 결과:', foundUser.toJSON());

    // 5. 유효성 검사 테스트 (firstName 누락)
    try {
      await User.create({ lastName: 'NoFirstName' });
    } catch (error) {
      console.error('❌ 예상된 에러 발생 (firstName 누락):', error.message);
    }

    // 6. 전체 사용자 조회
    const allUsers = await User.findAll();
    console.log('👥 전체 사용자 수:', allUsers.length);

  } catch (error) {
    console.error('❌ 테스트 실행 중 오류 발생:', error);
  } finally {
    await sequelize.close();
  }
}

// 테스트 실행
runTests();

