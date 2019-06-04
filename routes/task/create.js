
const express = require('express');

// Models
const Task = require('../../models/task');

// Controllers
const { TaskController } = require('../../controllers/task-controller');


const { verifyToken } = require('../../middlewares/authentication');


const taskController = new TaskController();
const app = express();


// ============================
// Create task
// ============================
app.post('/api/create-task/', verifyToken, (req, res) => {


    let verify = taskController.verify(req.body, req.dataUser._id);


    if (!verify.success) {
        return res.status(500).json(verify);
    }


    let task = new Task(verify.data);


    task.save((err, infoDataDB) => {

        if (err) {
            return res.status(500).json({
                success: false,
                messsage: err.message
            });
        }

        res.status(201).json({
            success: true,
            task: infoDataDB
        });
    });
});

module.exports = app;