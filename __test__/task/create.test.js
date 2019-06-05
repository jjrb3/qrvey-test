
const request = require('supertest');
const app = require('../../server');

process.env.NODE_ENV = 'dev';


describe('Create new task', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlciI6eyJzdGF0dXMiOnRydWUsIl9pZCI6IjVjZjJlZjQ3Y2E0NzY3MDgzMmQyNWUzYyIsIm5hbWUiOiJKZXJlbXkgUmV5ZXMgQi4iLCJlbWFpbCI6ImpqcmI2QGhvdG1haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTU5NzYxNzYxLCJleHAiOjE1NTk5MzQ1NjF9.4MpvmoMe3eSDzrI65jA3DiO-3_qxj9Q64--y9yY-Pcg';

    test('Create task with name and duration', (done) => {
        request(app)
            .post("/api/create-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'Task 1',
                duration: '4:12:01'
            })
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(typeof res.body.task).toBe('object');
                done();
            });
    });


    test('Create task with duration', (done) => {
        request(app)
            .post("/api/create-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                duration: '4:12:01'
            })
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(typeof res.body.task).toBe('object');
                done();
            });
    });

    test('Create task with name', (done) => {
        request(app)
            .post("/api/create-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'Task 3',
            })
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(typeof res.body.task).toBe('object');
                done();
            });
    });

    test('Create task without name and duration', (done) => {
        request(app)
            .post("/api/create-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(typeof res.body.task).toBe('object');
                done();
            });
    });

    test('Create task with problems in the duration', (done) => {
        request(app)
            .post("/api/create-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect(500)
            .send({
                duration: '4:112:01'
            })
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    message: 'Invalid format duration'
                });

                done();
            });
    });
});