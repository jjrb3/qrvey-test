
// Models
const Project = require('../../models/project');
const Task    = require('../../models/task');


class CreateRelateController {

    /**
     * Verify the params
     *
     * @param req: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    create(req, res) {

        let verify = this.verify(req.body);


        if (!verify.success) {
            return res.status(400).json(verify);
        }

        return this.save(req, res, verify);
    }


    /**
     * Save project
     *
     * @param req:      Request
     * @param res:      Response
     * @param verify:   Parameters
     */
    save(req, res, verify) {

        let project = new Project(verify.data);

        project.save((err, infoDataDB) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    messsage: err.message
                });
            }

            return this.relateTask(req, res, infoDataDB);
        });
    }


    /**
     * Relate task to project
     *
     * @param req:        Request
     * @param res:        Response
     * @param infoDataDB: Query result
     */
    relateTask(req, res, infoDataDB) {

        let conditions = {
            _id: req.body.task_id
        };

        Task.findOneAndUpdate(conditions, { project : infoDataDB._id }, (err, taskDB) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            taskDB.project = infoDataDB._id;

            res.status(201).json({
                success: true,
                project: infoDataDB,
                task: taskDB
            });
        });
    }


    /**
     * Check if the parameters are correct.
     *
     * @param params: Parameters from request
     * @return {{success: boolean, message: string}|{data: {name: *}, success: boolean}}
     */
    verify(params) {

        if (!params.name) {
            return {
                success: false,
                message: 'Project name is required'
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
    CreateRelateController
};