
const express = require('express');

const app = express();


// Task routes
app.use(require('./create'));
app.use(require('./get-by-user'));
app.use(require('./init'));
app.use(require('./pause'));
app.use(require('./restart'));


module.exports = app;