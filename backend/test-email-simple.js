require('dotenv').config();
const nodemailer = require('nodemailer');

const getEmailUser = () => process.env.SMTP_USER || process.env.MAIL || process.env.EMAIL_USER;
const getEmailPass = () => process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
const getEmailHost = () => process.env.SMTP_HOST || process.env.EMAIL_HOST;
const getEmailPort = () => Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 465);

function createTransporter() {
	const user = getEmailUser();
	const pass = getEmailPass();

	if (!user || !pass) {
		throw new Error(
			'Email credentials missing. Set MAIL and EMAIL_APP_PASSWORD (or EMAIL_USER and EMAIL_PASS) in backend/.env'
		);
	}

	const host = getEmailHost();
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
}

async function runMailOnlyTest() {
	const to = process.argv[2] || process.env.ADMIN_EMAIL || getEmailUser();
	const from = process.env.EMAIL_FROM || getEmailUser();
	const transporter = createTransporter();

	await transporter.verify();
	console.log('SMTP connection verified. Sending test mail...');

	const info = await transporter.sendMail({
		from,
		to,
		subject: 'Mail-only test from Pan Pacific backend',
		text: [
			'This is a dedicated mail-only test.',
			`Sent at: ${new Date().toISOString()}`,
			`From: ${from}`,
			`To: ${to}`,
		].join('\n'),
	});

	console.log('Test email sent successfully.');
	console.log('Message ID:', info.messageId);
}

runMailOnlyTest().catch((error) => {
	console.error('Mail-only test failed.');
	console.error(error.message || error);
	process.exit(1);
});
