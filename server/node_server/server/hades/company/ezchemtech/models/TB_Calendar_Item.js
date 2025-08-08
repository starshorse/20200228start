const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Calendar_Item', {
    calendar_seq: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kind: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    etag: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    htmlLink: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    creator_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    creator_displayName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    organizer_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    transparency: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    iCalUID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reminders_useDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    eventType: {
      type: DataTypes.STRING(20),
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
    tableName: 'TB_Calendar_Item',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Calendar_Item",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
