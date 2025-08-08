const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_퇴근이야', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    tttt: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    aaa: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    '금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_퇴근이야',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_퇴근이야__DDDFBCBEF5EC02F8",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
