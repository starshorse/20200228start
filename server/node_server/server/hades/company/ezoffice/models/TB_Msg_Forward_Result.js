const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Msg_Forward_Result', {
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
    srType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    msgType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    srTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sendPhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receivePhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    msgBody: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    msgTitle: {
      type: DataTypes.STRING(200),
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
    tableName: 'TB_Msg_Forward_Result',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Msg_Forward_History",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
