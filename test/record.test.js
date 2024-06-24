const supertest = require('supertest');
const app = require('../server');

describe('Record Transaction API', function () {
    it('should be download an excel file transaction record', async () => {
        const res = await supertest(app)
            .get('/api/v1/transaction-record?month=juni&year=2024');
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        expect(res.header['content-disposition']).toMatch(/^attachment; filename=TransactionRecords.xlsx/);
    });

    it('should be failed to download excel file', async () => {
        const res = await supertest(app)
            .get('/api/v1/transaction-record?month=invalidMonth&year=2024');
        expect(res.status).toBe(400);
    });
});
