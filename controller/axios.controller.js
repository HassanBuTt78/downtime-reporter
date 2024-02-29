const axios = require("axios");
const logActions = require("../database/log-actions");
const mailer = require("./mail.controller");
const Downtime = require("../model/Downtimes");

axios.interceptors.request.use(
    function (config) {
        config.metadata = { startTime: new Date() };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        response.config.metadata.endTime = new Date();
        response.duration =
            response.config.metadata.endTime -
            response.config.metadata.startTime;
        return response;
    },
    function (error) {
        error.config.metadata.endTime = new Date();
        error.duration =
            error.config.metadata.endTime - error.config.metadata.startTime;
        return Promise.reject(error);
    }
);

const timeoutMilliseconds = 10000;

const pingSite = async (website, retry = 0) => {
    try {
        console.log(`pinging - ${website.url}`);
        const websiteUrl = website.url;
        const response = await axios.get(websiteUrl, {
            headers: {
                "Cache-Control": "no-cache",
            },
            timeout: timeoutMilliseconds,
        });
        if (!website.online) {
            website.online = true;
            const downtime = await Downtime.findOneAndUpdate(
                { website: website._id, end: null },
                { end: Date.now() },
                { new: true }
            );
            await website.save();
            website.downtime = {
                start: downtime.start,
                end: downtime.end,
            };
            await mailer.sendNotification(website, { status: "up" });
        }

        return await logActions.addLog({
            targetUrl: website.url,
            statusCode: response.status,
            responseTime: response.duration,
            website: website._id,
            online: true,
        });
    } catch (error) {
        if (!(error instanceof axios.AxiosError)) {
            console.log(`Error::: ${error}`);
        }
        if (retry < 3) {
            if (!website.online) {
                return await logActions.addLog({
                    targetUrl: website.url,
                    statusCode: null,
                    responseTime: null,
                    website: website._id,
                    online: false,
                });
            }
            console.log("retry no.", retry);
            return pingSite(website, retry + 1);
        }
        if (!website.online) {
            return;
        }
        website.online = false;
        await website.save();
        await Downtime.create({ website: website._id });
        await logActions.addLog({
            targetUrl: website.url,
            statusCode: null,
            responseTime: null,
            website: website._id,
            online: false,
        });
        await mailer.sendNotification(website, { status: "down" });
    }
};

module.exports = {
    pingSite,
};
