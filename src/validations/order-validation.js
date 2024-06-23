const Joi = require('joi');

const createOrder = {
    body: Joi.object({
        products: Joi.array().items(
            Joi.object({
                productId: Joi.number().required(),
                quantity: Joi.number().required()
            })
        ).required()
    })
};

const exportOrder = {
    body: Joi.object().keys({
        uang_masuk: Joi.number().required()
    })
};

module.exports = {
    createOrder,
    exportOrder
};