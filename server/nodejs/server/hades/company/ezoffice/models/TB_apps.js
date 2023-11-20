const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_apps', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: "UQ__TB_apps__72E12F1B24F00179"
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: "UQ__TB_apps__E52A1BB3DB4321EF"
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    extrn_urlSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ownerSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    parentSeq: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_apps',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_apps__DDDFBCBE08380BC1",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "UQ__TB_apps__72E12F1B24F00179",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "UQ__TB_apps__E52A1BB3DB4321EF",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
