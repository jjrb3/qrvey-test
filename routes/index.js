
const express = require('express');

const app = express();


// Routes
app.use(require('./user/'));
app.use(require('./task/'));
app.use(require('./project/'));


module.exports = app;