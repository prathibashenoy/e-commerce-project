// utils/sendEmail.js
import nodemailer from "nodemailer";
import { orderSuccessTemplate } from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT for Render
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Optional: verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

// ==============================
// Order Success Email
// ==============================
export const sendOrderSuccessEmail = async (user, order) => {
  try {
    await transporter.sendMail({
      from: `"Pudava" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Order Confirmed 🎉",
      html: orderSuccessTemplate({
        name: user.username || user.name || "Customer",
        orderId: order._id,
        items: order.items || [],
        total: order.totalAmount,
      }),
    });

    console.log("📧 Order confirmation email sent to:", user.email);
    return true;
  } catch (error) {
    console.error("❌ Order email failed:", error.message);
    return false;
  }
};

// ==============================
// Profile Completed Email
// ==============================
export const sendProfileCompletedEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: `"Pudava" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Profile Completed 🎉",
      html: `
        <h2>Hello ${user.username}</h2>
        <p>Your profile has been successfully completed.</p>
        <p>You can now access your dashboard.</p>
      `,
    });

    console.log("📧 Profile completed email sent to:", user.email);
    return true;
  } catch (error) {
    console.error("❌ Profile email failed:", error.message);
    return false;
  }
};
