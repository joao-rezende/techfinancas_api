const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

consign({ cwd: __dirname })
  .then("controllers")
  .include("config/routes.js")
  .into(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});