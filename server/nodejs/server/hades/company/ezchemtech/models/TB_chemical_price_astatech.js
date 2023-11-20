const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_chemical_price_astatech', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cr_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "IX_TB_chemical_price_astatech"
    },
    CAS: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "IX_TB_chemical_price_astatech"
    },
    catalogNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "IX_TB_chemical_price_astatech"
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stock: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '회원가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '용량': {
      type: DataTypes.FLOAT,
      allowNull: true,
      unique: "IX_TB_chemical_price_astatech"
    },
    '용량단위': {
      type: DataTypes.STRING(5),
      allowNull: true,
      unique: "IX_TB_chemical_price_astatech"
    },
    '용량_g': {
      type: DataTypes.DECIMAL(14,6),
      allowNull: true
    },
    availability: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '재고': {
      type: DataTypes.STRING(30),
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
    tableName: 'TB_chemical_price_astatech',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_chemical_price_astatech",
        unique: true,
        fields: [
          { name: "cr_seq" },
          { name: "CAS" },
          { name: "catalogNo" },
          { name: "용량" },
          { name: "용량단위" },
        ]
      },
      {
        name: "PK_TB_quote_step02_astatech",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
