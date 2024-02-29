const Log = require("../model/Log");
const CustomError = require("../utils/custom-error");

const addLog = async (doc) => {
    const createdLog = await Log.create(doc);
    if (!createdLog) {
        console.error("failed to write log");
    }
    return createdLog;
};

const getLogs = async (websiteId, range) => {
    const letogs = await Log.find({
        website: websiteId,
        timestamp: { $gte: range },
    }).sort("-_id");
    return letogs;
};

module.exports = {
    addLog,
    getLogs,
};
