const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_mro', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    mro_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "IX_TB_mro_2"
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    }
  }, {
    sequelize,
    tableName: 'TB_mro',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_mro",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IX_TB_mro_2",
        unique: true,
        fields: [
          { name: "mro_name" },
        ]
      },
      {
        name: "PK_TB_mro",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
