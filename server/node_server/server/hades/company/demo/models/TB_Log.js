const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Log', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    historyId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    requestType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    clientMachineType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    clientMachineHostName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    clientAppName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    clientAppPath: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    clientAppVersion: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    clientAppProcessedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rowNum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dbName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    tableName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    keyValue: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    queryType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    query: {
      type: DataTypes.TEXT,
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
    tableName: 'TB_Log',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Log",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
