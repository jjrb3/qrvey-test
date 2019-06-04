
const express = require('express');

const app = express();


// Task routes
app.use(require('./create-task'));
app.use(require('./get-task-by-user'));
app.use(require('./init-task'));


module.exports = app;