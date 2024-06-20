const Joi = require('joi');

const registUser = {
    body: Joi.object().keys({
        username: Joi.string().required().max(20),
        password: Joi.string().required().min(6),
    })
};

const loginUser = {
    body: Joi.object().keys({
        username: Joi.string().required().max(20),
        password: Joi.string().required().min(6),
    })
}

module.exports = {
    registUser,
    loginUser
}