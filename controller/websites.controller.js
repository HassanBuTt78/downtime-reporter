const websiteActions = require("../database/website-actions");
const logActions = require("../database/log-actions");
const Downtime = require("../model/Downtimes");
const { structureRange } = require("../utils/restructure");
const monitoringService = require("../services/monitor.service");

const websiteController = {
    newWebsite: async (req, res) => {
        const userId = req.userData._id;
        const newDoc = await websiteActions.addWebsite(
            req.body.name,
            req.body.url,
            userId
        );
        monitoringService.addToMonitoring(newDoc);
        res.json({
            success: true,
            message: "your website is being monitored",
            data: newDoc,
        });
    },
    getWebsiteData: async (req, res) => {
        const userId = req.userData._id;
        const websiteId = req.params.websiteId;
        const websiteData = await websiteActions.getWebsite({
            _id: websiteId,
            user: userId,
        });
        const downtimes = await Downtime.find({ website: websiteId }).sort(
            "-_id"
        );
        res.json({
            success: true,
            message: "Website Data have successfully retreived",
            data: {
                ...websiteData.toObject(),
                downtime: downtimes,
            },
        });
    },
    getAnalytics: async (req, res) => {
        const userId = req.userData._id;
        const websiteId = req.params.websiteId;
        let range = req.query.range || "lasthour";
        range = structureRange(range);
        const websiteData = await websiteActions.getWebsite({
            _id: websiteId,
            user: userId,
        });
        const logs = await logActions.getLogs(websiteId, range);
        if (logs.length < 10) {
            return res.json({
                success: true,
                message: `Not enough analytic Data for ${websiteData.name}`,
                data: {
                    logs: logs,
                },
            });
        }
        res.json({
            success: true,
            message: `Analytics of ${websiteData.name} brougth successfully`,
            data: {
                logs: logs,
            },
        });
    },
};

module.exports = websiteController;
