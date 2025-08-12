const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_공간정보시스템_좌표', {
    sig_cd: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    sig_eng_nm: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sig_kor_nm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    'wgs84_위도': {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    'wgs84_경도': {
      type: DataTypes.FLOAT,
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
    tableName: 'TB_공간정보시스템_좌표',
    schema: 'dbo',
    timestamps: false
  });
};
