const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Gmail_Message', {
    messageId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    threadId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    snippet: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sizeEstimate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    historyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    internalDate: {
      type: DataTypes.DATE,
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
    tableName: 'TB_Gmail_Message',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Gmail_Message",
        unique: true,
        fields: [
          { name: "messageId" },
          { name: "threadId" },
        ]
      },
    ]
  });
};
