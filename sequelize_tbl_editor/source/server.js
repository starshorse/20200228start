
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'app')));

const modelController = require('./controllers/modelController');
const dataController = require('./controllers/dataController');

app.post('/generate-model', modelController.generateModel);
app.get('/model-schema/:table', modelController.getModelAttributes);

app.get('/data/:table', dataController.getAll);
app.post('/data/:table', dataController.create);
app.put('/data/:table/:id', dataController.update);
app.delete('/data/:table/:id', dataController.delete);

app.get('*path', (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
