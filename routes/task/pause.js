
const express = require('express');

// Controllers
const { PauseController } = require('../../controllers/task/pause-controller');

const { verifyToken } = require('../../middlewares/authentication');

const pauseController = new PauseController();
const app = express();


// ============================
// POST: Pause task by id task
// ============================
app.post('/api/pause-task', verifyToken, (req, res) => pauseController.pause(req, res));


module.exports = app;