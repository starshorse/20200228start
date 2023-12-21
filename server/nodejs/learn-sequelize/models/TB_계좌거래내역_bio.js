const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_계좌거래내역_bio', {
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
    '계좌명칭': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '계좌번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '거래일시': {
      type: DataTypes.DATE,
      allowNull: false
    },
    '거래일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '거래구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '입금액': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    '출금액': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    '잔액': {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    '적요': {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    CT_no: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    '송장번호': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '관세': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '부가세': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '입출금코드': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '입출금정리여부': {
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
    tableName: 'TB_계좌거래내역_bio',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_계좌거래내역_bio",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_계좌거래내역_bio",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
