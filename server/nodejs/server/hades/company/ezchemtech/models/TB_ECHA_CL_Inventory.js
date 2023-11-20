const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_ECHA_CL_Inventory', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    SubstanceName: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    EC: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CAS: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CON_REACH_Registered: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CON_CL_Harmonised: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CON_CL_Notified: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CLH_Index_No_s: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CLH_Classification: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    CLH_Classification_Hcodes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CLH_Labelling: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CLH_Labelling_Hcodes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CLH_Labelling_EUHcodes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CLH_Specific_Conc_Limits_Mfactors: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    CLH_Notes: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CLH_ATP_s_Inserted_Updated: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    All_CL_Notifications: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    All_CL_Classification_with_percent: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    All_CL_Has_Impurit: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    CL_from_REACH_Registrations: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    REACH_Reg_Classification_with_percent: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    REACH_Reg_Has_Impurity: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Infocard_URL: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    CL_Inv_URL: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    REACH_Reg_10_tonnes: {
      type: DataTypes.STRING(10),
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
    tableName: 'TB_ECHA_CL_Inventory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_ECHA_CL_Inventory",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
