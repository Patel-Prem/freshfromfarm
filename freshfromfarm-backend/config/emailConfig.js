import nodemailer from "nodemailer";
import conf from "./config.js"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: conf.EMAIL_USER, // your Gmail address
        pass: conf.EMAIL_PASS, // your App Password (NOT normal password)
    },
});

// Optional: Verify connection when the server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email server not ready:", error.message);
    } else {
        console.log("✅ Email server is ready to send messages");
    }
});
