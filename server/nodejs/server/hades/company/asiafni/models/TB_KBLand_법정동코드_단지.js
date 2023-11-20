const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_KBLand_법정동코드_단지', {
    '단지기본일련번호': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '시세물건식별자': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '단지명': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '법정동코드': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '주소': {
      type: DataTypes.STRING(50),
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
    tableName: 'TB_KBLand_법정동코드_단지',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_KBLand_법정동코드_단지",
        unique: true,
        fields: [
          { name: "단지기본일련번호" },
        ]
      },
    ]
  });
};
