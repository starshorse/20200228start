const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_collection_apps', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    collection_assignSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    app_assignSeq: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TB_collection_apps',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_colle__DDDFBCBE4099FD28",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
