
const express = require('express');

// Models
const Task = require('../../models/task');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


// ============================
// GET - Get all task by user
// ============================
app.get('/api/get-task/:user_id', verifyToken, (req, res) => {


    Task.find({ user: req.params.user_id })
        .sort({ create_at: -1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            Task.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    tasks: data
                });
            });
        });
});

module.exports = app;