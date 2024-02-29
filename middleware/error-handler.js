const customError = require("../utils/custom-error.js");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(err.status).json({
            success: false,
            error: {
                statusCode: err.status,
                message: err.message,
            },
        });
    }

    // eslint-disable-next-line no-console
    console.log(`ERROR::: ${err.message}`, err.stack);

    return res.status(500).json({
        success: false,
        error: {
            statusCode: 500,
            message: "server ran into a problem, try again later",
        },
    });
};

module.exports = errorHandler;
