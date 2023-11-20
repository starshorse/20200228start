const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Tanker_열람이력', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_Tanker_열람이력"
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    registered_pin_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    requester_key: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    registered_address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    registered_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pnu: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    wgs84_latitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    wgs84_longitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    is_paid: {
      type: DataTypes.STRING(10),
      allowNull: true
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
    tableName: 'TB_Tanker_열람이력',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Tanker_열람이력",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "PK_TB_Tanker_열람이력",
        unique: true,
        fields: [
          { name: "provider_id" },
          { name: "registered_pin_number" },
          { name: "created_datetime" },
        ]
      },
    ]
  });
};
