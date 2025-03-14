// utils/emailService.js
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jishnum2017123@gmail.com", // Replace with your email
    pass: "bxfyujamjxlqnwbe", // Replace with your email password or app password
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "jishnum2017123@gmail.com", // Replace with your email
      to,
      subject,
      text,
    });
    console.log('Email sent successfully to:', to); // Log success
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw error for handling in route
  }
};
const generateOTP = () => {
  return otpGenerator.generate(6, { // Generate 6 digit OTP
    digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
  });
};

module.exports = { sendEmail, generateOTP };