const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_환율', {
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
    '일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '요일': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    USD: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    EUR: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    GBP: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    YEN: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    USD2: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    EUR2: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    GBP2: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    YEN2: {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    '예비1': {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    '예비2': {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
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
    tableName: 'TB_환율',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_환율",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
