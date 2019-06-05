
const request = require('supertest');

const app = require('../../server');

process.env.NODE_ENV = 'dev';

describe('Get', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlciI6eyJzdGF0dXMiOnRydWUsIl9pZCI6IjVjZjJlZjQ3Y2E0NzY3MDgzMmQyNWUzYyIsIm5hbWUiOiJKZXJlbXkgUmV5ZXMgQi4iLCJlbWFpbCI6ImpqcmI2QGhvdG1haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTU5NzYxNzYxLCJleHAiOjE1NTk5MzQ1NjF9.4MpvmoMe3eSDzrI65jA3DiO-3_qxj9Q64--y9yY-Pcg';

    test('Get', (done) => {

        request(app)
            .get("/api/get-task/5cf2ef47ca47670832d25e3c")
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(res.body.quantity).toBeGreaterThan(-1);
                expect(typeof res.body.tasks).toBe('object');
                done();
            });
    });
});