
const express = require('express');

// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


// ============================
// Pause task by id task
// ============================
app.post('/api/pause-task', verifyToken, (req, res) => {

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


        if (taskDB.status === 'Pause') {
            return res.status(400).json({
                success: false,
                message: 'The task is already paused'
            });
        }

        let pauseTime = Date.now();

        taskDB.status = 'Pause';
        taskDB.total_time += (pauseTime - new Date(taskDB.updated_at));
        taskDB.updated_at = pauseTime;


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            let conditions = {
                task: req.body.task_id,
                pause: ''
            };

            TaskLog.findOneAndUpdate(conditions, { pause : pauseTime }, (err, taskLogDB) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                taskLogDB.pause = pauseTime;

                res.json({
                    success: true,
                    task: taskUpdated,
                    log: taskLogDB
                });
            });
        });
    });
});

module.exports = app;