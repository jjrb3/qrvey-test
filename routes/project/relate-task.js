
const express = require('express');


// Controllers
const { RelateController } = require('../../controllers/project/relate-controller');


const { verifyToken } = require('../../middlewares/authentication');


const relateController = new RelateController();
const app = express();


// ============================
// PUT: Relate task to project
// ============================
app.put('/api/relate-task-to-project/', verifyToken, (req, res) => relateController.relate(req, res));


module.exports = app;