
const express = require('express');

// Controllers
const { RestartController } = require('../../controllers/task/restart-controller');

const { verifyToken } = require('../../middlewares/authentication');

const restartController = new RestartController();
const app = express();


// ================================
// POST: Restart task by id task
// ================================
app.post('/api/restart-task', verifyToken, (req, res) => restartController.restart(req, res));


module.exports = app;