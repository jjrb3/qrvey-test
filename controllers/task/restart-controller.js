
// Models
const Task    = require('../../models/task');
const TaskLog = require('../../models/task-log');


class RestartController {

    constructor() {
        this.dateNow = Date.now();
    }


    /**
     * Initialize task
     *
     * @param req: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    restart(req, res) {

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
     * Change status to On Hold
     *
     * @param req:    Request
     * @param res:    Response
     * @param taskDB: Query results
     */
    changeStatus(req, res, taskDB) {

        taskDB.status       = 'On Hold';
        taskDB.total_time   = 0;
        taskDB.updated_at   = this.dateNow;


        // Update information
        taskDB.save((err, taskUpdated) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return this.restartLog(req, res, taskUpdated);
        });
    }


    /**
     * Restart task log
     *
     * @param req:          Request
     * @param res:          Response
     * @param taskUpdated:  Query results
     */
    restartLog(req, res, taskUpdated) {

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
    }
}


module.exports = {
    RestartController
};