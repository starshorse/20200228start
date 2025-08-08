const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_천안_현대자동차_검수합격통보서', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    document_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '차수': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    '공장구분': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '입하일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '외부납품서번호': {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "NA"
    },
    '외부납품서품목번호': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    '입고source': {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '입고구분': {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '입하수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '입고수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '입고금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '입고분량code': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '입고단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '입고일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '구매문서번호': {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "NA"
    },
    '구매문서품목번호': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    'LC차수': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    'LC개설수량': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    'LC입고누계액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false,
      defaultValue: 0
    },
    LC_NO: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "NA"
    },
    '포장단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false,
      defaultValue: 0
    },
    '포장수량': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    shop_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "NA"
    },
    '자재문서번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '자재전표품목': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '자재전표연도': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '통화구분': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    filter: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_천안_현대자동차_검수합격통보서',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_천안_현대자동차_검수합격통보서",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
