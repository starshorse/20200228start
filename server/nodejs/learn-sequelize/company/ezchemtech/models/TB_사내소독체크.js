const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_사내소독체크', {
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '날짜': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '시간': {
      type: DataTypes.TIME,
      allowNull: true
    },
    '작성자': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_사내소독체크',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_사내소독체크",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_사내소독체크",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
