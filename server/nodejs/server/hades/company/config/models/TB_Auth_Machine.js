const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Auth_Machine', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq"
    },
    orgSeq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TB_User',
        key: 'seq'
      },
      unique: "IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq"
    },
    authOrgSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TB_User',
        key: 'seq'
      },
      unique: "IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq"
    },
    userSeq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TB_User',
        key: 'seq'
      },
      unique: "IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq"
    },
    authOrgUserSeq: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isUnattended: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    machAuthSecret: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    machAuthSecretExpiredDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    machAuthIdentifier: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    machInfo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    userMemo: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: "(N@"
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
    tableName: 'TB_Auth_Machine',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq",
        unique: true,
        fields: [
          { name: "seq" },
          { name: "orgSeq" },
          { name: "authOrgSeq" },
          { name: "userSeq" },
        ]
      },
      {
        name: "PK_TB_Auth_Machine",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "UX_TB_Auth_Machine_machAuthSecret",
        unique: true,
        fields: [
          { name: "machAuthSecret" },
        ]
      },
    ]
  });
};
