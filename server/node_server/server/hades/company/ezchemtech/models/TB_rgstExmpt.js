const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_rgstExmpt', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    '면제구분': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '수입제조구분': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '접수번호': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '접수일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '담당자명': {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    CAS_No: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    '화학물질명': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '자료보호': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '면제확인대상및사유': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '상품명': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '사용용도': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '수입수출국': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '연간제조수입예정량': {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    '금회제조수입량': {
      type: DataTypes.DECIMAL(15,6),
      allowNull: true
    },
    '기업구분': {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    '상태': {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    '서식발행번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '등록일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '대상여부': {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    '비대상사유': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '견적no': {
      type: DataTypes.STRING(20),
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
    tableName: 'TB_rgstExmpt',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_rgstExmpt",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "PK_TB_rgstExmpt",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
