const express = require("express");
const router = express.Router();
const authController = require("../controller/authenticate.controller.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");

router.post(
    "/signup",
    [validator(validationSchemas.registor)],
    authController.signup
);
router.post(
    "/login",
    [validator(validationSchemas.login)],
    authController.login
);

module.exports = router;
