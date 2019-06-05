
const express = require('express');


// Controllers
const { CreateRelateController } = require('../../controllers/project/create-and-relate-controller');


const { verifyToken } = require('../../middlewares/authentication');


const createRelateController = new CreateRelateController();
const app = express();


// ======================================
// POST: Create project and relate task
// ======================================
app.post('/api/create-project/', verifyToken, (req, res) => createRelateController.create(req, res));


module.exports = app;