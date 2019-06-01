const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Config schema category
 */
let collectionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    }
});


module.exports = mongoose.model('category', collectionSchema);