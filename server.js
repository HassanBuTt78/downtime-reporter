const app = require("./app");
const mongoose = require("mongoose");
const { startMonitoring } = require("./services/monitor.service");

const start = async () => {
    await mongoose.connect(process.env.DB_URI);
    startMonitoring("*/15 * * * * *");
    await app.listen(process.env.PORT);
    console.log(
        `Api is listening on http://127.0.0.1:${process.env.PORT}/api/v1/`
    );
};

start();
