const ejs = require("ejs");
const path = require("path");

const writeNotification = async (website, status) => {
    const subjectLine =
        status === "down"
            ? `${website.name} is offline rightnow - Website Downtime Alert`
            : `${website.name} is back online - Website Uptime Notification`;
    const data = await ejs.renderFile(
        path.join(__dirname, `../views/${status}.email.ejs`),
        { website }
    );

    return {
        from: process.env.EMAIL,
        to: website.user.email,
        subject: subjectLine,
        html: data,
    };
};

module.exports = {
    writeNotification,
};
