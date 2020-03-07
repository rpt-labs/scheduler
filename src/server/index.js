var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
  res.json("test");
 });


app.listen(9001, () => {
 console.log("Server running on port 9001");
});

