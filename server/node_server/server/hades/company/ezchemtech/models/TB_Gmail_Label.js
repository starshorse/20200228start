const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Gmail_Label', {
    labelId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    messageListVisibility: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    labelListVisibility: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    messagesTotal: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    messagesUnread: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    threadsTotal: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    threadsUnread: {
      type: DataTypes.BIGINT,
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
    tableName: 'TB_Gmail_Label',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Gmail_Label",
        unique: true,
        fields: [
          { name: "labelId" },
        ]
      },
    ]
  });
};
