const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_금융사별상품', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '금융사명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '지역': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '대상': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '등급': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    'LTV_담보비율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    'LTV_이자율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '선후순위미구분_담보비율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '선후순위미구분_이자율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '자체담보평가_담보비율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '자체담보평가_이자율': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '한도_MIN': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '한도_MAX': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '한도_서울': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '대출기간_년': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '대출기간_월': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '상환방법': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '중도상환수수료': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '담보권설정': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '예외사항': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '질권설정': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '기타사항': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '수수료_VAT포함': {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    '환수규정': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '수수료지급일': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '담당자명': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '담당자연락처': {
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
    tableName: 'TB_금융사별상품',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_금융사별상품",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
