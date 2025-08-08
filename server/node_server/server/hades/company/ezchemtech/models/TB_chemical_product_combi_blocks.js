const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_chemical_product_combi_blocks', {
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
    chemicalName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    purity: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    altName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    relatedCAS: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    structure: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MFCD: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    formula: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    FW: {
      type: DataTypes.DECIMAL(4,1),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hazmat: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    shipping: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '순도': {
      type: DataTypes.DECIMAL(8,6),
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
    tableName: 'TB_chemical_product_combi_blocks',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_quote_step03",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
