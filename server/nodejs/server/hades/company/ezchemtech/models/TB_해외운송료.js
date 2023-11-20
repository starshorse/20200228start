const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_해외운송료', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '운송사': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '고객번호': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '청구번호': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '발송일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '송장번호': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '상품코드': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '발송국가': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    '발송도시': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '발송지CODE': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '도착국가': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    '도착도시': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '도착지CODE': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '발송자상호': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '발송자명': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '수취인상호': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '수취인명': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '발송인참조': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '수량': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '중량_KG': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    '청구내역': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '할인전운임': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '운임할인금액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '보험금액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '유류할증료': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '유류할증료할인금액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '기타금액1항목': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '기타금액1': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '기타금액2항목': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '기타금액2': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '기타금액3항목': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '기타금액3': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '기타금액4항목': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '기타금액4': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '총금액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
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
    tableName: 'TB_해외운송료',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_해외운송료",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
