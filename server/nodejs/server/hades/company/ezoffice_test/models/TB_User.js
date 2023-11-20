const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_User', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_User',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_User__DDDFBCBE21F07D1A",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
