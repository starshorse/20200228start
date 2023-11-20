const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Webhook_Result_Jandi', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    historyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    appName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    topicName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    targetUrl: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    connectInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    statusCode: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_Webhook_Result_Jandi',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Webhook_Result_Jandi",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
