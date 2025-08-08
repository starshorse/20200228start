const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Gmail_Message_Label', {
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
    labelId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    historyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    historyType: {
      type: DataTypes.STRING(20),
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
    tableName: 'TB_Gmail_Message_Label',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Gmail_Message_Label_1",
        unique: true,
        fields: [
          { name: "messageId" },
          { name: "threadId" },
          { name: "labelId" },
        ]
      },
    ]
  });
};
