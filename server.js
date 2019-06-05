
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Routes
app.use(require('./routes'));


// Connect to MongoDB
mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    console.log('Database ONLINE');
});


// Listen port
app.listen(process.env.PORT, () => {
    console.log('Listen port: ', process.env.PORT);
});


module.exports = app; // For testing