import roleService from "../service/role-service.js"
import WebResponse from "../helper/web-response.js"

const createRole = async (req, res, next) => {
    try {
        const result = await roleService.create(req.body)
        const response = WebResponse(200, "OK", result)

        res.status(200).json(response)
    } catch (e) {
        next(e);
    }
}

export default {
    createRole
}