import userService from "../service/auth-service.js"
import WebResponse from "../helper/web-response.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        const response = WebResponse(200, "OK", result)

        res.status(200).json(response)
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        const response = WebResponse(200, "OK", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login
}