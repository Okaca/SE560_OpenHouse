import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", //"smtp-mail.outlook.com", //"smtp.ethereal.email",
  port: 587, //465 for secure port || 587 for unsecure port
  //secure: false,
  auth: {
    user: process.env.MAILER_NODEMAIL_USER,
    pass: process.env.MAILER_NODEMAIL_PASS,
  },
});

export const mailOptions = {
  from: process.env.MAILER_NODEMAIL_USER,
};
