const mongoose = require("mongoose");

const Downtime = mongoose.model(
    "Downtime",
    new mongoose.Schema({
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
        },
        start: {
            type: Date,
            default: Date.now,
        },
        end: {
            type: Date,
            default: null
        },

    })
);

module.exports = Downtime;
