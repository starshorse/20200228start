const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_TEST', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    test1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    test2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    test3: {
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
    tableName: 'TB_TEST',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_TEST",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
