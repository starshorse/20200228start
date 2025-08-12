const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_배송안내메일', {
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
    '견적번호': {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    '작업자': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '비고1': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(50),
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
    tableName: 'TB_배송안내메일',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_배송안내메일",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_배송안내메일",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
