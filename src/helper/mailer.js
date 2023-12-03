import expressMailer from 'express-mailer'
import path from 'path'
import { fileURLToPath } from 'url'

const configureMailer = (app) => {
  expressMailer.extend(app, {
    from: 'your-email@example.com',
    host: 'smtp.your-email-provider.com',  // Update with your email provider
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  })

  // Set the views directory
  // const __filename = fileURLToPath(import.meta.url)
  // const __dirname = path.dirname(__filename)
  // app.set('views', path.join(__dirname, '../views/'))

  // Set template engine
  app.set('view engine', 'jade')
}

const sendMailAsync = (options) => {
  return new Promise((resolve, reject) => {
    app.mailer.send('reset-password', options, (err) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const generatePasswordToken = () => {
  const token = crypto.randomBytes(32).toString('hex')
  const tokenExp = new Date(Date.now() + 3600000)

  return {
    token,
    tokenExp
  }
}

export {
  configureMailer,
  sendMailAsync,
  generatePasswordToken
}