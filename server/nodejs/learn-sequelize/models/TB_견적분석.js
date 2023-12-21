const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_견적분석', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '견적번호': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '관세': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '외환': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '마진': {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '기타비용1': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '기타비용2': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '기타비용3': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '계산가격': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    MROfee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    '재발주견적No': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '수기MRO판매가': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    '수기수요자판매가': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_견적분석',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_견적분석",
        fields: [
          { name: "no" },
        ]
      },
      {
        name: "PK_TB_견적분석",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
