const productService = require('../services/product-services');
const { successResponse, clientErrorResponse, errorResponse, 
        createdResponse, notFoundResponse } = require('../middlewares/response');

const createProduct = async (req, res) => {
    try {
        const {
            nama,
            stok,
            harga,
            jenis_produk
        } = req.body;

        const product = {
            nama,
            stok,
            harga,
            jenisProdukId: jenis_produk
        }
        const newProduct = await productService.createProduct(product);
        if (newProduct) {
            return createdResponse(res, newProduct, "produk berhasil ditambahkan");
        } else {
            return clientErrorResponse(res, "produk gagal ditambahkan")
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getAllProduct = async (req, res) => {
    try {
        const allProduct = await productService.getAllProduct();
        if (allProduct != 0) {
            return successResponse(res, allProduct, "data seluruh produk berhasil didapat");
        } else {
            return notFoundResponse(res, "data produk tidak tersedia")
        }
    } catch (error) {
        return errorResponse(res, error);
    }
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
