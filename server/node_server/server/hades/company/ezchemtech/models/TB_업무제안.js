const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_업무제안', {
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
    '제안번호': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '제안일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '직급': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '성명': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '공개여부': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '목적': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '세부내용요약': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '첨부자료': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '업무분류': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '협의자명단': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '심사일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '심사결과': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '심사요지': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '포상일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '포상내용': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고': {
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
    tableName: 'TB_업무제안',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_업무제안",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_업무제안",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
