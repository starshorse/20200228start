const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_다모기업', {
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
    '기준일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '구분': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '입고수량': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '출고수량': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '재고수량': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '물류사코드': {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "(N00000142"
    }
  }, {
    sequelize,
    tableName: 'TB_다모기업',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_다모_재고",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
