const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Tanker_등기부등본_표제부', {
    tanker_seq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    building_area: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true
    },
    building_structure: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    land_category: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    land_right_area: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    land_right_ratio: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    land_right_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    register_ledger_url: {
      type: DataTypes.STRING(2000),
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
    tableName: 'TB_Tanker_등기부등본_표제부',
    schema: 'dbo',
    timestamps: false
  });
};
