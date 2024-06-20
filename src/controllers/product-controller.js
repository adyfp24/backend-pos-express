const productService = require('../services/product-services');
const { successResponse, clientErrorResponse, errorResponse, createdResponse } = require('../middlewares/response');

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
            jenisProdukId : jenis_produk
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
