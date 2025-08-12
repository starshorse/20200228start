const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_chemical_price_combi_blocks', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cr_seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CAS: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    catalogNo: {
      type: DataTypes.STRING(20),
      allowNull: true
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
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '용량단위': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '용량_g': {
      type: DataTypes.DECIMAL(14,6),
      allowNull: true
    },
    '재고': {
      type: DataTypes.STRING(10),
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
    tableName: 'TB_chemical_price_combi_blocks',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_quote_step02",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
