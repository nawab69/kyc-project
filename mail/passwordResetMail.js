import transporter from "./transporter.js";

const passwordResetMail = (to, token) => {
  const html = `<b> Hello, </b>
              <p>Your Password reset code is.</p>
              <a href="http://localhost:4000/password-reset/${token}" style="text-align: center"> http://localhost:4000/password-reset/${token} </a>
            `;

  try {
    let info = transporter.sendMail({
      from: '"PasswordReset " <admin@test.com>',
      to: to,
      subject: "Password Reset Code",
      html: html,
    });

    if (info.error) {
      console.log("something went wrong");
    }
  } catch (e) {
    console.log(e);
  }
};

export default passwordResetMail;
