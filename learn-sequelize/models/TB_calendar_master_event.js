const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_calendar_master_event', {
    row_last_created_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    row_last_updated_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creator_email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    is_all_day_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_recurrent_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    html_link: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    recurrence_rules: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    ez_remarks: {
      type: DataTypes.STRING(256),
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
    tableName: 'TB_calendar_master_event',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_calendar_master_event",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_calendar_master_event",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
