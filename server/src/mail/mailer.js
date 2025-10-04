import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
})

transporter.verify(function (error, success) {
	if (error) {
		console.log('Ошибка соединения с SMTP: ', error)
	} else {
		console.log('SMTP сервер готов принимать сообщения')
	}
})

export const sendEmail = async mailOptions => {
	try {
		const result = await transporter.sendMail(mailOptions)
		console.log('Письмо отправлено: ', result.messageId)
		return result
	} catch (error) {
		console.log('Ошибка отправки: ', error)
		throw error
	}
}
