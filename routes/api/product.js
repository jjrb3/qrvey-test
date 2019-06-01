
const express = require('express');

// Models
const Product = require('../../models/product');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


/**
 * Route - GET: api/product
 * @param {Object} req
 * @param {Object} res
 * @return {JSON}
 */
app.get('/api/product', verifyToken, (req, res) => {

    Product.find({ description: new RegExp(req.query.description, 'i') })
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Product.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    products: data
                });
            });
        });
});


/**
 * Route - GET: api/product/:id
 * @param {Object} req
 * @param {Object} res
 * @return {JSON}
 */
app.get('/api/product/:id', verifyToken, (req, res) => {

    Product.find({ _id: req.params.id})
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                product: data.length === 1 ? data[0] : {},
                quantity: data.length
            });
        });
});


/**
 * Route - GET: api/product-by.category
 * @param {Object} req
 * @param {Object} res
 * @return {JSON}
 */
app.get('/api/product-by-category', verifyToken, (req, res) => {

    Product.find({ category: req.query.category })
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Product.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    products: data
                });
            });
        });
});


module.exports = app;