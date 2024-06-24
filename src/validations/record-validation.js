const Joi = require('joi');

const getRecord = {
    query: Joi.object().keys({
        month: Joi.string()
        .valid('januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember')
        .lowercase()
        .required(),
        year: Joi.number()
        .integer()
        .min(1900) 
        .max(2100) 
        .required()
    })
};

module.exports = {
    getRecord
}