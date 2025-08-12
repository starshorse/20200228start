const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Calendar', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_Calendar"
    },
    kind: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    etag: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    summary: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    timeZone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    colorId: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    backgroundColor: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    foregroundColor: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    selected: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    accessRole: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    primary: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nextSyncToken: {
      type: DataTypes.STRING(50),
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
    tableName: 'TB_Calendar',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Calendar",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_Calendar",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
