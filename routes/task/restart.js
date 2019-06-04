
const express = require('express');

// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


// ============================
// Restart task by id task
// ============================
app.post('/api/restart-task', verifyToken, (req, res) => {

    if (!req.body.task_id) {
        return res.status(500).json({
            success: false,
            message: 'Task id is required'
        });
    }

    Task.findById(req.body.task_id, (err, taskDB) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }


        if (!taskDB) {
            return res.status(400).json({
                success: false,
                message: 'ID not found'
            });
        }

        taskDB.status       = 'On Hold';
        taskDB.total_time   = 0;
        taskDB.updated_at   = Date.now();


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            let conditions = {
                task: req.body.task_id
            };

            TaskLog.remove(conditions, (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        err
                    });
                }

                res.json({
                    success: true,
                    task: taskUpdated
                });
            });
        });
    });
});

module.exports = app;