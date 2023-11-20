const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_구미_현대자동차_검수합격통보서_CKD', {
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
    '입하일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '입고일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '기본단위': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '구매문서번호': {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "NA"
    },
    '순번': {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    '입고구분코드': {
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
    '포장금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false,
      defaultValue: 0
    },
    '내수수출': {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    '자재문서번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '자재전표품목': {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    '자재전표연도': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_구미_현대자동차_검수합격통보서_CKD',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_구미_현대자동차_검수합격통보서_CKD",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
