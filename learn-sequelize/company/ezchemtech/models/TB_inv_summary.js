const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_inv_summary', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    maker: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    inv_no: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    inv_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tracking_no: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: true
    },
    proforma_yn: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_inv_summary',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_inv_summary",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_inv_summary",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
