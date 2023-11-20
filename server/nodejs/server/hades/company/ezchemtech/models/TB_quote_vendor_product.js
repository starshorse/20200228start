const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_quote_vendor_product', {
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
    Time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '작업id': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    maker: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "IX_TB_quote_vendor_product_2"
    },
    cas_no: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "IX_TB_quote_vendor_product_2"
    },
    cat_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "IX_TB_quote_vendor_product_2"
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    un_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    packing_group: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    storage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipping: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(300),
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
    tableName: 'TB_quote_vendor_product',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_quote_vendor_product",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IX_TB_quote_vendor_product_2",
        unique: true,
        fields: [
          { name: "maker" },
          { name: "cas_no" },
          { name: "cat_no" },
        ]
      },
      {
        name: "PK_TB_quote_vendor_product",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
