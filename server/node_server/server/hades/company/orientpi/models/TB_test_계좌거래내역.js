const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_test_계좌거래내역', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '계좌명칭': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '계좌번호': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '거래일시': {
      type: DataTypes.DATE,
      allowNull: true
    },
    '거래일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '거래구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '입금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '출금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '잔액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '적요': {
      type: DataTypes.STRING(100),
      allowNull: true
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
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '부가세': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '입출금코드': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '입출금정리여부': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '사업자번호': {
      type: DataTypes.STRING(12),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_test_계좌거래내역',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_test___DDDFBCBECEA159C3",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
