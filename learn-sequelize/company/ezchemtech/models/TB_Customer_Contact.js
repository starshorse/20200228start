const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Customer_Contact', {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: "IX_TB_Customer_Contact"
    },
    Customer_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ContactType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    Contact: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "IX_TB_Customer_Contact_연락처"
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
    tableName: 'TB_Customer_Contact',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_Customer_Contact",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
      {
        name: "IX_TB_Customer_Contact_연락처",
        unique: true,
        fields: [
          { name: "Contact" },
        ]
      },
      {
        name: "PK_TB_CustomerContact",
        unique: true,
        fields: [
          { name: "Customer_seq" },
          { name: "UserType" },
          { name: "ContactType" },
        ]
      },
    ]
  });
};
