const mongoose = require("mongoose");

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
        },
        { versionKey: false }
    )
);
module.exports = User;
