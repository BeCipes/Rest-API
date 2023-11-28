import userService from "../service/auth-service.js"
import WebResponse from "../helper/web-response.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        const response = WebResponse(200, "OK", "Success Register User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        const response = WebResponse(200, "OK", "Success Login User", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const refreshTokens = async (req, res) => {
    try {
        const result = await authService.refreshToken(req.body.refreshToken);
        res.json(result);
    } catch (error) {
        // Handle errors (e.g., invalid refresh token)
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export default {
    register,
    login,
    refreshTokens
}