var DataTypes = require("sequelize").DataTypes;
var _TB_ViewableTest = require("./TB_ViewableTest");

function initModels(sequelize) {
  var TB_ViewableTest = _TB_ViewableTest(sequelize, DataTypes);


  return {
    TB_ViewableTest,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
