const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Config schema project
 */
let projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The provider is necessary']
    }
});


module.exports = mongoose.model('project', projectSchema);