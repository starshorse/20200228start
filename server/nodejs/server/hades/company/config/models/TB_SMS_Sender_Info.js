const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_SMS_Sender_Info', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orgSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    senderName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    senderPhoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
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
    tableName: 'TB_SMS_Sender_Info',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_SMS_Info_orgSeq",
        unique: true,
        fields: [
          { name: "orgSeq" },
          { name: "senderPhoneNumber" },
        ]
      },
      {
        name: "PK_TB_SMS_Info",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
