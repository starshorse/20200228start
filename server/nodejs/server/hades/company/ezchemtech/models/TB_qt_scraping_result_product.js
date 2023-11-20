const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_qt_scraping_result_product', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    crSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "IX_TB_qt_scraping_result_product_crSeq_makerName_casNo_catNo"
    },
    makerName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "IX_TB_qt_scraping_result_product_crSeq_makerName_casNo_catNo"
    },
    casNo: {
      type: DataTypes.STRING(13),
      allowNull: true,
      unique: "IX_TB_qt_scraping_result_product_crSeq_makerName_casNo_catNo"
    },
    catNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "IX_TB_qt_scraping_result_product_crSeq_makerName_casNo_catNo"
    },
    chemicalName: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    purityOri: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    purityStd: {
      type: DataTypes.DECIMAL(7,6),
      allowNull: true
    },
    mdlNo: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    formula: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    molWeight: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: true
    },
    appearance: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unNoOri: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    unNoStd: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    hazardClassOri: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hazardClassStd: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: true
    },
    packingGroupOri: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    packingGroupStd: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    signalWord: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    storageConditionOri: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    storageConditionStd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    transportationOri: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    transportationStd: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    etc: {
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
    tableName: 'TB_qt_scraping_result_product',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_qt_scraping_result_product_crSeq_makerName_casNo_catNo",
        unique: true,
        fields: [
          { name: "crSeq" },
          { name: "makerName" },
          { name: "casNo" },
          { name: "catNo" },
        ]
      },
      {
        name: "PK_TB_qt_scraping_result_product",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
