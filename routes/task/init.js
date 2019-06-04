
const express = require('express');

// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


// ============================
// Init task by id task
// ============================
app.post('/api/init-task', verifyToken, (req, res) => {

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


        if (taskDB.status === 'Init' || taskDB.status === 'Continuing') {
            return res.status(400).json({
                success: false,
                message: 'The task is already started'
            });
        }

        taskDB.status = taskDB.status === 'Pause' ? 'Continuing' : 'Init';
        taskDB.updated_at = Date.now();


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            let taskLog = new TaskLog({
                task: req.body.task_id,
                pause: ''
            });


            // Create Log
            taskLog.save((err, infoDataDB) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    task: taskUpdated,
                    log: infoDataDB
                });
            });
        });
    });
});

module.exports = app;