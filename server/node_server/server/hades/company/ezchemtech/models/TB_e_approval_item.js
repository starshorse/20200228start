const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_e_approval_item', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    submitStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "(NN"
    },
    drafterName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    requestType: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    requestTitle: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    requestDesc: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    signatoryNameList: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    resultLatest: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    opinion: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "(N일반"
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
    tableName: 'TB_e_approval_item',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_e_approval_item",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
