const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_KBLand_WGS_시도', {
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
    '시도명': {
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
    tableName: 'TB_KBLand_WGS_시도',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_KBLand_시도",
        unique: true,
        fields: [
          { name: "법정동코드" },
        ]
      },
    ]
  });
};
