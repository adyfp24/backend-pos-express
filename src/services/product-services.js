const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (product) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                nama: product.nama,
                stok: product.stok,
                harga: product.harga,
                jenisProdukId: product.jenisProdukId
            }
        });
        return newProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const getAllProduct = async () => {
    try {
        const allProduct = await prisma.product.findMany();
        return allProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const getProductById = async (productId) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });
        return product;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(productId) }
        });
        return deletedProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const updateProduct = async (productId, productUpdate) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(productId) },
            data: {
                ...productUpdate,
                updatedAt: new Date()
            }
        });
        return updatedProduct;
    } catch (error) {
        throw new Error('internal server error : ' + error.message)
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
}