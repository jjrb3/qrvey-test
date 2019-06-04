
const express = require('express');

// Models
const Project = require('../../models/project');
const Task = require('../../models/task');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


// ============================
// Get all task by user
// ============================
app.get('/api/get-all-project-detail/:type?/:id?', verifyToken, async(req, res) => {

    try {

        let data = [];

        var projects = [];

        if (req.params.type && req.params.type === 'project') {
            projects = await Project.find({ _id: req.params.id });
        }
        else {
            projects = await Project.find({});
        }


        for (var key in await projects) {

            var tasks = [];

            if (req.params.type && req.params.type === 'user') {
                tasks = await Task.find({ project: projects[key]._id, user: req.params.id }).populate('user');
            }
            else {
                tasks = await Task.find({ project: projects[key]._id}).populate('user');
            }


            if (tasks.length > 0) {

                var totalTimeUser       = 0,
                    totalTimeProject    = 0,
                    userName            = '',
                    userData            = [],
                    existsData          = false;

                for (var keyTask in await tasks) {

                    totalTimeUser    += tasks[keyTask].total_time;
                    totalTimeProject += tasks[keyTask].total_time;

                    if (userName !== '' && tasks[keyTask].user.name !== userName) {

                        userData.push({
                            name: userName,
                            total_time: totalTimeUser
                        });

                        totalTimeUser = 0;
                        existsData = false;
                    }
                    else {
                        existsData = true;
                    }

                    userName = tasks[keyTask].user.name;
                }

                if (existsData) {

                    userData.push({
                        name: userName,
                        total_time: totalTimeUser
                    });
                }

                await data.push({
                    _id: projects[key]._id,
                    name: projects[key].name,
                    total_time: totalTimeProject,
                    users: userData
                });
            }
            else {
                await data.push({
                    _id: projects[key]._id,
                    name: projects[key].name,
                    tasks: []
                });
            }
        }


        res.json({data})
    }
    catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = app;