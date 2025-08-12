const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_ez_email_list', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    row_created_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    row_last_updated_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email_type: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(64),
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
    tableName: 'TB_ez_email_list',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_ez_email_list",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "PK_TB_ez_email_list",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
