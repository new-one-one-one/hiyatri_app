const nodemailer = require("nodemailer");

exports.send_email = async (to, subject, text, html) => {
  let transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
       user: process.env.SMTP_USERNAME,
       pass: process.env.SMTP_PASSWORD,
     },
   });
     let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
}
