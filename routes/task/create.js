
const express = require('express');


// Controllers
const { CreateController } = require('../../controllers/task/create-controller');

const { verifyToken } = require('../../middlewares/authentication');


const createController = new CreateController();
const app = express();


// ============================
// POST: Create task
// ============================
app.post('/api/create-task/', verifyToken, (req, res) => createController.create(req, res));



module.exports = app;