const express = require("express");
require("express-async-errors");
const router = require("./router/router");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./middleware/error-handler");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", router);
app.get("/ping", (req, res) => res.status(200).end());
app.use(errorHandler);

module.exports = app;
