const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Organization', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mainDB: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    orgName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    orgCommonName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    orgFullName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    orgType: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    orgBRN: {
      type: DataTypes.CHAR(12),
      allowNull: false
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
    tableName: 'TB_Organization',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Organization",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
