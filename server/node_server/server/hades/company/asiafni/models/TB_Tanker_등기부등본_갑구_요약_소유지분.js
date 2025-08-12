const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Tanker_등기부등본_갑구_요약_소유지분', {
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
    owner: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    identity_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ownership: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
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
    tableName: 'TB_Tanker_등기부등본_갑구_요약_소유지분',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Tanker_등기부등본_갑구_요약_소유지분",
        unique: true,
        fields: [
          { name: "tanker_seq" },
          { name: "order_number" },
          { name: "owner" },
        ]
      },
    ]
  });
};
