const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Test_01', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    tttt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aaa: {
      type: DataTypes.DECIMAL(11,5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_Test_01',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_Test___DDDFBCBE8B28849D",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};