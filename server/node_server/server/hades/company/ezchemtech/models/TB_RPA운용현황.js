const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_RPA운용현황', {
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
    '프로세스명': {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    '프로세스설명': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '작동PC': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '작동방식_TS': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    scheduler_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    time01: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time02: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time03: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time04: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time05: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time06: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time07: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time08: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time09: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time10: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time11: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time12: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time13: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time14: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time15: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time16: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time17: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time18: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time19: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time20: {
      type: DataTypes.TIME,
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(200),
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
    tableName: 'TB_RPA운용현황',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_RPA운용현황",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_RPA운용현황",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
