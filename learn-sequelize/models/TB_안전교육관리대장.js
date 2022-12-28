const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_안전교육관리대장', {
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
    '교육명': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '교육자': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '참석자': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '교육시간': {
      type: DataTypes.DATE,
      allowNull: true
    },
    '내용': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고1': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고2': {
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
    tableName: 'TB_안전교육관리대장',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_안전교육관리대장",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_안전교육관리대장",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
