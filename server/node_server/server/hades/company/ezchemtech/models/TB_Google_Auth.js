const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Google_Auth', {
    serviceType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    credentials: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(1000),
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
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_Google_Auth',
    schema: 'dbo',
    timestamps: false
  });
};
