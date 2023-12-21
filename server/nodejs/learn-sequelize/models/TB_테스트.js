const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_테스트', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    _nvarchar: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    _nchar: {
      type: DataTypes.CHAR(16),
      allowNull: true
    },
    _datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    _date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    _time: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    _decimal: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    _int: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    _bigint: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    _float: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    _money: {
      type: DataTypes.DECIMAL(19,4),
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
    tableName: 'TB_테스트',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_테스트",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
