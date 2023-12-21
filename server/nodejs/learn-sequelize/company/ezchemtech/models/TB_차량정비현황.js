const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_차량정비현황', {
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
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '차량no': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '정비직원': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '정비일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '정비시_운행km': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '정비시_엔진오일_교환여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '정비금액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '정비업소명': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '정비내용': {
      type: DataTypes.STRING(1000),
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
    tableName: 'TB_차량정비현황',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_차량정비현황",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_차량정비현황",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
