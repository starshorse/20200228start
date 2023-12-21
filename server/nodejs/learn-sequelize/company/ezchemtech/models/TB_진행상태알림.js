const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_진행상태알림', {
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
    time2: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '견적번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '작성자': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '알림종류': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '알림대상자': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '알림내용': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'account비고_업데이트_여부': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    'account비고_업데이트일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '알림완료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_진행상태알림',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_진행상태알림",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_진행상태알림",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
