const { getModel, sequelize } = require('../utils/getModel');

exports.getAll = async (req, res) => {
  try {
    const tableName = req.params.table;
    const Model = getModel(tableName);
    await sequelize.sync();
    const rows = await Model.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

