const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_test_1', {
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
    },
    age: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_test_1',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_test___3213E83F61F42418",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
