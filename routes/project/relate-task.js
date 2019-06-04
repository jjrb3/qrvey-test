
const express = require('express');

// Models
const Project = require('../../models/project');
const Task = require('../../models/task');

// Controllers
const { ProjectController } = require('../../controllers/project-controller');


const { verifyToken } = require('../../middlewares/authentication');


const projectController = new ProjectController();
const app = express();


// ============================
// Relate task
// ============================
app.put('/api/relate-task-to-project/', verifyToken, (req, res) => {

    let verify = projectController.verifyRelate(req.body);


    if (!verify.success) {
        return res.status(500).json(verify);
    }

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
});

module.exports = app;