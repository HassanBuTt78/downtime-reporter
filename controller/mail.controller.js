const nodemailer = require("nodemailer");
const mailTemplate = require("../utils/emailTemplater");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL || "",
        pass: process.env.EMAIL_PASSWORD || "",
    },
});

const sendNotification = async (website, options) => {
    await website.populate("user");
    const status = options.status || "down";
    const mail = await mailTemplate.writeNotification(website, status);
    const sentData = await transporter.sendMail(mail);
    if (!sentData) {
        throw new CustomError(500, "Error sending the Verification Email");
    }
    return true;
};

module.exports = {
    sendNotification,
};
