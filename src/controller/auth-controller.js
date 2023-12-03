import authService from "../service/auth-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getTokenPart } from "../helper/jwt-helper.js"
import { sendMailAsync } from "../helper/mailer.js"

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)
        const response = SuccessWebResponse(200, "OK", "Success Register User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body)
        const response = SuccessWebResponse(200, "OK", "Success Login User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const refreshTokens = async (req, res, next) => {
    try {
        const token = getTokenPart(req.get('Authorization'))
        
        const result = await authService.refreshToken(token)
        const response = SuccessWebResponse(200, "OK", "Success refresh token", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const result = await authService.sendPasswordResetMail(email)
        const response = SuccessWebResponse(200, "OK", "Password reset email sent successfully")
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const sendPasswordResetEmail = async (userEmail, resetToken) => {
    try {
        const resetLink = `https://localhost:3000/api/auth/reset-password?token=${resetToken}`

        await sendMailAsync({
            to: userEmail,
            subject: 'Reset Your Password',
            resetLink,
        })

        const response = SuccessWebResponse(200, "OK", "Success send email reset password")

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    refreshTokens,
    forgotPassword,
}