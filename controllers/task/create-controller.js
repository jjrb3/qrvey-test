
// Models
const Task = require('../../models/task');

const { UtilsController } = require('../utils-controller');


class CreateController {


    constructor() {
        this.utils = new UtilsController();
    }

    /**
     * Create a new task
     *
     * @param res: Request
     * @param res: Response
     * @return {*|Promise<any>|void}
     */
    create(req, res) {

        let verify = this.verify(req.body, req.dataUser._id);


        if (!verify.success) {
            return res.status(500).json(verify);
        }

        return this.save(res, verify);
    }


    /**
     * Verify parameters from request
     *
     * @param res:      Request
     * @param verify:   Object to verify
     */
    save(res, verify) {

        let task = new Task(verify.data);


        task.save((err, infoDataDB) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    messsage: err.message
                });
            }

            res.status(201).json({
                success: true,
                task: infoDataDB
            });
        });
    }

    /**
     * Verify if the parameters are correct.
     *
     * @param params
     * @param userId
     * @return {{total, success}|
     *          {success, message}|
     *          {data: {name: *, total_time: number, create_at: number, user: *, status: string}, success: boolean}}
     */
    verify(params, userId) {

        var data = {
            name: params.name,
            status: 'On hold',
            total_time: 0,
            user: userId,
            create_at: Date.now()
        };


        let duration = this.utils.timeToSeconds(params.duration);

        if (!duration.success) {
            return duration
        }

        data['duration'] = duration.total;

        return {
            success: true,
            data
        }
    }
}


module.exports = {
    CreateController
};