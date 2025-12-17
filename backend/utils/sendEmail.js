//utils/sendEmail.js
import nodemailer from "nodemailer";
import { orderSuccessTemplate } from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Existing function: Order Success Email
export const sendOrderSuccessEmail = async (user, order) => {
  await transporter.sendMail({
    from: `"Pudava" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Order Confirmed 🎉",
    html: orderSuccessTemplate({
      name: user.name || "Customer",
      orderId: order._id,
      items: order.items,
      total: order.totalAmount,
    }),
  });
};

// NEW function: Profile Completed Email
export const sendProfileCompletedEmail = async (user) => {
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
};
