const fs = require('fs');
const { getModel, sequelize } = require('../utils/getModel');

exports.getAll = async (req, res) => {
  try {
    const tableName = req.params.table;
    const Model = getModel(tableName);
//    await sequelize.sync();
    const rows = await Model.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// json file transaction function. 
exports.create_json = async ( req, res )=>{
    const tableName = req.params.table;
    const Model = getModel(tableName);
	// rows 데이터를 Object 배열로 변환
	var data = fs.readFileSync('./results/data.json', 'utf8')
	const json = JSON.parse(data);
	const table = json.tables[0];
	const headers = table.headers ;
	const tableRows = table.rows ;

	const dataToInsert = tableRows.map(row => {
		const obj = {};
		headers.forEach((key, idx) => {
			obj[key] = row[idx];
		});
		return obj;
	});
	async function insertWithTransaction() {
		try {
			await sequelize.authenticate();

			await sequelize.transaction(async (t) => {
				await Model.bulkCreate(dataToInsert, { transaction: t });
			});

			console.log('모든 데이터가 트랜잭션내 성공적으로 삽입되었습니다.');
		} catch (error) {
			console.error('트랜잭션 실행중 오류:', error);
		} finally {
			await sequelize.close();
		}
	}
	await insertWithTransaction();
	res.json( dataToInsert );
};

exports.create = async (req, res) => {
  try {
    const tableName = req.params.table;
    const Model = getModel(tableName);
    await sequelize.sync();
    const newRow = await Model.create(req.body);
    res.json(newRow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const tableName = req.params.table;
    const id = req.params.id;
    const Model = getModel(tableName);
    await sequelize.sync();
    const row = await Model.findByPk(id);
    if (!row) return res.status(404).json({ error: 'Row not found' });
    await row.update(req.body);
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const tableName = req.params.table;
    const id = req.params.id;
    const Model = getModel(tableName);
    await sequelize.sync();
    const row = await Model.findByPk(id);
    if (!row) return res.status(404).json({ error: 'Row not found' });
    await row.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

