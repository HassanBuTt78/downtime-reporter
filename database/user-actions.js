const User = require("../model/user.js");
const CustomError = require("../utils/custom-error.js");

const addUser = async (data) => {
    try {
        const savedUser = await User.create(data);
        if (!savedUser) {
            throw new CustomError(500, "failed to register new user");
        }
        return savedUser;
    } catch (err) {
        throw new CustomError(500, "failed to register new user");
    }
};

const getUserByUsername = async (username) => {
    const data = await User.findOne({ email: username });
    return data;
};
const getUserById = async (id) => {
    const data = await User.findOne({ _id: id }).select("-password");
    return data;
};

const updateUser = async (id, update) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, update, {
        new: true,
    }).select("-password -cart");
    return updatedUser;
};

module.exports = {
    addUser,
    getUserByUsername,
    updateUser,
    getUserById,
};
