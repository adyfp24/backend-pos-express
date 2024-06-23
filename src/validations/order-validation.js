const Joi = require('joi');

const createOrder = {
    body: Joi.object().keys({
        productId: Joi.number().required(),
        quantity: Joi.number().required()
    })
};

const exportOrder = {
    
};

module.exports = {
    createOrder,
    exportOrder
};