const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_분할송금', {
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
    '회사구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '견적no': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '적용환율': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '분할송금액': {
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
    },
    '원화환산금액': {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    '송금은행': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '송금일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Invoice_No: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '비고1': {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(300),
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
    tableName: 'TB_분할송금',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_분할송금",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_분할송금",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
