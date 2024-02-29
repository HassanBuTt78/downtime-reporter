const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes.js");
const websiteRouter = require("./website.routes.js");

router.use("/auth", authRouter);
router.use("/websites", websiteRouter);

module.exports = router;
