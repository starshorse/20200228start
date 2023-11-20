const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_chemical_product_astatech', {
    a: {
      type: DataTypes.CHAR(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_chemical_product_astatech',
    schema: 'dbo',
    timestamps: false
  });
};
