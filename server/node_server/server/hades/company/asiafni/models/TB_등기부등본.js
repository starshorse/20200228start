const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_등기부등본', {
    '관리번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '고유번호': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '열람일시': {
      type: DataTypes.DATE,
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '총층수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '해당층': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '전용면적': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '대지면적': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '소유자명': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '소유자생년월일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '소유권이전일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '권리침해내역': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '권리침해YN': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '채권자명_01': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '채권최고액_01': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '채권원금_01': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '설정일_01': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '당사대환YN_01': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '채권자명_02': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '채권최고액_02': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '채권원금_02': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '설정일_02': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '당사대환YN_02': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '채권자명_03': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '채권최고액_03': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '채권원금_03': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '설정일_03': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '당사대환YN_03': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '채권자명_04': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '채권최고액_04': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '채권원금_04': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '설정일_04': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '당사대환YN_04': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    }
  }, {
    sequelize,
    tableName: 'TB_등기부등본',
    schema: 'dbo',
    timestamps: false
  });
};
