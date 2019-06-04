
const { UtilsController } = require('./utils-controller');


class TaskController {

    constructor() {
        this.utils = new UtilsController();
    }


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
    TaskController
};