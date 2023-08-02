/*
Using Axios timeout to make your application more efficient

*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {setTimeout} = require('timers/promises');

app.get('/', (req, res) => {
  res.json({
    message: `alive`,
  });
});

app.get('/api/mock-response-time/:milliseconds', async (req, res) => {
  console.log(`Api hit`, req.params);
  const waitMs = req.params.milliseconds || 100;
  await setTimeout(waitMs);
  res.json({
    message: `responded after waiting for ${req.params.milliseconds} milliseconds (ms)`
  });
});

app.listen(port, () => {
  console.log(`Slow API app listening on port ${port}`);
});
