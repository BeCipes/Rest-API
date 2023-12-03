import { ResponseError } from "../error/response-error.js"

const notfoundMiddleware = () => {
    throw new ResponseError(404, "Page Not Found")
}

export { notfoundMiddleware }