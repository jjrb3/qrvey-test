
const express = require('express');

// Controllers
const { GetAllController } = require('../../controllers/project/get-all-controller');

const { verifyToken } = require('../../middlewares/authentication');

const getAllController = new GetAllController();
const app = express();


// =======================================
// GET: Get all task by user ID or project ID
// =======================================
app.get('/api/get-all-project-detail/:type?/:id?', verifyToken, (req, res) => getAllController.getAll(req, res));


module.exports = app;