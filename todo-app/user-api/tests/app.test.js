const request = require('supertest');
const proxyquire = require('proxyquire').noCallThru();
const HttpStatus = require('http-status-codes');

const Users = {
    EXISTING_USER: {
        email: 'existingUser@test.com',
        firstName: 'test1',
        lastName: 'test2',
        token: 'eyJlbWFpbCI6ImV4aXN0aW5nVXNlckB0ZXN0LmNvbSIsImZpcnN0TmFtZSI6IlBhdWwiLCJsYXN0TmFtZSI6Ikdlb3JnZSJ9'
    },
    NEW_USER: {
        email: 'others@others.com',
        firstName: 'James',
        lastName: 'Parker',
        token: 'eyJlbWFpbCI6Im90aGVyc0BvdGhlcnMuY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IlBhcmtlciJ9'
    },
    INVALID_USER: {
        email: 'invalidJson@test.com',
        token: 'e2VtYWlsOmludmFsaWRKc29uQHRlc3QuY29tLGZpcnN0TmFtZTosbGFzdE5hbWU6fQ=='
    }
};

const {email, firstName, lastName} = Users.EXISTING_USER;
const MOCK_REPO = {[email]: {email, firstName, lastName}};

const controller = proxyquire('../src/controller', {
    './auth': () => {
        return require('../src/auth/testAuthMode');
    },
    './dao': {
        findUserByEmail: email => {
            if (email === 'fail') {
                throw {message: 'forced failure'};
            }
            return MOCK_REPO[email]
        },
        createUser: user => {
            const {email} = user;
            if (MOCK_REPO[email]) {
                throw {message: 'email already exists'};
            }
            return MOCK_REPO[email] = user;
        }
    }
});

const app = proxyquire('../src/app', {
    './controller': controller
});


describe('App controller tests', () => {
    describe('get a user using secured token', () => {
        it('should handle existing user', done => {
            const {token, email} = Users.EXISTING_USER;
            request(app)
                .get('/api/user')
                .set('TestModeToken', token)
                .expect(HttpStatus.OK, MOCK_REPO[email])
                .end((err, res) => done(err || null));
        });

        it('should handle non existing user', done => {
            request(app)
                .get('/api/user')
                .set('TestModeToken', Users.NEW_USER.token)
                .expect(HttpStatus.NOT_FOUND)
                .end((err, res) => done(err || null));
        });

        it('should handle unexpected failure', done => {
            request(app)
                .get('/api/user')
                .set('TestModeToken', Users.INVALID_USER.token)
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => done(err || null));
        });
    });

    describe('get a user by email without secure token', () => {
        it('should handle existing user', done => {
            const {email} = Users.EXISTING_USER;
            request(app)
                .get(`/api/user/${email}`)
                .expect(HttpStatus.OK, MOCK_REPO[email])
                .end((err, res) => done(err || null));
        });

        it('should handle non existing user', done => {
            request(app)
                .get(`/api/user/${Users.NEW_USER.email}`)
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
            const {token, email, firstName, lastName} = Users.NEW_USER;
            request(app)
                .post('/api/user')
                .set('TestModeToken', token)
                .expect(HttpStatus.CREATED, {email, firstName, lastName})
                .end((err, res) => done(err || null));
        });

        it('should not create a new user if the email exists', done => {
            request(app)
                .post('/api/user')
                .set('TestModeToken', Users.EXISTING_USER.token)
                .expect(HttpStatus.BAD_REQUEST)
                .end((err, res) => done(err || null));
        });

        it('should handle unexpected failure', done => {
            request(app)
                .post('/api/user')
                .set('TestModeToken', Users.INVALID_USER.token)
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .end((err, res) => done(err || null));
        })
    });
});