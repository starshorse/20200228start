const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_time_log', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    table_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    time1: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time2: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_time_log',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_time_log",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
