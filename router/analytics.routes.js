const express = require("express");
const router = express.Router();
const userAuthorize = require("../middleware/user-authorization");
const websiteController = require("../controller/websites.controller");
const validator = require("../middleware/validator");

router.get("/:websiteId", [userAuthorize], websiteController.getAnalytics);

module.exports = router;
