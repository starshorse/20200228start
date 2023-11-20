const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_발레오_원자재입고현황', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    No: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    '구매그룹': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '입고일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '품명': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '단위': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '입고수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '입고금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    'Box당수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '비고2': {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_발레오_원자재입고현황',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_발레오_원__DDDFBCBE0E302FEB",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "TB_발레오_원자재입고현황",
        fields: [
          { name: "UpdateDate" },
        ]
      },
    ]
  });
};
