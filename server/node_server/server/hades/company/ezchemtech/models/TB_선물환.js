const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_선물환', {
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
    '코드번호': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '거래일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '결제시작일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '결제종료일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '매입환율': {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    '매입액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    '거래은행': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '매입사유': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '비고1': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_선물환',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_선물환",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_선물환",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
