const supertest = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { removeTestProduct } = require('../src/utils/test-util');

describe('Product API', () => {
    let productId;

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
        await removeTestProduct();
    });


    it('should get all products', async () => {
        const res = await supertest(app).get('/api/v1/product');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });


    it('should get a product by id', async () => {
        const res = await supertest(app).get(`/api/v1/product/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.id).toBe(productId);
    });


    it('should create a new product', async () => {
        const res = await supertest(app)
            .post('/api/v1/product')
            .send({
                nama: 'New Product',
                stok: 50,
                harga: 5000,
                jenis_produk: 1
            });
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.nama).toBe('New Product');
    });


    it('should update a product', async () => {
        const res = await supertest(app)
            .put(`/api/v1/product/${productId}`)
            .send({
                nama: 'Updated Product',
                stok: 200,
                harga: 15000,
                jenis_produk: 1
            });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should delete a product', async () => {
        const res = await supertest(app).delete(`/api/v1/product/${productId}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});


