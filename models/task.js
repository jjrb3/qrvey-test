const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Config schema tasks
 */
let taskSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: [true, 'The price is necessary']
    },
    total_time: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    /*stop: {
        type: Date,
        required: false
    },*/
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: false
    }
});


module.exports = mongoose.model('tasks', taskSchema);