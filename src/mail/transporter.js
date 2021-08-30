import nodemailer from "nodemailer";

// kibria
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "be089a5f9bbbd2",
    pass: "90fa1a6bbaffda",
  },
});

export default transporter;
