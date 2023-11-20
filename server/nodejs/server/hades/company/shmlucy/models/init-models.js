var DataTypes = require("sequelize").DataTypes;
var _TB_admin_1 = require("./TB_admin_1");

function initModels(sequelize) {
  var TB_admin_1 = _TB_admin_1(sequelize, DataTypes);


  return {
    TB_admin_1,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
