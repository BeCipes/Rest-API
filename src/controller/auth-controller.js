import authService from "../service/auth-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getTokenPart } from "../helper/auth-utils.js"
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
        const { email } = req.body;
        const resetToken = await authService.generatePasswordResetToken(email);

        // Save the reset token in your database or any storage mechanism
        // ...

        // Send the password reset email
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

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