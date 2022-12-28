const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_고액송금총괄', {
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
    '회사구분': {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    '발주일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '견적번호': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Maker: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '송금총액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: 0.00
    },
    '송금여부': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    '원화환산액': {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    '취소여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고3': {
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
    tableName: 'TB_고액송금총괄',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_고액송금총괄",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_고액송금총괄",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
