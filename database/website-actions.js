const Website = require("../model/Website.js");
const CustomError = require("../utils/custom-error.js");

const addWebsite = async (name, url, userId) => {
    const addedDoc = await Website.create({ name, url, user: userId });
    if (!addedDoc) {
        throw new CustomError(500, "Failed to add new Website");
    }
    return addedDoc;
};

const getWebsite = async (filter) => {
    const websiteDoc = await Website.findOne(filter);
    if (!websiteDoc) {
        throw new CustomError(404, "No Website Found");
    }
    return websiteDoc;
};

const getIterator = async () => {
    const cursor = await Website.find().cursor();
    return cursor;
};

module.exports = {
    addWebsite,
    getWebsite,
    getIterator,
};
