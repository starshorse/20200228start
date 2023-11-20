const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_국토교통부_아파트매매자료', {
    '지역코드': {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    '일련번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '계약일': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    '법정동': {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    '아파트': {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    '지번': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '층': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '계약연월': {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    '년': {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    '월': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '일': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '거래금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false,
      primaryKey: true
    },
    '거래유형': {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    '건축년도': {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    '전용면적': {
      type: DataTypes.FLOAT,
      allowNull: false,
      primaryKey: true
    },
    '중개사소재지': {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true
    },
    '해제여부': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '해제사유발생일': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_국토교통부_아파트매매자료',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_국토교통부_아파트매매자료_1",
        unique: true,
        fields: [
          { name: "지역코드" },
          { name: "계약일" },
          { name: "법정동" },
          { name: "아파트" },
          { name: "층" },
          { name: "계약연월" },
          { name: "거래금액" },
          { name: "거래유형" },
          { name: "건축년도" },
          { name: "전용면적" },
          { name: "중개사소재지" },
        ]
      },
    ]
  });
};
