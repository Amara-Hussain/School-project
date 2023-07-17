const express = require("express");
const path = require('path');

const app = express();

require('./startup/routes')(app);
require("./startup/db")();
require('./router/association')();

const port = process.env.PORT || 1122;
app.listen(port, () => console.log(`you are listining on ${port}`));
