import { ResponseError } from "../error/response-error.js"
import { ErrorWebResponse } from "../helper/web-response.js"

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ResponseError) {
        const response = ErrorWebResponse(err.status, err.message)
        res.status(err.status).json(response).end()
    } else {
        const response = ErrorWebResponse(500, err.message)
        res.status(500).json(response).end()
    }
}

export {
    errorMiddleware
}