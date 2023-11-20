const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_전자어음_개요', {
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
    '회사구분': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '발행은행': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '발행일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '만기일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '발행액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '발행회사': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '어음일수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '완결여부': {
      type: DataTypes.STRING(5),
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
    tableName: 'TB_전자어음_개요',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_전자어음_개요",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_전자어음_개요",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
