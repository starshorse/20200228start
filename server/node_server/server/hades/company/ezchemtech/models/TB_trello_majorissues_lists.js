const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_trello_majorissues_lists', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    row_created_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    row_last_updated_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_updated_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    last_updator_id: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    list_id: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    list_name: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    is_archieved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'TB_trello_majorissues_lists',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_trello_majorissues_lists",
        fields: [
          { name: "list_id" },
        ]
      },
      {
        name: "PK_TB_trello_majorissues_lists",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
