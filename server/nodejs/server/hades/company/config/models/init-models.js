var DataTypes = require("sequelize").DataTypes;
var _TB_Auth_Organization = require("./TB_Auth_Organization");
var _TB_Organization = require("./TB_Organization");
var _TB_User = require("./TB_User");

function initModels(sequelize) {
  var TB_Auth_Organization = _TB_Auth_Organization(sequelize, DataTypes);
  var TB_Organization = _TB_Organization(sequelize, DataTypes);
  var TB_User = _TB_User(sequelize, DataTypes);

  TB_User.belongsTo(TB_Auth_Organization, { as: "authOrgSeq_TB_Auth_Organization", foreignKey: "authOrgSeq"});
  TB_Auth_Organization.hasMany(TB_User, { as: "TB_Users", foreignKey: "authOrgSeq"});
  TB_User.belongsTo(TB_Auth_Organization, { as: "orgSeq_TB_Auth_Organization", foreignKey: "orgSeq"});
  TB_Auth_Organization.hasMany(TB_User, { as: "orgSeq_TB_Users", foreignKey: "orgSeq"});
  TB_Auth_Organization.belongsTo(TB_Organization, { as: "orgSeq_TB_Organization", foreignKey: "orgSeq"});
  TB_Organization.hasMany(TB_Auth_Organization, { as: "TB_Auth_Organizations", foreignKey: "orgSeq"});

  return {
    TB_Auth_Organization,
    TB_Organization,
    TB_User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
