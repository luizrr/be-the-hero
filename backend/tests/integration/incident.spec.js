const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to create a new incident', async () => {
        const response = await request(app).post('/incidents')
            .set('Authorization', "7bd00290")
            .send({
                title: "titulo de test",
                description: "descrição para caso de test",
                value: 148.87
            });

        expect(response.body).toHaveProperty('id');
    })
})