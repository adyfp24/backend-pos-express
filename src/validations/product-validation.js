const Joi = require('joi');

const createProduct = {
    body: Joi.object().keys({
        nama: Joi.string().required().max(25),
        stok: Joi.number().required(),
        harga: Joi.number().required(),
        jenis_produk: Joi.number().required()
    })
}

const updateProduct = {
    body: Joi.object().keys({
        nama: Joi.string().optional().max(25),
        stok: Joi.number().optional(),
        harga: Joi.number().optional(),
        jenis_produk: Joi.number().optional()
    })
}

module.exports = {
    createProduct,
    updateProduct
}