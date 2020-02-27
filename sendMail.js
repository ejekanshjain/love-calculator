require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = (email, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    })
    const mailOptions = {
        from: `Love Calculator ${process.env.NODEMAILER_EMAIL}`,
        to: email,
        subject: subject,
        text: body
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
    })
}