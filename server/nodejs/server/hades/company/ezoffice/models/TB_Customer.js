const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Customer', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_Customer"
    },
    BRN: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    CompanyName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    BusinessAddress: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RepresentativeName: {
      type: DataTypes.STRING(20),
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
    tableName: 'TB_Customer',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Customer",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_Customer_1",
        unique: true,
        fields: [
          { name: "CompanyName" },
        ]
      },
    ]
  });
};
