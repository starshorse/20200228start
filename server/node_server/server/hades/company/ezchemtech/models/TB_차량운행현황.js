const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_차량운행현황', {
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
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '차량no': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '기록직원': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '기록일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '기록시_운행km': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_차량운행현황',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_차량운행현황",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
