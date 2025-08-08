const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_trello_majorissues_members', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_trello_majorissues_members"
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
    member_id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    ez_initial: {
      type: DataTypes.STRING(5),
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
    tableName: 'TB_trello_majorissues_members',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_trello_majorissues_members",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_trello_majorissues_members",
        unique: true,
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
};
