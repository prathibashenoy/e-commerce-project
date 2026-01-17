// utils/sendEmail.js
import Mailjet from "node-mailjet";
import nodemailer from "nodemailer";
import { orderSuccessTemplate } from "./emailTemplates.js";

// ==============================
// Mailjet Setup
// ==============================
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

// Optional: test Mailjet connection at startup
(async () => {
  try {
    await mailjet.get("user").request();
    console.log("✅ Mailjet connection successful");
  } catch (error) {
    console.error("❌ Mailjet connection failed:", error.message);
  }
})();

// ==============================
// Gmail SMTP Setup (Fallback)
// ==============================
const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

gmailTransporter.verify((err) => {
  if (err) console.error("❌ Gmail transporter error:", err.message);
  else console.log("✅ Gmail transporter ready");
});

// ==============================
// Generic sendEmail function
// ==============================
const sendEmail = async ({ to, subject, html }) => {
  const message = {
    From: {
      Email: process.env.MAILJET_SENDER_EMAIL,
      Name: "Pudava",
    },
    To: [{ Email: to }],
    Subject: subject,
    HTMLPart: html,
  };

  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [message],
    });
    console.log(`📧 Email sent via Mailjet to: ${to}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ Mailjet failed, trying Gmail SMTP: ${err.message}`);
    try {
      await gmailTransporter.sendMail({
        from: `"${message.From.Name}" <${message.From.Email}>`,
        to,
        subject,
        html,
      });
      console.log(`📧 Email sent via Gmail to: ${to}`);
      return true;
    } catch (err2) {
      console.error(`❌ Both Mailjet and Gmail failed: ${err2.message}`);
      return false;
    }
  }
};

// ==============================
// Exported email functions
// ==============================
export const sendOrderSuccessEmail = async (user, order) => {
  return sendEmail({
    to: user.email,
    subject: "Order Confirmed 🎉",
    html: orderSuccessTemplate({
      name: user.username || user.name || "Customer",
      orderId: order._id,
      items: order.items || [],
      total: order.totalAmount,
    }),
  });
};

export const sendProfileCompletedEmail = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "Profile Completed 🎉",
    html: `
      <h2>Hello ${user.username || user.name || "Customer"}</h2>
      <p>Your profile has been successfully completed.</p>
      <p>You can now access your dashboard.</p>
    `,
  });
};
