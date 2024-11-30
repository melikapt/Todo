const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();

const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`listening on port ${port}...`))