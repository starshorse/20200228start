const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_KBLand_WGS_단지', {
    '단지기본일련번호': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    'wgs84위도': {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    'wgs84경도': {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    '단지명': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '세대수': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '준공년도': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '준공월': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '용적률': {
      type: DataTypes.DECIMAL(4,1),
      allowNull: true
    },
    '건폐율': {
      type: DataTypes.DECIMAL(4,1),
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
    tableName: 'TB_KBLand_WGS_단지',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_KBLand_단지",
        unique: true,
        fields: [
          { name: "단지기본일련번호" },
        ]
      },
    ]
  });
};
