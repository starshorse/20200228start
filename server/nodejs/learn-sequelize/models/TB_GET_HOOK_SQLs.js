const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_GET_HOOK_SQLs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'TB_GET_HOOK_SQLs',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_GET_H__3213E83F42696259",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
