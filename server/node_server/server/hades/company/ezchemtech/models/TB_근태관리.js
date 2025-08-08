const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_근태관리', {
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '사번': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '성명': {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    '종류': {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    '사용일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '휴가일수차감여부': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    '비고': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_근태관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_근태관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
