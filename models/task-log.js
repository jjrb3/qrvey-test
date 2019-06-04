const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Config schema tasks
 */
let taskLogSchema = new Schema({
    start: {
        type: Date,
        required: true,
        default: Date.now()
    },
    pause: {
        type: Date,
        required: false
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }
});


module.exports = mongoose.model('tasksLog', taskLogSchema);