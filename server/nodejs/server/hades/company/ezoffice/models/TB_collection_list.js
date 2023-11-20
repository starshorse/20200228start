const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_collection_list', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_jpt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    parent: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    apps: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    configuration: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url_target: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    edit_level: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'TB_collection_list',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_TB_collection_list",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
