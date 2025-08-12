const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_TB_chemical_maker_combi_blocks_detail', {
    a: {
      type: DataTypes.CHAR(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: '_TB_chemical_maker_combi_blocks_detail',
    schema: 'dbo',
    timestamps: false
  });
};
