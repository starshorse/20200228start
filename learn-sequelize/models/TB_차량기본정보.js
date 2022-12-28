const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_차량기본정보', {
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
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '차량no': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '차량no_전체': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '차종': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '유종': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '인수구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '인수시_운행km': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    '엔진오일교환km': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '차량연식': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '법인구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '사용방식': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '대여회사': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '대여개월수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '대여시작일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '대여종료일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '월_지급액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '관리자_정': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '관리자_부': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '매각여부': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(1000),
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
    tableName: 'TB_차량기본정보',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_차량기본정보",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_차량기본정보",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
