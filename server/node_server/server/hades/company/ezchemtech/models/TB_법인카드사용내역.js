const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_법인카드사용내역', {
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
      allowNull: true
    },
    loadedTime: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    loadedPhoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loadedBlank: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    loadedTextValue: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    '년월': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '사용일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '카드번호': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '취소구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '사용처': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '환구분': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '사용금액': {
      type: DataTypes.DECIMAL(14,2),
      allowNull: true
    },
    '사용자성명': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '항목_대분류': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '항목_소분류': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '식사인원': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '구매물품명': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    time2: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
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
    tableName: 'TB_법인카드사용내역',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_법인카드사용내역",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_법인카드사용내역",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
