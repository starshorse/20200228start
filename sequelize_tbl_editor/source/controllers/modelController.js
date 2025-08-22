const fs = require('fs');
const path = require('path');

exports.generateModel = (req, res) => {
  const { tableName, attributes } = req.body;
  if (!tableName || !attributes) {
    return res.status(400).send('Invalid JSON format');
  }

  const modelAttributes = Object.entries(attributes)
    .map(([key, value]) => `${key}: {\n      type: DataTypes.${value.type},\n      allowNull: ${value.allowNull}\n    }`)
    .join(',\n    ');

  const modelContent = `'use strict';
module.exports = (sequelize, DataTypes) => {
  const ${tableName} = sequelize.define('${tableName}', {
    ${modelAttributes}
  }, {});
  return ${tableName};
};
`;

  fs.writeFileSync(
    path.join(__dirname, '../models', `${tableName}.js`),
    modelContent
  );

  const migrationAttributes = Object.entries(attributes)
    .map(([key, value]) => `${key}: {
        type: Sequelize.${value.type},
        allowNull: ${value.allowNull}
      }`)
    .join(',\n      ');

  const migrationContent = `'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('${tableName}', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ${migrationAttributes},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('${tableName}');
  }
};
`;

  const migrationFileName = `${Date.now()}-create-${tableName}.js`;
  fs.writeFileSync(
    path.join(__dirname, '../migrations', migrationFileName),
    migrationContent
  );

  const { exec } = require('child_process');
  exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).send('Migration failed');
    }
    res.send('Model and migration created and migrated successfully');
  });
};

exports.getModelAttributes = (req, res) => {
  const tableName = req.params.table;
  try {
    const modelPath = path.join(__dirname, '../models', `${tableName}.js`);
    if (!fs.existsSync(modelPath)) throw new Error('Model file not found');
    const modelFile = fs.readFileSync(modelPath, 'utf-8');
    const attrMatch = modelFile.match(/define\([^,]+,\s*{([\s\S]*?)}\s*,/);
    if (!attrMatch) throw new Error('Attributes not found');
    const attrBlock = attrMatch[1];
    const lines = attrBlock.split('\n').map(l => l.trim()).filter(Boolean);
    const attributes = {};
    let curKey = null;
    lines.forEach(line => {
      if (line.endsWith(': {')) {
        curKey = line.split(':')[0];
        attributes[curKey] = {};
      } else if (curKey && /type: DataTypes\.(\w+)/.test(line)) {
        attributes[curKey].type = line.match(/type: DataTypes\.(\w+)/)[1];
      } else if (curKey && /allowNull: (true|false)/.test(line)) {
        attributes[curKey].allowNull = line.match(/allowNull: (true|false)/)[1] === 'true';
      } else if (line === '},') {
        curKey = null;
      }
    });
    res.json({ tableName, attributes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

