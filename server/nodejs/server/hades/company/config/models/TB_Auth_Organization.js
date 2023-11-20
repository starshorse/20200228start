const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Auth_Organization', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "IX_TB_Auth_Organization_seq_orgSeq"
    },
    orgSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TB_Organization',
        key: 'seq'
      },
      unique: "IX_TB_Auth_Organization_seq_orgSeq"
    },
    authKey: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    orgAuthSecret: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    orgAuthSecretExpiredDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    remark: {
      type: DataTypes.STRING(128),
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
    tableName: 'TB_Auth_Organization',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Auth_Organization_seq_orgSeq",
        unique: true,
        fields: [
          { name: "seq" },
          { name: "orgSeq" },
        ]
      },
      {
        name: "PK_TB_Auth_Organization",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
