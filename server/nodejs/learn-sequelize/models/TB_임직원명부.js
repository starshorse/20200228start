const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_임직원명부', {
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
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '사번': {
      type: DataTypes.DECIMAL(6,0),
      allowNull: true
    },
    '성명': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '회사명': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    '기본메일주소': {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    '직위': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ez_initial: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '입사일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '승진일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '생년월일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '생일': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '퇴사일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '휴가통계대상여부': {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "1"
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
    tableName: 'TB_임직원명부',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_임직원명부",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_임직원명부",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
