const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (product) => {
    try {
        const newProduct = await prisma.product.create({
            data: product
        });
        return newProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const getAllProduct = () => {

}

const getProductById = () => {

}

const deleteProduct = () => {

}

const updateProduct = () => {

}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
}