import nodemailer from "nodemailer"
import path from 'path'
import { fileURLToPath } from 'url'

const sendMail = async (token) => {
  const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "sandbox.smtp.mailtrap.io",
      auth: {
            user: '79dbc37dd4fcbf',
            pass: '6bb6949b90b0d5',
      },
    secure: false,
    tls: {
        ciphers:'SSLv3'
    }
  })

  const mailData = {
    from: 'coba@gmail.com',  // sender address
    to: 'austinnicho82@gmail.com',   // list of receivers
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

// const sendMail = async (options) => {
//   return new Promise((resolve, reject) => {
//     expressMailer.sendMail(options, (error, info) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(info)
//       }
//     })
//   })
// }

export {
  sendMail,
}