const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Tanker_등기부등본_을구_요약', {
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
      allowNull: false,
      primaryKey: true
    },
    receipt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    register_info: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    target_stakeholder: {
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
    tableName: 'TB_Tanker_등기부등본_을구_요약',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Tanker_등기부등본_을구_요약",
        unique: true,
        fields: [
          { name: "tanker_seq" },
          { name: "order_number" },
          { name: "purpose" },
        ]
      },
    ]
  });
};
