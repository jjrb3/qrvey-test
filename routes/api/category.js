
const express = require('express');

const Category = require('../../models/category');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();

/**
 * Route - GET: api/category
 * @param {Object} req
 * @param {Object} res
 * @return {JSON}
 */
app.get('/api/category', verifyToken, (req, res) => {

    Category.find({ })
        .sort({ name: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Category.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    categories: data
                });
            });
        });
});


module.exports = app;