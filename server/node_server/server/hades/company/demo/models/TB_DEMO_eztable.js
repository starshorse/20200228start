const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_DEMO_eztable', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '수주확정일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '중요긴급보류': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '견적no': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '분할납품': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    Maker: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Cat_No: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    Unit: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    '등록물질명': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    CAS_No: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '물질구분': {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    '등록면제일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '등록면제완료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '화학확인일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '화학확인완료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '총수입량': {
      type: DataTypes.DECIMAL(15,6),
      allowNull: true
    },
    '등록면제비고': {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    '화학확인비고': {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    '발주처': {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    '담당자': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    '수요자': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    '발주일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '발주확인일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '입고일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Batch_No: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '보관': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '납품일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '제조사stock': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Stock: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '납기': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    original_lead_time: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '적용환율': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '수입가': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '기타비용': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '수입총액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '송장번호': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Invoice_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '결제수단': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '결제일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    'Account비고': {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    '계약번호': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ez_po_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Project: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    'Unit_기납품량': {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    '입고일_분할': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '납품일_분할': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '송장번호_분할': {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    '계산서발행일_분할': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '분할납품비고': {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    Space1: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    Space2: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '총판매가_공급가액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '총판매가_부가세액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '계산서발행일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '방식': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '수령일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '취소사유': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    '택배송장번호': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '예비비고3': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    'VAT포함': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '취소여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '공급가액조정': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '수입총액조정': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '비고내용': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    '취소적용후납기일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    'MRO판매가': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '수요자판매가': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    'MRO단가': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    'MRO공급가액': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    'MRO세액': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '소비자단가': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '소비자공급가액': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    '소비자세액': {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    'Claim여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    alarmTalk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    'OC용_송장번호': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '총수입량_납품_후_갱신일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ezt_combi_order_check: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ezt_shipping: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    ezt_hazmat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    min_margin_check: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y"
    },
    early_oc_target: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N"
    },
    sales_product_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    request_date_customer_prepayment: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_mro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    '용도설명서_내용': {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    '용도설명서_연구시간': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dev_remark: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    purity: {
      type: DataTypes.DECIMAL(5,4),
      allowNull: true
    },
    purity_str: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ez_remark: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    ez_remark_to_customer: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    MSDSCOA_req: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '세금계산서_업체변경_발행처': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    delivery_docs_print: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "(NN"
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
    tableName: 'TB_DEMO_eztable',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_DEMO_eztable",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
