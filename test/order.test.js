const supertest = require('supertest');
const app = require('../server'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { removeTestOrder } = require('../src/utils/test-util');

describe('Order API', () => {
    let productId;
    let transactionId;

    beforeAll(async () => {
        const product = await prisma.product.create({
            data: {
                nama: 'Test Product',
                stok: 100,
                harga: 10000,
                jenisProdukId: 1,
            }
        });
        productId = product.id;
    });

    afterAll(async () => {
        await removeTestOrder();
    });

    it('should create a new order', async () => {
        const products = [{ productId: productId, quantity: 2 }];
        const res = await supertest(app)
            .post('/api/v1/order')
            .send({ products });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('pesanan berhasil diproses');
        expect(res.body.data).toHaveProperty('id');
        transactionId = res.body.data.id; 
    });

    it('should export order receipt', async () => {
        const uangMasuk = 20000; // Contoh uang masuk
        const res = await supertest(app)
            .post(`/api/v1/order/${transactionId}/struct`)
            .send({ uang_masuk: uangMasuk });

        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/pdf');
    });
});
