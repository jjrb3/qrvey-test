
require('../config/config');

const mongoose= require('mongoose');


const { migrationUser } = require('./user');
const { migrationCategory } = require('./category');

/**
 * Connect database MongoDB
 */
mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    migrationUser();
    migrationCategory();
});

