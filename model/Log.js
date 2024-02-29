const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    online: { type: Boolean, required: true },
    targetUrl: { type: String, required: true },
    statusCode: { type: Number },
    responseTime: { type: Number },
    website: { type: mongoose.Schema.Types.ObjectId, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("log", logSchema);

module.exports = Log;
