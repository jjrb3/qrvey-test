
const express = require('express');

const app = express();


/**
 * Web routes
 */
app.get('/', (req, res) => res.render('login'));
app.get('/home/', (req, res) => {res.render('home')});


module.exports = app;