const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Log_Collector', {
    seq: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hostname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    filepath: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    errormessage: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rownum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_Log_Collector',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_Log_Collector",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
