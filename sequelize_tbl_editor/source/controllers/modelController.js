const fs = require('fs');
const path = require('path');

exports.generateModelJson = ( req, res, next )=>{
	const tableName = req.params.table ;
	var result 
	// 파일 읽기 예시
	fs.readFile('./results/data.json', 'utf8', (err, data) => {
		if (err) throw err;
		const json = JSON.parse(data);
		const table = json.tables[0];

		const attributes = {};
		// 가능한 첫 rows의 값을 검사해 데이터 타입을 판단
		table.headers.forEach((key, idx) => {
			let type = "STRING";
			const value = table.rows[0][idx];

			if (typeof value === "number") {
				if (Number.isInteger(value)) {
					type = "INTEGER";
				} else {
					type = "DECIMAL(10,2)";
				}
			} else if (!isNaN(Number(value)) && value !== null && value !== "") {
				// 문자열이라도 숫자값이면 타입 판단 (예: '123.45', '77')
				if (value.toString().indexOf('.') >= 0) {
					type = "DECIMAL(10,2)";
				} else {
					type = "INTEGER";
				}
			}
			attributes[key] = { type, allowNull: true };
		});

		result = {
			// tableName: table.table_id,
			tableName: tableName,
			attributes
		};

		console.log(JSON.stringify(result, null, 2));
		if( result ){
			req.body = result ;
			next();
		}else{
			return res.json({ STATUS: -1 , ERRORMESSAGE: 'result not defined' })
		}
	});
}

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
  }, { freezeTableName : true });
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
      seq: {
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

