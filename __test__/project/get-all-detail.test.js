
const request = require('supertest');
const app = require('../../server');

process.env.NODE_ENV = 'dev';


describe('Get all tasks by user', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlciI6eyJzdGF0dXMiOnRydWUsIl9pZCI6IjVjZjJlZjQ3Y2E0NzY3MDgzMmQyNWUzYyIsIm5hbWUiOiJKZXJlbXkgUmV5ZXMgQi4iLCJlbWFpbCI6ImpqcmI2QGhvdG1haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTU5NzYxNzYxLCJleHAiOjE1NTk5MzQ1NjF9.4MpvmoMe3eSDzrI65jA3DiO-3_qxj9Q64--y9yY-Pcg';

    test('Get all tasks', (done) => {
        request(app)
            .get("/api/get-all-project-detail")
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.data.length).toBeGreaterThan(-1);
                expect(typeof res.body.data).toBe('object');
                done();
            });
    });

    test('Get all tasks by project', (done) => {
        request(app)
            .get("/api/get-all-project-detail")
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                type: 'project',
                id: '5cf6dc645ebfbb2714fc76f4'
            })
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.data.length).toBeGreaterThan(-1);
                expect(typeof res.body.data).toBe('object');
                done();
            });
    });

    test('Get all tasks by project', (done) => {
        request(app)
            .get("/api/get-all-project-detail")
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                type: 'user',
                id: '5cf2ef47ca47670832d25e3c'
            })
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.data.length).toBeGreaterThan(-1);
                expect(typeof res.body.data).toBe('object');
                done();
            });
    });
});