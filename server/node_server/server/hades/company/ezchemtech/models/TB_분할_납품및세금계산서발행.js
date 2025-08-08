const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_분할_납품및세금계산서발행', {
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
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '견적번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '항목': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '납품완료여부': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '발행완료여부': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '예정일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '완료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '내용설명': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ea: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    batch_no: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '관련_수입송장번호': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '환종류': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    '외화금액_수입': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '입고일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '공급가액_매출': {
      type: DataTypes.DECIMAL(14,2),
      allowNull: true
    },
    '부가세_매출': {
      type: DataTypes.DECIMAL(14,2),
      allowNull: true
    },
    '총액_매출': {
      type: DataTypes.DECIMAL(14,2),
      allowNull: true
    },
    '대금수령방식': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '대금수령일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_분할_납품및세금계산서발행',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_분할_납품및세금계산서발행",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_분할_납품및세금계산서발행",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
