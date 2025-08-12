var DataTypes = require("sequelize").DataTypes;
var _TB_환율 = require("./TB_환율");

function initModels(sequelize) {
  var TB_환율 = _TB_환율(sequelize, DataTypes);


  return {
    TB_환율,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
