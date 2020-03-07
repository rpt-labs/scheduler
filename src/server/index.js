const express = require('express');
const cors = require('cors');
const api = require('./utils/api');

const app = express();
app.use(cors());

app.get("/curriculum/:cohortId", async (req, res, next) => {
  const data = await api.getCurriculum(req.params.cohortId);
  res.status(200).send(data)
});


app.listen(9001, () => {
 console.log("Server running on port 9001");
});

