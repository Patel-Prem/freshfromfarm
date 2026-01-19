import { transporter } from "../config/emailConfig.js";
import { mailTemplates } from "../templates/mailTemplates.js";
import conf from "../config/config.js"

// 🔹 Replace placeholders like {{OTP_CODE}} or {{USER_NAME}} in templates
const fillTemplate = (template, data = {}) => {
    return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "- - -");
};

/**
 * Generic Email Sender
 * @param {string} templateName - e.g. "VERIFICATION_CODE"
 * @param {string} to - recipient email
 * @param {object} data - dynamic placeholders like { OTP_CODE: 123456, USER_NAME: "Prem" }
 */
export const sendEmailTemplate = async (templateName, to, data = {}) => {
    try {
        const template = mailTemplates[templateName];

        if (!template) {
            throw new Error(`Email template "${templateName}" not found`);
        }

        // const subject = fillTemplate(template.SUBJECT, data);
        const subject = template.SUBJECT;
        const html = fillTemplate(template.BODY, data);

        const info = await transporter.sendMail({
            from: `"FreshFromFarm" <${conf.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`✅ Email "${templateName}" sent to ${to} (${info.messageId})`);
    } catch (error) {
        console.error("❌ Failed to send email:", error.message);
    }
};
