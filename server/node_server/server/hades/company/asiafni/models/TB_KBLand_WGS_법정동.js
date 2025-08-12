const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_KBLand_WGS_법정동', {
    '법정동코드': {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    'wgs84중심위도': {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    'wgs84중심경도': {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    '법정동명': {
      type: DataTypes.STRING(10),
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
    tableName: 'TB_KBLand_WGS_법정동',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_KBLand_법정동",
        unique: true,
        fields: [
          { name: "법정동코드" },
        ]
      },
    ]
  });
};
