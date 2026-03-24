const nodemailer = require('nodemailer');
require('dotenv').config();

const getEmailUser = () => process.env.SMTP_USER || process.env.MAIL || process.env.EMAIL_USER;
const getEmailPass = () => process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
const getEmailHost = () => process.env.SMTP_HOST || process.env.EMAIL_HOST;
const getEmailPort = () => Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 465);

const createTransporter = () => {
  const host = getEmailHost();
  const user = getEmailUser();
  const pass = getEmailPass();

  if (!user || !pass) {
    throw new Error('Missing email credentials. Set SMTP_USER/SMTP_PASS or MAIL/EMAIL_APP_PASSWORD in .env');
  }

  if (host) {
    const port = getEmailPort();
    const secure = typeof process.env.EMAIL_SECURE === 'string'
      ? process.env.EMAIL_SECURE.toLowerCase() === 'true'
      : port === 465;
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  if (process.env.EMAIL_SERVICE) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: { user, pass },
    });
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
};

async function main() {
  const transporter = createTransporter();
  const to = process.argv[2] || process.env.ADMIN_EMAIL || getEmailUser();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || getEmailUser(),
    to,
    subject: 'Test Email - Cargo Backend',
    text: 'This is a test email from Cargo backend using current SMTP settings.',
  });
  console.log('✅ Test email sent:', info.messageId);
}

main().catch(err => {
  console.error('❌ Test email failed:', err);
  process.exit(1);
});
