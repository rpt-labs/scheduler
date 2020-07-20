const express = require('express');
const cors = require('cors');
const api = require('./utils/api');
const curriculum = require('./routes/curriculum');
const cohortMap = require('../../config/cohortMap');

const db = require('../db/database');

const port = process.env.PORT || 9001;

const app = express();
app.use(cors());

app.get('/api/cohorts', (req, res) => {
  const sql = 'select * from cohorts';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.get('/curriculum/:cohortName', async (req, res) => {
  const cohortId = cohortMap[req.params.cohortName];
  const data = await api.getCurriculum(cohortId);
  res.status(200).send(data);
});

app.patch('/release/:url', async (req, res) => {
  const { url } = req.params;
  const data = await api.releaseUnitForCohort(url);
  res.status(200).send(data);
});

app.use('/scheduler/curriculum', curriculum);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
