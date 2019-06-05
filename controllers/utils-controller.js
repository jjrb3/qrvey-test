
class UtilsController {

    timeToSeconds(time) {

        if (!time) {
            return {
                success: true,
                total: 0
            }
        }

        let dateTime = time.split(':');

        if (dateTime.length !== 3 || dateTime[1] > 59) {
            return {
                success: false,
                message: 'Invalid format duration'
            }
        }

        let hourToSecond    = dateTime[0] > 0 ? dateTime[0] * 3600 : 0;
        let minuteToSecond  = dateTime[1] > 0 ? dateTime[1] * 60 : 0;

        let total = hourToSecond + minuteToSecond + dateTime[2];

        return {
            success: true,
            total: parseInt(total)
        }
    }
}


module.exports = {
    UtilsController
};