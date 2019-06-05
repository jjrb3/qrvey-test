
const express = require('express');

// Controllers
const { InitController } = require('../../controllers/task/init-controller');

const { verifyToken } = require('../../middlewares/authentication');

const initController = new InitController();
const app = express();


// ============================
// POST: Init task by id task
// ============================
app.post('/api/init-task', verifyToken, (req, res) => initController.initialize(req, res));


module.exports = app;