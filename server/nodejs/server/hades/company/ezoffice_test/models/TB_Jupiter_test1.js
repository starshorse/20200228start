const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Jupiter_test1', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seq: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_Jupiter_test1',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_Jupit__3213E83F3CEE8C17",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
