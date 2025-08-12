const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_지역별LTV', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_지역별LTV"
    },
    '지역명': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    LTV: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false
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
    tableName: 'TB_지역별LTV',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_지역별LTV",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_지역별LTV",
        unique: true,
        fields: [
          { name: "지역명" },
        ]
      },
    ]
  });
};
