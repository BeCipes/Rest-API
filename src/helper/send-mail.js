import nodemailer from "nodemailer"
import { ResponseError } from "./../error/response-error.js"
import fs from "fs"

// const htmlPath = "../template/"

const configureMail = async () => {
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

const sendForgotPass = async (token, email) => {
  const transporter = await configureMail()
  // const html = fs.readFileSync(htmlPath + "forgot-password.html", "utf-8")
  if (!transporter) {
    throw new ResponseError(400, "Failed to configure the mailer")
  }

  try {
    const mailData = {
      from: 'coba@gmail.com',
      to: email,
      subject: 'GoCipes - Link reset password',
      text: 'Reset Password',
      html: `
          <h1>Berikut adalah link untuk mereset password anda</h1>
          <br>
          <a href="http://localhost:3000/api/auth/forgot-password/${token}">Ini link reset password</a>
          `,
    }
        
    transporter.sendMail(mailData, (err, info) => {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
  } catch (e) {
    throw new ResponseError(400, "Failed to send email")
  }
}

const sendVerifyEmail = async (token, email) => {
  const transporter = await configureMail()
  // const html = fs.readFileSync(htmlPath + "forgot-password.html", "utf-8")
  if (!transporter) {
    throw new ResponseError(400, "Failed to configure the mailer")
  }

  try {
    const mailData = {
      from: 'coba@gmail.com',
      to: email,
      subject: 'GoCipes - Verify Email',
      text: 'Verify Email',
      html: `
          <h1>Berikut adalah link untuk memvertifikasi email anda</h1>
          <br>
          <a href="http://localhost:3000/api/auth/verify-email/${token}">Ini link verify email</a>
          `,
    }
        
    transporter.sendMail(mailData, (err, info) => {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
  } catch (e) {
    throw new ResponseError(400, "Failed to send email")
  }
}

export {
  sendForgotPass,
  sendVerifyEmail
}