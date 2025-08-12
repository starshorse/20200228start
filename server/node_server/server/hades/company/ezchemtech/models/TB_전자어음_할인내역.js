const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_전자어음_할인내역', {
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
    '어음관리번호': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '할인일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '할인액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '할인이자': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '금리': {
      type: DataTypes.DECIMAL(6,3),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고2': {
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
    tableName: 'TB_전자어음_할인내역',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_전자어음_할인내역",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_전자어음_할인내역",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
