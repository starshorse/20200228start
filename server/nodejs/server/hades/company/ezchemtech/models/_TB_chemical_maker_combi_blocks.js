const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_TB_chemical_maker_combi_blocks', {
    chemicalName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    catalogNo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    CAS: {
      type: DataTypes.STRING(20),
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
    tableName: '_TB_chemical_maker_combi_blocks',
    schema: 'dbo',
    timestamps: false
  });
};
