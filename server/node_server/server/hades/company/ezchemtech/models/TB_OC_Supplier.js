const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_OC_Supplier', {
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
    Qt_Number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "reply"
    },
    OC_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    OC_Data: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    Is_Fwd_Excluded: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "N"
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
    tableName: 'TB_OC_Supplier',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_OC_Supplier",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_OC_Supplier",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
