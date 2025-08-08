const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_ChannelUser', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "IX_TB_ChannelUser_userId_channelId"
    },
    channelId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "IX_TB_ChannelUser_userId_channelId"
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    empty: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mobileNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    landlineNumber: {
      type: DataTypes.STRING(300),
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
    tableName: 'TB_ChannelUser',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_ChannelUser_userId_channelId",
        unique: true,
        fields: [
          { name: "userId" },
          { name: "channelId" },
        ]
      },
      {
        name: "PK_TB_ChannelUser",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
