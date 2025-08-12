const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_도시락주문', {
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
      allowNull: true
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    '일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '주문자': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '주문메뉴': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '가격': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_도시락주문',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_도시락주문",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_도시락주문",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
