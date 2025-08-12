const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Tanker_등기부등본_갑구', {
    tanker_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    purpose: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receipt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    extra: {
      type: DataTypes.STRING(200),
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
    tableName: 'TB_Tanker_등기부등본_갑구',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Tanker_등기부등본_갑구",
        unique: true,
        fields: [
          { name: "tanker_seq" },
          { name: "order_number" },
        ]
      },
    ]
  });
};
