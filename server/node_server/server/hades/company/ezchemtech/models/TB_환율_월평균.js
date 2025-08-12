const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_환율_월평균', {
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
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '년월': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    USD: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    EUR: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    GBP: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    JPY: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(200),
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
    tableName: 'TB_환율_월평균',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_환율_월평균",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_환율_월평균",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
