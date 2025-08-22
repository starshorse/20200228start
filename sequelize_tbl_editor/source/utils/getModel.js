const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../db/database.sqlite'),
  logging: false
});

function getModel(tableName) {
  delete require.cache[require.resolve(`../models/${tableName}.js`)];
  const modelDef = require(`../models/${tableName}.js`);
  return modelDef(sequelize, DataTypes);
}

module.exports = { sequelize, getModel };

