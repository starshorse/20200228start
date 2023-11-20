const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_OC_Config_Qt', {
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
    Is_OC_Sp_Sent: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Y"
    },
    Is_OC_EZ_Sent: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Y"
    },
    Etc: {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_OC_Config_Qt',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_OC_Config_Qt",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_OC_Config_Qt",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
