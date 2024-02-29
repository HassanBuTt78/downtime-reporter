const mongoose = require("mongoose");

const Website = mongoose.model(
    "Website",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        online: {
            type: Boolean,
            default: true,
        },
    })
);

module.exports = Website;
