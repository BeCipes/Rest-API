import { ResponseError } from "../error/response-error.js"

const notFoundMiddleware = () => {
    throw new ResponseError(404, "Page Not Found")
}

export { notFoundMiddleware }