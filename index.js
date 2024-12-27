const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const bodyParser = require("body-parser");

// routers
const routersApiVer1 = require("./api/v1/routers/index.router");

const app = express();
const port = process.env.PORT;

database.connect();

// parse application.json
app.use(bodyParser.json());

// routers version 1
routersApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});