const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_대출중개접수', {
    tanker_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '접수일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '시세기준일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '유입경로': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '채무자': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '생년월일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '직업': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '직장명': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '월소득': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '신용등급': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '신용점수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '연락처': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '실거주_유무': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '심사자': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '순위': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '대출금': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    LTV: {
      type: DataTypes.DECIMAL(5,4),
      allowNull: true
    },
    '대출기간': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '금리': {
      type: DataTypes.DECIMAL(5,4),
      allowNull: true
    },
    '지역별LTV': {
      type: DataTypes.DECIMAL(5,4),
      allowNull: true
    },
    '대출지역': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '자금용도': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '기표요청일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '단지명': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_대출중개접수',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_중개접수",
        unique: true,
        fields: [
          { name: "tanker_seq" },
        ]
      },
    ]
  });
};
