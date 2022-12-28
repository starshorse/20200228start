const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_정기업무수행대상목록', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '업무id': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '회사명': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '팀명': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '알림구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '담당자1': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '담당자2': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '담당자3': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '업무명': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '업무폐지일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '영업일_반영': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '사전알림일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '알림여부': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '완료시한': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '연장시한': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '완료일': {
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
    tableName: 'TB_정기업무수행대상목록',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_정기업무수행대상목록",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_정기업무수행대상목록",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
