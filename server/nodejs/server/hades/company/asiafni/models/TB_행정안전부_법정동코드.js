const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_행정안전부_법정동코드', {
    region_cd: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    sido_cd: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sgg_cd: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    umd_cd: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    ri_cd: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    locatjumin_cd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    locatjijuk_cd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    locatadd_nm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    locat_order: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    locat_rm: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    locathigh_cd: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    locallow_nm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    adpt_de: {
      type: DataTypes.STRING(8),
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
    tableName: 'TB_행정안전부_법정동코드',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_행정안전부_법정동코드",
        unique: true,
        fields: [
          { name: "region_cd" },
        ]
      },
    ]
  });
};
