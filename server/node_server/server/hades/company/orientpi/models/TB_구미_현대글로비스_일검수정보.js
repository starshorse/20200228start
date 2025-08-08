const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_구미_현대글로비스_일검수정보', {
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
    No: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '묶음번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '발주번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '오더넘버': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '품명': {
      type: DataTypes.STRING(50),
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
      allowNull: false
    },
    '입고일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '포장장': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '사업장': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '매입단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '매입통화': {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_구미_현대글로비스_일검수정보',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_구미_현대글로비스_일검수정보",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
