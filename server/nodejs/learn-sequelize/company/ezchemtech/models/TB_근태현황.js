const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_근태현황', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '사번': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '성명': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '지급일수': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '전체사용일수': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '차감사용일수': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '미차감사용일수': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    '잔여일수': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    id_jpt: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_근태현황',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_근태현황__3213E83F672F172D",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
