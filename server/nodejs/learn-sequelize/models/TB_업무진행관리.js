const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_업무진행관리', {
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
    '진행상태': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '진행업무명': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '기간구분': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '반복주기': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '설명': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '담당자': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '완료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '완료기한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '_1차연장기한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '_1차연장사유': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '_2차연장기한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '_2차연장사유': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '_3차연장기한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '_3차연장사유': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '취소일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '취소사유': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '완료상태': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '최종기한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '예비1': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '예비2': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'TB_업무진행관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_업무진행관리",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_업무진행관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
