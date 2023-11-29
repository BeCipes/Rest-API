import authService from "../service/auth-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getTokenPart } from "../helper/auth-utils.js"

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

export default {
    register,
    login,
    refreshTokens
}