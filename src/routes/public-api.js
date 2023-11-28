import express from "express"
import authController from "../controller/auth-controller.js"
// import { authMiddleware } from "../middleware/auth-middleware.js"

const publicRouter = new express.Router()
// publicRouter.use(authMiddleware)

publicRouter.post('/api/users/register', authController.register)
publicRouter.post('/api/users/login', authController.login)
publicRouter.post('/api/users/refresh', authController.refreshTokens)

export {
    publicRouter
}