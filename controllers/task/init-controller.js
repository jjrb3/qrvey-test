
// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');


class InitController {


    initialize(req, res) {

        if (!req.body.task_id) {
            return res.status(500).json({
                success: false,
                message: 'Task id is required'
            });
        }

        return this.searchTaskById(req, res);
    }


    verify(err, taskDB) {

        if (err) {
            return {
                success: false,
                status: 500,
                json: {
                    success: false,
                    message: err.message
                },
            };
        }


        if (!taskDB) {
            return {
                success: false,
                status: 400,
                json: {
                    success: false,
                    message: 'ID not found'
                },
            };
        }


        if (taskDB.status === 'Init' || taskDB.status === 'Continuing') {
            return {
                success: false,
                status: 400,
                json: {
                    success: false,
                    message: 'The task is already started'
                },
            };
        }

        return { success: true }
    }


    searchTaskById(req, res) {

        Task.findById(req.body.task_id, (err, taskDB) => {

            let verify = this.verify(err, taskDB);

            if (!verify.success) { return res.status(verify.status).json(verify.json) }

            return this.changeStatus(req, res, taskDB);
        });
    }


    changeStatus(req, res, taskDB) {

        taskDB.status     = taskDB.status === 'Pause' ? 'Continuing' : 'Init';
        taskDB.updated_at = Date.now();


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return this.initLog(req, res, taskUpdated);
        });
    }


    initLog(req, res, taskUpdated) {

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
    }
}


module.exports = {
    InitController
};