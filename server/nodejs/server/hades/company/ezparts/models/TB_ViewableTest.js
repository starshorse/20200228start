const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_ViewableTest', {
    aa: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    bb: {
      type: DataTypes.CHAR(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_ViewableTest',
    schema: 'dbo',
    timestamps: false
  });
};
