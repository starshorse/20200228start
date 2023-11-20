const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_국가명관리', {
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
    '두자리코드': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '세자리코드': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '숫자코드': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '국가명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '영문국가명': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '국가영문약어': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '등록면제국가명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '등록면제국가코드명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '화학확인국가명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    'FTA대상여부': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    'FTA협정국': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
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
    tableName: 'TB_국가명관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_국가명관리",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_국가명관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
