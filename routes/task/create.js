
const express = require('express');


// Controllers
const { TaskController } = require('../../controllers/task-controller');

const { verifyToken } = require('../../middlewares/authentication');


const taskController = new TaskController();
const app = express();


// ============================
// POST - Create task
// ============================
app.post('/api/create-task/', verifyToken, (req, res) => taskController.create(req, res));



module.exports = app;