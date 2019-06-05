
// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');


class PauseController {

    constructor() {
        this.pauseTime = Date.now();
    }


    /**
     * Initialize task
     *
     * @param req: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    initialize(req, res) {

        if (!req.body.task_id) {
            return res.status(500).json({
                success: false,
                message: 'Task id is required'
            });
        }

        return this.searchTaskById(req, res);
    }


    /**
     * Check if the parameters are correct.
     * @param err:      Exception
     * @param taskDB    Query result
     * @return {{success: boolean, json: {success: boolean, message: string}, status: number}|
     *          {success: boolean, json: {success: boolean, message: *}, status: number}|
     *          {success: boolean}}
     */
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


        if (taskDB.status === 'Pause') {
            return {
                success: false,
                status: 400,
                json: {
                    success: false,
                    message: 'The task is already paused'
                },
            };
        }

        return { success: true }
    }


    /**
     * Search task by id
     *
     * @param req: Request
     * @param res: Response
     */
    searchTaskById(req, res) {

        Task.findById(req.body.task_id, (err, taskDB) => {

            let verify = this.verify(err, taskDB);

            if (!verify.success) { return res.status(verify.status).json(verify.json) }

            return this.changeStatus(req, res, taskDB);
        });
    }


    /**
     * Change status Init or Continuing to Pause
     *
     * @param req:    Request
     * @param res:    Response
     * @param taskDB: Query results
     */
    changeStatus(req, res, taskDB) {

        taskDB.status       = 'Pause';
        taskDB.total_time  += (this.pauseTime - new Date(taskDB.updated_at));
        taskDB.updated_at   = this.pauseTime;


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return this.pauseLog(req, res, taskUpdated);
        });
    }


    /**
     * Pause task log
     *
     * @param req:          Request
     * @param res:          Response
     * @param taskUpdated:  Query results
     */
    pauseLog(req, res, taskUpdated) {

        let conditions = {
            task: req.body.task_id,
            pause: ''
        };


        TaskLog.findOneAndUpdate(conditions, { pause : this.pauseTime }, (err, taskLogDB) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            taskLogDB.pause = this.pauseTime;

            res.json({
                success: true,
                task: taskUpdated,
                log: taskLogDB
            });
        });
    }
}


module.exports = {
    PauseController
};