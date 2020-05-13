const express = require('express');
const cors = require('cors');
const api = require('./utils/api');
const curriculum = require('./routes/curriculum');
const cohortMap = require('../../config/cohortMap');

const port = process.env.PORT || 9001;

const app = express();
app.use(cors());

app.get('/curriculum/:cohortName', async (req, res) => {
  const cohortId = cohortMap[req.params.cohortName];
  const data = await api.getCurriculum(cohortId);
  res.status(200).send(data);
});

app.use('/scheduler/curriculum', curriculum);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
