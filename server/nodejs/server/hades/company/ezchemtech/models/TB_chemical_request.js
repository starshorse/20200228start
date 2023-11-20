const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_chemical_request', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    qtInitial: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    qtDecimal: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    casNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    makerName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    catNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    messageId: {
      type: DataTypes.STRING(20),
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
    tableName: 'TB_chemical_request',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_quote_request",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
