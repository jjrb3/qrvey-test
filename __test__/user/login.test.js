
const request = require('supertest');
const app = require('../../server');

process.env.NODE_ENV = 'dev';


describe('Login', () => {

    test('Login with email and password', (done) => {
        request(app)
            .post("/api/login")
            .set('Accept', 'application/json')
            .send({
                email: 'jjrb6@hotmail.com',
                password: '123'
            })
            .expect(200)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body.success).toEqual(true);
                expect(res.body.user.email).toEqual('jjrb6@hotmail.com');
                expect(typeof res.body.token).toBe('string');

                done();
            });
    });


    test('Password is not correct', (done) => {
        request(app)
            .post("/api/login")
            .set('Accept', 'application/json')
            .send({
                email: 'jjrb6@hotmail.com',
                password: '123456'
            })
            .expect(400)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    err: {
                        message: 'User and password are not correct'
                    }
                });

                done();
            });
    });


    test('Login without email', (done) => {
        request(app)
            .post("/api/login")
            .set('Accept', 'application/json')
            .send({
                password: '123'
            })
            .expect(400)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    err: {
                        message: 'User and password are not correct'
                    }
                });

                done();
            });
    });

    test('Login without password', (done) => {
        request(app)
            .post("/api/login")
            .set('Accept', 'application/json')
            .send({
                email: 'jjrb6@hotmail.com',
            })
            .expect(400)
            .end((err, res) => {

                if (err) return done(err);

                expect(res.body).toStrictEqual({
                    success: false,
                    err: {
                        message: 'User and password are not correct'
                    }
                });

                done();
            });
    });
});