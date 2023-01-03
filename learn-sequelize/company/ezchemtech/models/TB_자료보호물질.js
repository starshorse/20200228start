const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_자료보호물질', {
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
      allowNull: false
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '삭제일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '숨김일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '법인구분': {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '접수일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '대표_견적no': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '나머지_견적no': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '접수번호': {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    '관리번호': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '차수': {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    '만료예정일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '만료여부': {
      type: DataTypes.STRING(2),
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
    tableName: 'TB_자료보호물질',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_자료보호물질",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "PK_TB_자료보호물질",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
