const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_수입신고내역', {
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
    '신고번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '송장번호': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '결제금액': {
      type: DataTypes.DECIMAL(15,0),
      allowNull: false
    },
    '환종류': {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    '총세액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '관세': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '부가세': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '과세가격': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '신고일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '수리일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '세관': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    CT_no: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    '계좌출금일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '귀속년도1': {
      type: DataTypes.DECIMAL(4,0),
      allowNull: true
    },
    '귀속년도2': {
      type: DataTypes.DECIMAL(4,0),
      allowNull: true
    },
    '귀속년도3': {
      type: DataTypes.DECIMAL(4,0),
      allowNull: true
    },
    '귀속년도4': {
      type: DataTypes.DECIMAL(4,0),
      allowNull: true
    },
    '구분': {
      type: DataTypes.STRING(2),
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
    tableName: 'TB_수입신고내역',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_수입신고내역",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_수입신고내역",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
