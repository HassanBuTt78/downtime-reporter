const { pingSite } = require("../controller/axios.controller");
const websiteActions = require("../database/website-actions");
const cron = require("node-cron");
const CustomError = require("../utils/custom-error");

const currentCronJobs = {};

const startMonitoring = async (interval = "* * * * *") => {
    const iterator = await websiteActions.getIterator();
    while (true) {
        const website = await iterator.next();
        if (website === null) {
            break;
        }
        const job = cron.schedule(interval, async () => {
            await pingSite(website);
        });
        currentCronJobs[website._id] = job;
    }
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const addToMonitoring = async (website) => {
    const job = cron.schedule("*/15 * * * *", async () => {
        await pingSite(website);
    });
    currentCronJobs[website._id] = job;
};

const removeCronJob = async (websiteId) => {
    return currentCronJobs[websiteId]?.stop();
};

module.exports = {
    startMonitoring,
    addToMonitoring,
    removeCronJob,
};
