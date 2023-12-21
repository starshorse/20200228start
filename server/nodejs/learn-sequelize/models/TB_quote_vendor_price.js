const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_quote_vendor_price', {
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
      allowNull: false
    },
    cas_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cat_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    purity: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    '재고수량': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '재고표시': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '납기': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고': {
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
    tableName: 'TB_quote_vendor_price',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_quote_vendor_price",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_quote_vendor_price",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
