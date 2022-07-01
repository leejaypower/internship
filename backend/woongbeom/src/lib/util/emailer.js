const nodemailer = require('nodemailer');

const { env } = process;

const emailSender = async (emailContents) => {
  const emailTransporter = nodemailer.createTransport({
    service: env.EMALER_SERVICE,
    host: env.EMAILER_HOST,
    port: env.EMAILER_PORT,
    secure: false,
    auth: {
      user: env.EMAILER_AUTH_USER,
      pass: env.EMAILER_AUTH_PASSWORD,
    },
  });

  await emailTransporter.sendMail({
    from: `"${env.EMAILER_SENDER_NAME}" <${env.EMAILER_SENDER_EMAIL}>`,
    to: emailContents.userEmail,
    subject: emailContents.subject,
    html: emailContents.html,
  });
};

module.exports = { emailSender };
