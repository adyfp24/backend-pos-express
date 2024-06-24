const supertest = require('supertest');
const app = require('../server');
const { createTestUser, removeTestUser } = require('../src/utils/test-util');

describe('POST /api/v1/register', function () {
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should be register new user', async () => {
        const result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'test',
                password: 'rahasia'
            });

        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe('test');
    })

    it('should reject if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: '',
                password: '',
            });

        expect(result.status).toBe(400);
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'test',
                password: 'rahasia',
            });


        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("test");

        result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'test',
                password: 'rahasia',
            });

        expect(result.status).toBe(400);
    });

});

describe('POST /api/v1/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should be logged in a user', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'test',
                password: 'rahasia',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.user.username).toBe('test');
        expect(result.body.data.token).toBeDefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: '',
                password: '',
            });

        expect(result.status).toBe(400);
    });

    it('should reject if username is invalid', async () => {

        result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'wrong username',
                password: 'rahasia',
            });

        expect(result.status).toBe(400);
    });

    it('should reject if password is invalid', async () => {

        result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'test',
                password: 'wrong password',
            });

        expect(result.status).toBe(400);
    });
});

