
// Models
const Project = require('../../models/project');
const Task = require('../../models/task');


class RelateController {

    /**
     * Relate project to task
     *
     * @param req: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    relate(req, res) {

        let verify = this.verify(req.body);


        if (!verify.success) {
            return res.status(500).json(verify);
        }

        return this.update(req, res);
    }


    /**
     * Update relationship
     *
     * @param req: Request
     * @param res: Response
     */
    update(req, res) {

        let conditions = {
            _id: req.body.task_id
        };

        Task.findOneAndUpdate(conditions, { project : req.body.project_id }, (err, taskDB) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            taskDB.project = req.body.project_id;

            res.status(201).json({
                success: true,
                task: taskDB
            });
        });
    }


    /**
     * Check if the parameters are correct.
     *
     * @param params
     * @return {{success: boolean, message: string}|{data: {name: *}, success: boolean}}
     */
    verify(params) {

        if (!params.project_id) {
            return {
                success: false,
                message: 'Project ID is required'
            }
        }

        if (!params.task_id) {
            return {
                success: false,
                message: 'Task ID is required'
            }
        }

        return {
            success: true,
            data: {
                name: params.name
            }
        }
    }
}


module.exports = {
    RelateController
};