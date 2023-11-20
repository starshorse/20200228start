const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_User', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "IX_TB_User_seq_orgSeq_authOrgSeq"
    },
    orgSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TB_Auth_Organization',
        key: 'seq'
      },
      unique: "IX_TB_User_seq_orgSeq_authOrgSeq"
    },
    authOrgSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TB_Auth_Organization',
        key: 'seq'
      },
      unique: "IX_TB_User_seq_orgSeq_authOrgSeq"
    },
    defaultDB: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dbLoginID: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dbLoginPWD: {
      type: DataTypes.STRING(100),
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
    tableName: 'TB_User',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_User_seq_orgSeq_authOrgSeq",
        unique: true,
        fields: [
          { name: "seq" },
          { name: "orgSeq" },
          { name: "authOrgSeq" },
        ]
      },
      {
        name: "PK_TB_User",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
