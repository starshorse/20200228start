const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_admin_1', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    userSeq: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_admin_1',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_admin__DDDFBCBE4210E8B2",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
