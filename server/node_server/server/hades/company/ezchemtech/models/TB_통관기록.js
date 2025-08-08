const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_통관기록', {
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
    '견적번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    maker: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '송장번호': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '선적국가': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '생산지국가': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fta: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    hscode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '수입가': {
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
    },
    '실제기타비용': {
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
    },
    '작업일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '비고1': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_통관기록',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_통관기록",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
