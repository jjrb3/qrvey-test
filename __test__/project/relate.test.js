
const request = require('supertest');
const app = require('../../server');

process.env.NODE_ENV = 'dev';


describe('Relate project to task', () => {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVXNlciI6eyJzdGF0dXMiOnRydWUsIl9pZCI6IjVjZjJlZjQ3Y2E0NzY3MDgzMmQyNWUzYyIsIm5hbWUiOiJKZXJlbXkgUmV5ZXMgQi4iLCJlbWFpbCI6ImpqcmI2QGhvdG1haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTU5NzYxNzYxLCJleHAiOjE1NTk5MzQ1NjF9.4MpvmoMe3eSDzrI65jA3DiO-3_qxj9Q64--y9yY-Pcg';


    test('Relate', (done) => {
        request(app)
            .put("/api/relate-task-to-project/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                task_id: '5cf6d1e59c95f5224404917b',
                project_id: '5cf6dc645ebfbb2714fc76f4'
            })
            .expect(201)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(typeof res.body.task).toBe('object');

                done();
            });
    });

    test('When task ID is null', (done) => {
        request(app)
            .put("/api/relate-task-to-project/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                project_id: '5cf6dc645ebfbb2714fc76f4'
            })
            .expect(500)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    message: 'Task ID is required'
                });

                done();
            });
    });

    test('When project ID is null', (done) => {
        request(app)
            .put("/api/relate-task-to-project/")
            .set('Authorization', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                task_id: '5cf6d1e59c95f5224404917b',
            })
            .expect(500)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    message: 'Project ID is required'
                });

                done();
            });
    });
});