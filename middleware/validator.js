const CustomError = require("../utils/custom-error.js");

const validator = (schema) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new CustomError(400, error.details[0].message);
        }
        next();
    };
};

module.exports = validator;
