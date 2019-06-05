
const request = require('supertest');
const app = require('../../server');

process.env.NODE_ENV = 'dev';


describe('Tasks and their functionalities', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlciI6eyJzdGF0dXMiOnRydWUsIl9pZCI6IjVjZjJlZjQ3Y2E0NzY3MDgzMmQyNWUzYyIsIm5hbWUiOiJKZXJlbXkgUmV5ZXMgQi4iLCJlbWFpbCI6ImpqcmI2QGhvdG1haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTU5NzYxNzYxLCJleHAiOjE1NTk5MzQ1NjF9.4MpvmoMe3eSDzrI65jA3DiO-3_qxj9Q64--y9yY-Pcg';


    test('Task ID is null', (done) => {
        request(app)
            .post("/api/init-task/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect(500)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    message: 'Task id is required'
                });

                done();
            });
    });
});