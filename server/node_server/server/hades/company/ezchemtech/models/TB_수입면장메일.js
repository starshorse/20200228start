const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_수입면장메일', {
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
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '발신': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '수신': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '제목': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '특송구분': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '송장번호': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_수입면장메일',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_수입면장메일",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_수입면장메일",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
