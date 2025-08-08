var DataTypes = require("sequelize").DataTypes;
var _TB_User = require("./TB_User");

function initModels(sequelize) {
  var TB_User = _TB_User(sequelize, DataTypes);


  return {
    TB_User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
