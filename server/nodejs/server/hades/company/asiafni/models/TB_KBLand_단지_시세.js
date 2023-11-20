const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_KBLand_단지_시세', {
    '시세마감년월일': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    '단지기본일련번호': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '시세물건식별자': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '단지명': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '법정동코드': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    pnu: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '계약면적': {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      primaryKey: true
    },
    '공급면적': {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      primaryKey: true
    },
    '전용면적': {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      primaryKey: true
    },
    '주택형타입내용': {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    '연결구분명': {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    '매매_하위평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '매매_일반평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '매매_상위평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '전세_하위평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '전세_일반평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '전세_상위평균': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '보증금': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '월세': {
      type: DataTypes.STRING(15),
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
    tableName: 'TB_KBLand_단지_시세',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_KBLand_단지_시세",
        fields: [
          { name: "단지명" },
        ]
      },
      {
        name: "PK_TB_KBLand_단지_시세_1",
        unique: true,
        fields: [
          { name: "시세마감년월일" },
          { name: "단지기본일련번호" },
          { name: "계약면적" },
          { name: "공급면적" },
          { name: "전용면적" },
          { name: "주택형타입내용" },
          { name: "연결구분명" },
        ]
      },
    ]
  });
};
