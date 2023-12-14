import authService from "../service/auth-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body)
        const response = SuccessWebResponse(200, "OK", "Success register User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body)
        const response = SuccessWebResponse(200, "OK", "Success login User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const refreshTokens = async (req, res, next) => {
    try {
        const token = req.get('Authorization')
        
        const result = await authService.refreshToken(token)
        const response = SuccessWebResponse(200, "OK", "Success refresh token", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const sendPasswordResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        
        const result = await authService.sendPasswordResetMail(email)
        const response = SuccessWebResponse(200, "OK", "Password reset email sent successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { token } = req.params
        const { password } = req.body
        
        const result = await authService.forgotPassword(token, password)
        const response = SuccessWebResponse(200, "OK", "Password reset successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const sendVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        
        const result = await authService.sendVerifyEmailMail(email)
        const response = SuccessWebResponse(200, "OK", "Verify email link sent successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params
        
        const result = await authService.verifyEmail(token)
        const response = SuccessWebResponse(200, "OK", "Email verified successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getCurrentUserInfo = async (req, res, next) => {
    try {
        const token = req.get('Authorization')
        const result = await authService.getUserInfo(token)
        const response = SuccessWebResponse(200, "OK", "Success get user info", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }

}

export default {
    register,
    login,
    refreshTokens,
    sendPasswordResetEmail,
    sendVerifyEmail,
    verifyEmail,
    getCurrentUserInfo,
    forgotPassword
}