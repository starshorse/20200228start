const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_도시락메뉴', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '메뉴구분': {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "미분류"
    },
    '메뉴': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '가격': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '주문가능여부': {
      type: DataTypes.STRING(10),
      allowNull: true
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
    tableName: 'TB_도시락메뉴',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_도시락메뉴",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
