const jwt = require("../utils/jwt.js");
const CustomError = require("../utils/custom-error.js");
const db = require("../database/user-actions.js");

const userAuthorize = async (req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        const err = new CustomError(
            401,
            "unauthorized - You are not Logged In"
        );
        throw err;
    }
    const token = header.replace("Bearer ", "");
    const decodedData = jwt.readToken(token);
    if (!decodedData) {
        const err = new CustomError(
            401,
            "unauthorized - Invalid or Expired Token"
        );
        throw err;
    }
    const userData = await db.getUserById(decodedData.id);
    if (!userData) {
        const err = new CustomError(401, "unauthorized - Invalid Token");
        throw err;
    }

    req.userData = userData;
    next();
};

module.exports = userAuthorize;
