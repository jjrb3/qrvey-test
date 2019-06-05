
const { UtilsController } = require('../controllers/utils-controller');

describe('Utils', () => {

    let utilsController = new UtilsController();

    test('Test when the time is null', () => {
        expect(utilsController.timeToSeconds('')).toStrictEqual({
            success: true,
            total: 0
        })
    });

    test('Test when the time is not complete', () => {
        expect(utilsController.timeToSeconds('03:04-dsd')).toStrictEqual({
            success: false,
            message: 'Invalid format duration'
        })
    });

    test('Test when minutes is greater than 59', () => {
        expect(utilsController.timeToSeconds('03:90:12')).toStrictEqual({
            success: false,
            message: 'Invalid format duration'
        })
    });

    test('Test when the time is not null', () => {
        expect(utilsController.timeToSeconds('03:04:01')).toStrictEqual({
            success: true,
            total: 1104001
        })
    });
});