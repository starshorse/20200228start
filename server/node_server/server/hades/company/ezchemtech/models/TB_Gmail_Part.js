const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Gmail_Part', {
    messageId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    partId: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attachmentId: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    savePath: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    returnpath: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    from: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    to: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body_html: {
      type: DataTypes.TEXT,
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
    tableName: 'TB_Gmail_Part',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Gmail_Part",
        unique: true,
        fields: [
          { name: "messageId" },
          { name: "partId" },
        ]
      },
    ]
  });
};
