const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_법인카드명세서', {
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
    '카드구분': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '카드번호': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '승인일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '실청구액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '가맹점명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '계좌출금일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '이용구분': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '현지화폐': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '현지금액': {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true
    },
    '분류코드': {
      type: DataTypes.STRING(10),
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
    tableName: 'TB_법인카드명세서',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_법인카드명세서",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_법인카드명세서",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
