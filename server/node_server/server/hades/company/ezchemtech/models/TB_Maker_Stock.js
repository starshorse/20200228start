const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Maker_Stock', {
    seq: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Maker: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Chemical_Name: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    CAS_No: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Cat_No: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Purity: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    purity_std: {
      type: DataTypes.DECIMAL(7,6),
      allowNull: true
    },
    Stock_w: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Stock_v: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '재고유무': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고': {
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
    tableName: 'TB_Maker_Stock',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Maker_Stock",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_Maker_Stock",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
