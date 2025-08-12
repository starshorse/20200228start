const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_trello_majorissues_cards', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_trello_majorissues_cards"
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
      allowNull: true
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
    card_id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      primaryKey: true
    },
    card_name: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    card_desc: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    card_short_link: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    is_archieved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_deleted: {
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
    tableName: 'TB_trello_majorissues_cards',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_trello_majorissues_cards",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_trello_majorissues_cards",
        unique: true,
        fields: [
          { name: "card_id" },
        ]
      },
    ]
  });
};
