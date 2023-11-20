const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_e_approval_request', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    seqItem: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    drafterName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    requestType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    requestTitle: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    requestDesc: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    signatoryNameLIst: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    processDesc: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    result: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TB_e_approval_request',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_e_app__DDDFBCBE602B0986",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
