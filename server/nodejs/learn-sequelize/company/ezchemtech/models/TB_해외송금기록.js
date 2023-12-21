const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_해외송금기록', {
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
    Maker: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    MakerNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '송금일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Invoice_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Invoice_No: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
    },
    Amount_W: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    Remarks: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '송장번호': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '견적번호': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '송금은행': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Amount_Wtotal: {
      type: DataTypes.INTEGER,
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
    tableName: 'TB_해외송금기록',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_해외송금기록",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_해외송금기록",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
