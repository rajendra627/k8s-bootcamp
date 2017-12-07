const request = require('supertest');
const proxyquire = require('proxyquire').noCallThru();
const HttpStatus = require('http-status-codes');

const MOCK_USERS = {
    'existingUser@test.com': {email: 'existingUser@test.com', firstName: 'test1', lastName: 'test2'}
};

const controller = proxyquire('../src/controller', {
    './auth': () => {
        return require('../src/auth/testAuthMode');
    },
    './dao': {
        findUserByEmail: email => {
            if (email === 'fail') {
                throw {message: 'forced failure'};
            }
            return MOCK_USERS[email]
        },
        createUser: user => {
            const {email} = user;
            if (MOCK_USERS[email]) {
                throw {message: 'email already exists'};
            }
            return MOCK_USERS[email] = user;
        }
    }
});

const app = proxyquire('../src/app', {
    './controller': controller
});


describe('App controller tests', () => {
    describe('get a user using secured token', () => {
        it('should handle existing user', done => {
            request(app)
                .get('/api/user')
                .set('TestModeToken',
                    'eyJlbWFpbCI6ImV4aXN0aW5nVXNlckB0ZXN0LmNvbSIsImZpcnN0TmFtZSI6IlBhdWwiLCJsYXN0TmFtZSI6Ikdlb3JnZSJ9')
                .expect(HttpStatus.OK, MOCK_USERS['existingUser@test.com'])
                .end((err, res) => done(err || null));
        });

        it('should handle non existing user', done => {
            request(app)
                .get('/api/user')
                .set('TestModeToken',
                    'eyJlbWFpbCI6Im90aGVyc0BvdGhlcnMuY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IlBhcmtlciJ9')
                .expect(HttpStatus.NOT_FOUND)
                .end((err, res) => done(err || null));
        });

        it('should handle unexpected failure', done => {
            request(app)
                .get('/api/user')
                .set('TestModeToken', 'e2VtYWlsOmludmFsaWRKc29uQHRlc3QuY29tLGZpcnN0TmFtZTosbGFzdE5hbWU6fQ==')
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => done(err || null));
        });
    });

    describe('get a user by email without secure token', () => {
        it('should handle existing user', done => {
            request(app)
                .get('/api/user/existingUser@test.com')
                .expect(HttpStatus.OK, MOCK_USERS['existingUser@test.com'])
                .end((err, res) => done(err || null));
        });

        it('should handle non existing user', done => {
            request(app)
                .get('/api/user/others@others.com')
                .expect(HttpStatus.NOT_FOUND)
                .end((err, res) => done(err || null));
        });

        it('should handle unexpected failure', done => {
            request(app)
                .get('/api/user/fail')
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => done(err || null));
        });
    });

    describe('post a user using a secured token', () => {
        it('should create a new user', done => {
            const expectedNewUser = {
                email: 'others@others.com',
                firstName: 'James',
                lastName: 'Parker'
            };

            request(app)
                .post('/api/user')
                .set('TestModeToken',
                    'eyJlbWFpbCI6Im90aGVyc0BvdGhlcnMuY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IlBhcmtlciJ9')
                .expect(HttpStatus.CREATED, expectedNewUser)
                .end((err, res) => done(err || null));
        });

        it('should not create a new user if the email exists', done => {
            request(app)
                .post('/api/user')
                .set('TestModeToken',
                    'eyJlbWFpbCI6ImV4aXN0aW5nVXNlckB0ZXN0LmNvbSIsImZpcnN0TmFtZSI6IlBhdWwiLCJsYXN0TmFtZSI6Ikdlb3JnZSJ9')
                .expect(HttpStatus.BAD_REQUEST)
                .end((err, res) => done(err || null));
        });

        it('should handle unexpected failure', done => {
            request(app)
                .post('/api/user')
                .set('TestModeToken', 'e2VtYWlsOmludmFsaWRKc29uQHRlc3QuY29tLGZpcnN0TmFtZTosbGFzdE5hbWU6fQ==')
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => done(err || null));
        })
    });
});