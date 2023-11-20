const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_해외명단', {
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
    '업체명': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'a국가명': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    'a정식상호': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    'a주소': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    'a전화번호': {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    aFAX: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    'b국가명': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    'b상호': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    'b주소': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    'b전화번호': {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    bFAX: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    Wire_transfer_fee: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '수출자이메일': {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    '송금시_적용국적': {
      type: DataTypes.STRING(14),
      allowNull: true
    },
    '통화': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '은행명': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '은행코드': {
      type: DataTypes.STRING(28),
      allowNull: true
    },
    Swift_Code: {
      type: DataTypes.STRING(23),
      allowNull: true
    },
    '은행주소': {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    '수출자계좌번호': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    IBAN_CODE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '주기': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '폴더명': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '파일명': {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    '담당자이름': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '중계은행': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '송금시_주의사항': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '결제조건1': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '결제조건2': {
      type: DataTypes.STRING(22),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고4': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '주문시_주의사항': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '주문이메일': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    'Order_Confirm_이메일': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    '회계담당메일': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    '견적담당자이름': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '예비5': {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    '예비6': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '예비7': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '예비8': {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    '예비9': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '예비10': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    eval_web_qt: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    eval_maker_grade: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    pubchem_name: {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_해외명단',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_해외명단",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
