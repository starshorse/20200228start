const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_국토교통부_아파트매매자료_요약', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    '연월': {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    '지역코드': {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    '저장상태': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '조회개수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '직전조회개수': {
      type: DataTypes.INTEGER,
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
    tableName: 'TB_국토교통부_아파트매매자료_요약',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_국토교통부_아파트매매자료_요약",
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_국토교통부_아파트매매자료_요약_1",
        unique: true,
        fields: [
          { name: "연월" },
          { name: "지역코드" },
        ]
      },
    ]
  });
};
