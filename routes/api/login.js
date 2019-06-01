
const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/user');

const app = express();



/**
 * Route - POST: api/login
 * @param {Object} req
 * @param {Object} res
 * @return {JSON}
 */
app.post('/api/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) =>{

        if (err) {
            return res.status(500).json({
               success: false,
               err
            });
        }

        // If exists user
        if (!userDB) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User and password are not correct'
                }
            });
        }

        // If password is equals
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User and password are not correct'
                }
            });
        }


        // Generate token
        let token = jwt.sign({
            dataUser: userDB
        }, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN});


        res.json({
            success: true,
            user: userDB,
            token
        });
    });
});


module.exports = app;