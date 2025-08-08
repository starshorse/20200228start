const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_매입전자세금계산서', {
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '년월': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '작성일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '승인번호': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    '전송일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '공급자사업자no': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '수요자사업자no': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '종사업장번호': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '통계용공급자사업자no': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '상호': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '대표자명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '합계금액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '공급가액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '세액': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '분류': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '종류': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '유형': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '공급자이메일': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '원가구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '송장번호': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '예비1': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '예비2': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '예비3': {
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
    tableName: 'TB_매입전자세금계산서',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_매입전자세금계산서",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_매입전자세금계산서",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
