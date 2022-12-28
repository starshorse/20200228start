const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_date_table', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_int: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    year_month: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    year_weeknum: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    day_of_week: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '휴일여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(64),
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
    tableName: 'TB_date_table',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_date_table",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_date_table",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
