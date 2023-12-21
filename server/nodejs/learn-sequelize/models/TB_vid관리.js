const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_vid관리', {
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '성명': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '신청내용': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(200),
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
    tableName: 'TB_vid관리',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_vid관리",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_vid관리",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
