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
      console.log(#:  /  / );
    });
  } catch (e) {
    console.error('? 오류:', e);
  } finally {
    await sequelize.close();
  }
})();
