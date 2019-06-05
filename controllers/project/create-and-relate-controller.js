
// Models
const Project = require('../../models/project');
const Task    = require('../../models/task');


class CreateRelateController {


    create(req, res) {

        let verify = this.verify(req.body);


        if (!verify.success) {
            return res.status(500).json(verify);
        }

        return this.save(req, res, verify);
    }


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