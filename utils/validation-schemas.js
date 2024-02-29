const joi = require("joi");

const validationSchemas = {
    registor: joi.object({
        name: joi.string().max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    }),
    website: joi.object({
        name: joi.string().required(),
        url: joi.string().uri().required(),
    }),
};
module.exports = validationSchemas;
