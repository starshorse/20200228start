const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_직납안내', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    '회사명': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '위치구분': {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "기본"
    },
    '직납담당자': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '위치_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '납품일정_별도협의여부': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '납품일정_요일': {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    '납품일정_시작시간': {
      type: DataTypes.DATE,
      allowNull: true
    },
    '납품일정_종료시간': {
      type: DataTypes.DATE,
      allowNull: true
    },
    '납품일정_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '서류_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '포장_재질': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '포장_수요자별': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '포장_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '주차_결제여부': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '주차_무료시간_분': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '주차_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '출입_명부작성여부': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '출입_예약필요여부': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '출입_비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '전달_수령주체': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '전달_사전연락여부': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '전달_연락비고': {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    '전달_비고': {
      type: DataTypes.STRING(512),
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
    tableName: 'TB_직납안내',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_직납안내",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "PK_TB_직납안내",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
