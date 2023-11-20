const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_TEST', {
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
    seqitem: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    draftName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    requestType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    requestDesc: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    signatoryNameList: {
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
    tableName: 'TB_TEST',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_TEST__DDDFBCBE59B88F52",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
