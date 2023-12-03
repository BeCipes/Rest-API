import nodemailer from "nodemailer"

const configureMail = () => {
  const transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
      auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
      },
    secure: false,
    tls: {
        ciphers:'SSLv3'
    }
  })

  return transporter
}

const sendForgotPassMail = async (token) => {
  const transporter = configureMail()

  const mailData = {
    from: 'coba@gmail.com',
    to: 'austinnicho82@gmail.com',
    subject: 'GoCipes - Link reset password',
    text: 'Reset Password',
    html: `<b>Berikut adalah link untuk mereset password anda</b>
            <br> <a href="http://localhost:3000/api/auth/forgot-password/${token}">Ini link reset password</a> <br/>`,
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
}

export {
  sendForgotPassMail,
}