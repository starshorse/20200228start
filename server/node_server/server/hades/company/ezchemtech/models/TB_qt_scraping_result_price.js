const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_qt_scraping_result_price', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    crSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    makerName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    casNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    catNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    unitOri: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    unitStd: {
      type: DataTypes.DECIMAL(14,6),
      allowNull: true
    },
    normalPrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    memberPrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    stockMainOri: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    stockMainStd: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stockSubOri: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    stockSubStd: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stockMainAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    stockSubAvailable: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'TB_qt_scraping_result_price',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_qt_scraping_result_price",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
