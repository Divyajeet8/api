const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const abc = require("./abc");
const def = require("./def");

app.use(bodyParser.json());

app.use("/v1", abc);
app.use("/v3", def);

const PORT = 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server working on port " + PORT);
  } else {
    console.log("error");
  }
});
