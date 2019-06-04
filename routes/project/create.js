
const express = require('express');

// Models
const Project = require('../../models/project');
const Task = require('../../models/task');

// Controllers
const { ProjectController } = require('../../controllers/project-controller');


const { verifyToken } = require('../../middlewares/authentication');


const projectController = new ProjectController();
const app = express();


// ================================
// Create project and relate task
// ================================
app.post('/api/create-project/', verifyToken, (req, res) => {

    let verify = projectController.verify(req.body);


    if (!verify.success) {
        return res.status(500).json(verify);
    }

    let project = new Project(verify.data);


    project.save((err, infoDataDB) => {

        if (err) {
            return res.status(500).json({
                success: false,
                messsage: err.message
            });
        }

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
    });
});

module.exports = app;