const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_mail_invoice', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address_from: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    address_to: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    address_cc: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    received_datetime: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    attachments_filename: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    attachments_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '비고4': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    '비고5': {
      type: DataTypes.STRING(45),
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
    tableName: 'TB_mail_invoice',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_mail_invoice",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_mail_invoice",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
