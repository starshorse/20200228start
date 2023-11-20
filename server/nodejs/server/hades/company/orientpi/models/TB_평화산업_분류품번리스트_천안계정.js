const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_평화산업_분류품번리스트_천안계정', {
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
    '계정': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '회사명': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '품번수정': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_평화산업_분류품번리스트_천안계정',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_평화산업___DDDFBCBEBA09536C",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
