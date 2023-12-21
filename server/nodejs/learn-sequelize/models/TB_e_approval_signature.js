const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_e_approval_signature', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seqRequest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seqItem: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    signatureOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    signatoryName: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    decision: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    opinion: {
      type: DataTypes.STRING(256),
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
    tableName: 'TB_e_approval_signature',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_e_approval_signature",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
