const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_물류사_품번', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '물류사코드': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '물류사명': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '품명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '공정': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '공정명': {
      type: DataTypes.STRING(20),
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'TB_물류사_품번',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_물류사_품번",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
