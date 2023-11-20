const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_발주처', {
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
    '국내업체명': {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    '성명': {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    '부서': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '직책': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '휴대전화': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '전화': {
      type: DataTypes.STRING(28),
      allowNull: true
    },
    FAX: {
      type: DataTypes.STRING(27),
      allowNull: true
    },
    '대표EMail_납품용': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    'EMail_세금계산서': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    '사전송금_대상': {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    '비고표시': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    '배송안내_메일구분': {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    '배송방법': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    'MSDS_제공방법': {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    '계산서발행구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '계산서발행시기': {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    '사업자번호': {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    '업체명_사업자등록증': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '대표자': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '업태': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '종목': {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    '배송주소': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '우편번호': {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    '거래명세서_발행구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고4': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고5': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고6': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고7': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고8': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고9': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '비고10': {
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
    tableName: 'TB_발주처',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_발주처",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_발주처_1",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
