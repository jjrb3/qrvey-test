
const express = require('express');

const app = express();


// Task routes
app.use(require('./create-task'));
app.use(require('./get-task-by-user'));


module.exports = app;