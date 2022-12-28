const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_수입제한', {
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
    '이름': {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    '화학물질명': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    cas_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '구분': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '제한번호': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '금지번호': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '사고번호': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
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
    tableName: 'TB_수입제한',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_수입제한",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_수입제한",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
