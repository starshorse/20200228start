const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_휴가일수관리', {
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
    '사번': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '성명': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '휴가종류': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '연도': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '일수': {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false
    },
    '사유': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_휴가일수관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_휴가일수관리",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_휴가일수관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
