const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_SKBP통관대행', {
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
    '수출업체': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    SITE: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    TRK: {
      type: DataTypes.DECIMAL(20,0),
      allowNull: false
    },
    '서류제출일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '수입신고필증발행일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고2': {
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
    tableName: 'TB_SKBP통관대행',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_SKBP통관대행",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_SKBP통관대행",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
