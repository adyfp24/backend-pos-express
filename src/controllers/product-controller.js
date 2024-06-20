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

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        if(product != 0){
            return successResponse(res, product, "data produk dengan id tersebut tersedia")
        }else{
            return notFoundResponse(res, "data produk dengan id tersebut tidak tersedia");
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        if(deletedProduct){
            return successResponse(res, "data produk berhasil dihapus")
        }else{
            return notFoundResponse(res, "data produk gagal dihapus karena id tidak valid");
        };
    } catch (error) {
        return errorResponse(res, error);
    }
}

const updateProduct = async (req, res) => {
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
        const productId = req.params.id;
        const updatedProduct = await productService.updateProduct(productId, product);
        if(updatedProduct){
            return successResponse(res, "data produk berhasil diperbarui")
        }else{
            return notFoundResponse(res, "data produk gagal diperbarui karena id tidak valid");
        };
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
}
