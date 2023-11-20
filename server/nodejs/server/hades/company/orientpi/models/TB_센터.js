const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_센터', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    '물류센터코드': {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    '물류센터명': {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    }
  }, {
    sequelize,
    tableName: 'TB_센터',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_물류센터",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
