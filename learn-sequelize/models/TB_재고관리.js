const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_재고관리', {
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
    '견적번호': {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    maker: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cat_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cas_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '입고일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '최초재고': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '최초재고가격_외화': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '최초재고가격_원화': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '가격산출근거': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '현재재고': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '위치': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '판매완료여부': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '재고발생사유': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '판매현황': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고2': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    '비고3': {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'TB_재고관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_재고관리",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_재고관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
