const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_webhook_url', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    is_enabled: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    src_app: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    src_target: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    foreign_key: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    purpose: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    route_description: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    context_description: {
      type: DataTypes.STRING(128),
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
    tableName: 'TB_webhook_url',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_webhook_url",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "PK_TB_webhook_url",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
