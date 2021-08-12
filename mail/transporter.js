import nodemailer from "nodemailer";

// kibria
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "220a86b69506db",
    pass: "6a088af98bdd9d",
  },
});

export default transport;
