const express = require("express");
const router = express.Router();
const userAuthorize = require("../middleware/user-authorization");
const websiteController = require("../controller/websites.controller");
const validator = require("../middleware/validator");
const validationSchemas = require("../utils/validation-schemas");
const analyticsRouter = require("./analytics.routes");

router.post(
    "/",
    [userAuthorize, validator(validationSchemas.website)],
    websiteController.newWebsite
);
router.delete("/:websiteId", [userAuthorize], websiteController.removeWebsite);
router.get("/:websiteId", [userAuthorize], websiteController.getWebsiteData);
router.use("/analytics", analyticsRouter);

module.exports = router;
