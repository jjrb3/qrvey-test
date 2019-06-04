
const express = require('express');

const app = express();


// Task routes
app.use(require('./create'));


module.exports = app;