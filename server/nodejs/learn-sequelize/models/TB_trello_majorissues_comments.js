const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_trello_majorissues_comments', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    row_created_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    row_last_updated_time: {
      type: DataTypes.DATE,
      allowNull: true
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
    card_id: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    comment_id: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    comment_text: {
      type: DataTypes.STRING(2048),
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
    tableName: 'TB_trello_majorissues_comments',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_trello_majorissues_comments",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "PK_TB_trello_majorissues_comments",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
