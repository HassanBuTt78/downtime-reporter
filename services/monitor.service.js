const { pingSite } = require("../controller/axios.controller");
const websiteActions = require("../database/website-actions");
const cron = require("node-cron");

const startMonitoring = async (interval = "* * * * *") => {
    const iterator = await websiteActions.getIterator();
    while (true) {
        const website = await iterator.next();
        if (website === null) {
            break;
        }
        cron.schedule(interval, async () => {
            await pingSite(website);
        });
    }
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const addToMonitoring = async (website) => {
    return cron.schedule("* * * * *", async () => {
        await pingSite(website);
    });
};

module.exports = {
    startMonitoring,
    addToMonitoring,
};
