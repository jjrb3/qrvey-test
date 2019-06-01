
require('../config/config');

const mongoose= require('mongoose');


const { migrationUser } = require('./user');

/**
 * Connect database MongoDB
 */
mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    migrationUser();
});

