
const express = require('express');

const app = express();


// Task routes
app.use(require('./create'));
app.use(require('./relate-task'));
app.use(require('./get-all'));


module.exports = app;