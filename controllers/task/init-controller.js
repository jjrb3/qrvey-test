
// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');


class InitController {

    /**
     * Initialize task
     *
     * @param req: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    initialize(req, res) {

        if (!req.body.task_id) {
            return res.status(400).json({
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
     * Change status On Hold to Init or Continuing
     *
     * @param req:    Request
     * @param res:    Response
     * @param taskDB: Query results
     */
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


    /**
     * Init task log
     *
     * @param req:          Request
     * @param res:          Response
     * @param taskUpdated:  Query results
     */
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

            return res.json({
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